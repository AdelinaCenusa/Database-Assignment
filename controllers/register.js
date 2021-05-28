const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const routes = require('../routes/routes');
const jwt = require('jsonwebtoken');
const mySecret = require('../config/config');

const errorHandler = (err) => {
  let errors = { username: '', email: '', password: '' };

  if (err.code === 11000) {
    errors.email = 'Email is already in use';
    return errors;
  }

  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const oneDay = 86400000;
const myToken = (id) => {
  return jwt.sign({ id }, mySecret.SECRET, {
    expiresIn: oneDay,
  });
};
router.post('/registerUser', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await Users.create({ username, email, password });
    const token = myToken(user._id);
    res.cookie('token', token, { httpOnly: true, oneDay: oneDay * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
});

module.exports = router;
