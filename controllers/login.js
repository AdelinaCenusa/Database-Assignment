const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const mySecret = require('../config/config');
const jwt = require('jsonwebtoken');

const errorHandler = (err) => {
  let errors = { email: '', password: '' };

  if (err.message === 'Email does not exist') {
    errors.email = 'Email does not exist';
  }
  if (err.message === 'Wrong password') {
    errors.password = 'Incorrect password';
  }

  return errors;
};

const maxAge = 3 * 20 * 24 * 60;
const myToken = (id) => {
  return jwt.sign({ id }, mySecret.SECRET, {
    expiresIn: maxAge,
  });
};

router.post('/loginUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.login(email, password);
    const token = myToken(user._id);
    res.cookie('token', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
});

module.exports = router;
