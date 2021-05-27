const express = require('express');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const secret = process.env.ACCESS_TOKEN_SECRET;

const auth = require('../middleware/auth');
const User = require('../models/User');


// @route	GET api/auth
// @desc	   Get loggedin user user
// @access	private

router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});



// @route	Post api/auth
// @desc	   Auth user and get token
// @access	public

router.post('/',
   [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists()
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
         let user = await User.findOne({ email });

         if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
         }

         const isMatch = await compare(password, user.password);

         if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
         }

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