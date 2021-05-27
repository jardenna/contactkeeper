const { verify } = require('jsonwebtoken');

const secret = process.env.ACCESS_TOKEN_SECRET;

module.exports = function (req, res, next) {
   //Get token from header
   const token = req.header('x-auth-token');
   // Check if not token
   if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
   }

   try {
      const decoded = verify(token, secret);

      req.user = decoded.user;
      next();
   } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
   }
};