import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos').then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Add task
  const addTask = () => {
    if (!newTask.trim()) return; // Prevent adding empty tasks
    axios.post('http://localhost:5000/api/todos', { task: newTask }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask('');
    });
  };

  // Toggle task completion
  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed }).then((response) => {
      setTasks(
        tasks.map((task) => (task._id === id ? response.data : task))
      );
    });
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h2>To-Do List</h2>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
            <button className="btn btn-primary" onClick={addTask}>
              Add
            </button>
          </div>
          {tasks.length > 0 ? (
            <ul className="list-group">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    task.completed ? 'list-group-item-success' : ''
                  }`}
                >
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleTask(task._id, !task.completed)}
                  >
                    {task.task}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
