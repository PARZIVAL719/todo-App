const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('ToDo', ToDoSchema);