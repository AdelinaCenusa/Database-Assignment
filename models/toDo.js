const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
  record: {
    type: String,
    required: true,
  },
});

const toDoList = mongoose.model('toDo', toDoSchema);

module.exports = toDoList;
