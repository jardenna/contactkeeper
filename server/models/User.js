const mongoose = require('mongoose');



const UserSchema = mongoose.Schema({

   name: {
      type: String,
      required: [true, 'Please enter a name']
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;