const express = require('express');
const router = express.Router();
const toDoList = require('../models/toDo');
router.get('/', async (req, res) => {
  res.render('index.ejs', { tasks: await toDoList.find() });
});

router.get('/registerUser', (req, res) => {
  res.render('registerUser.ejs');
});

router.get('/loginUser', (req, res) => {
  res.render('loginUser.ejs');
});
router.get('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.redirect('/');
});
router.get('/:id', async (req, res) => {
  const record = await toDoList.findById(req.params.id);
  if (record == null) res.redirect('/');
  res.render('showTask.ejs', { tasks: record });
});
router.get('/editTask/:id', async (req, res) => {
  const record = await toDoList.findById(req.params.id);
  res.render('editTask', { tasks: record });
});
module.exports = router;
