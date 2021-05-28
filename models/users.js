const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter an username'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [5, 'Password must be more than 5 characters'],
  },
});

usersSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

usersSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const authLogin = await bcrypt.compare(password, user.password);
    if (authLogin) {
      return user;
    }
    throw Error('Wrong password');
  }
  throw Error('Email does not exist');
};
const Users = mongoose.model('User', usersSchema);

module.exports = Users;
