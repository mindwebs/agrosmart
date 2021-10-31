  
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async callback => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');
    callback();
  }
  catch (err) {
    console.error(err,err.message);
    process.exit(1);
  }
};

module.exports = connectDB;