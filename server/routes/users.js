const express = require('express');
const { genSalt, hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('../models/User');

const secret = process.env.ACCESS_TOKEN_SECRET;
// @route	get api/users
// @desc	ReGet all users
// @access	Public


router.get('/', async (req, res) => {
   try {
      const user = await User.find();
      res.json(user);
   } catch (error) {
      res.status(201).json({ 'message': error });
   }
});


// @route	POST api/users
// @desc	Register a user
// @access	Public

router.post('/', [
   check('name', 'Name is required')
      .not()
      .isEmpty(),
   check('email', 'Please include a valid email').isEmail(),
   check(
      'password',
      'Please enter a password with 6 or more characters'
   ).isLength({ min: 6 })
], async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { name, email, password } = req.body;
   try {
      let user = await User.findOne({ email });

      if (user) {
         return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
         name,
         email,
         password
      });

      const salt = await genSalt(10);

      user.password = await hash(password, salt);

      await user.save();

      const payload = {
         user: {
            id: user.id
         }
      };

      sign(
         payload,
         secret,
         { expiresIn: 360000 },
         (err, token) => {
            if (err) throw err;
            res.json({ token });
         }
      );


   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }

});

module.exports = router;