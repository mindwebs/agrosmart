  
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  username: {type: String, default: null},
  accessLevel: String,
  lastLogin: { type: Date, default: null },
  loginNo: { type: Number, default: 0},
  defaultProperty: String,
  defaultTimeOut: Number,
  loginHash: {type: String, default: null},
  createDate: { type: Date, default: Date.now }
}, {
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);