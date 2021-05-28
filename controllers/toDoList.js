const express = require('express');
const router = express.Router();
const toDoList = require('../models/toDo');

router.post('/', async (req, res) => {
  const record = req.body;

  console.log(record);
  const result = await toDoList.create(record);
  console.log(result);
});
router.delete('/:id', async (req, res) => {
  await toDoList.findByIdAndDelete(req.params.id);
  res.redirect('/');
});
router.put('/:id', async (req, res) => {
  req.record = await toDoList.findById(req.params.id);
  let record = req.record;
  record.record = req.body.record;
  try {
    record = await record.save();
    res.redirect(`/${record.id}`);
    console.log(record);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
