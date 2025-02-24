import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post('http://localhost:5000/api/todos', { task: newTask }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask('');
    });
  };

  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed }).then((response) => {
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            To-Do List
          </Typography>
          <TextField
            fullWidth
            label="Add a new task"
            variant="outlined"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" color="primary" onClick={addTask}>
            Add Task
          </Button>
          {tasks.length > 0 ? (
            <List sx={{ mt: 3 }}>
              {tasks.map((task) => (
                <ListItem
                  key={task._id}
                  secondaryAction={
                    <IconButton edge="end" color="error" onClick={() => deleteTask(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, !task.completed)}
                  />
                  <ListItemText
                    primary={task.task}
                    sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 3 }}>
              No tasks available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;