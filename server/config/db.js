require('dotenv').config();
const mongoose = require('mongoose');

const access = process.env.API_KEY;
const projectName = process.env.PROJECT_NAME;
const name = process.env.CALLED_NAME;

const db = `mongodb+srv://${name}:${access}@cluster0-pimzw.mongodb.net/${projectName}?retryWrites=true&w=majority` || 'mongodb://localhost/${name}';
const connectDB = async () => {
   try {
      await mongoose.connect(db, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false,
         useUnifiedTopology: true
      });

      console.log('MongoDB Connected...');
   } catch (err) {
      console.error(err.message);
      // Exit process with failure
      process.exit(1);
   }
};

module.exports = connectDB;