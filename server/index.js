const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ToDo = require('./models/ToDo');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/todoapp')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.get('/api/todos', async (req, res) => {
  const todos = await ToDo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newToDo = new ToDo({
    task: req.body.task,
  });
  await newToDo.save();
  res.json(newToDo);
});

app.put('/api/todos/:id', async (req, res) => {
  const updatedToDo = await ToDo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updatedToDo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await ToDo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});