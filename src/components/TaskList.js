import React, { useState, useEffect } from 'react';
import { Button, Stack, TextField, List, ListItem, ListItemText, Typography, Checkbox, Box } from '@mui/material';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export default function TaskList() {
  // Task List States
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // Handle adding tasks
  const addTask = (event) => {
    event.preventDefault();
    if (!taskInput.trim()) return;

    setTasks([
      ...tasks,
      { text: taskInput, done: false }
    ]);
    setTaskInput('');
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  return (
    <Box sx={{p: 4}}>
      <Stack direction="row"><Typography variant="h4">Today's Orders</Typography><SoupKitchenIcon sx={{p: 1}}/></Stack>
      <form onSubmit={addTask} style={{ display: 'flex', marginBottom: 20 }}>
        <TextField
          label="Add a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          fullWidth
          variant="outlined"
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" type="submit" color="primary">➕</Button>
      </form>

      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} divider>
            <Checkbox
              checked={task.done}
              onChange={() => toggleTaskCompletion(index)}
            />
            <ListItemText
              primary={task.text}
              style={{ textDecoration: task.done ? 'line-through' : 'none' }}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteTask(index)}
            >
              🗑️
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  )
} 