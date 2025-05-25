import React, { useState } from 'react';
import { IconButton, Button, Stack, TextField, List, ListItem, ListItemText, Typography, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import Battery4BarIcon from '@mui/icons-material/Battery4Bar';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import theme from '../theme.js';
import ingredients from '../ingredients.js';
import { useInventory } from '../context/InventoryContext';
import { useMoney } from '../context/MoneyContext';


const pixelButtonStyles = {
  backgroundColor: `${theme.palette.primary.light}`, // or your pixel-style color
  border: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: 0,
  padding: '8px 16px',
  color: `${theme.palette.primary.dark}`,
  boxShadow: `2px 2px 0 ${theme.palette.primary.dark}`,
  textTransform: 'none',
  transition: 'all 0.1s ease-in-out',
  '&:active': {
    boxShadow: `0 0 0 ${theme.palette.primary.dark}`,
    transform: 'translate(2px, 2px)',
  },
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}`,
  },
};

const pixelToggleStyle = {
  border: `2px solid ${theme.palette.primary.dark}`,
  borderRadius: 0,
}

export default function TaskList() {
  // Task List States
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const { inventory, setInventory } = useInventory();
  const { addCoins } = useMoney();

  // Handle adding tasks
  const addTask = (event) => {
    event.preventDefault();
    if (!taskInput.trim()) return;
  
    setTasks([
      ...tasks,
      {
        text: taskInput,
        done: false,
        difficulty: difficulty, // 👈 Store selected difficulty
      }
    ]);
    
    setTaskInput('');
  };

  const handleDifficulty = (event, newDifficulty) => {
    if (newDifficulty !== null) {
      setDifficulty(newDifficulty);
    }
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

  const clearCompletedTasks = () => {
    const newInventory = [...inventory];
    const rewards = [];
  
    const getRandomItem = () => {
      return ingredients[Math.floor(Math.random() * ingredients.length)];
    };
  
    const difficultyToCount = {
      easy: 2,
      mid: 3,
      hard: 4,
    };
  
    const updatedTasks = tasks.filter(task => {
      if (!task.done) return true;
  
      const count = difficultyToCount[task.difficulty] || 2;
      for (let i = 0; i < count; i++) {
        const randomItem = getRandomItem();
        rewards.push(randomItem.id);
  
        const existing = newInventory.find(item => item.id === randomItem.id);
        if (existing) {
          existing.count += 1;
        } else {
          newInventory.push({ id: randomItem.id, count: 1 });
        }
      }
      addCoins(count);

      return false; // remove completed task
    });
  
    setInventory(newInventory);
    setTasks(updatedTasks);
  };
  
  

  return (
    <Box sx={{p: 3}}>
      <Stack direction="row" sx={{mb: 1}}>
        <Typography variant="h4">Today's Orders</Typography>
        <SoupKitchenIcon sx={{p: 1}}/>
      </Stack>

      <form onSubmit={addTask} style={{ display: 'flex', mb: 20 }}>
        <TextField
          label="Send order..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          fullWidth
          size="small"
          variant="standard"
          style={{ marginRight: 10 }}
        />
        <ToggleButtonGroup
          value={difficulty}
          exclusive
          onChange={handleDifficulty}
          sx={{mr: 1}}
        >
          <ToggleButton value="easy" size="small" sx={pixelToggleStyle}>
            Easy
          </ToggleButton>
          <ToggleButton value="mid" size="small" sx={pixelToggleStyle}>
            Med
          </ToggleButton>
          <ToggleButton value="hard" size="small" sx={pixelToggleStyle}>
            Hard
          </ToggleButton>
        </ToggleButtonGroup>
        <Button type="submit" sx={pixelButtonStyles}><LocalShippingIcon/></Button>
      </form>

      <List>
      {tasks.map((task, index) => (
        <ListItem
          key={index}
          divider
          button
          onClick={() => toggleTaskCompletion(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          sx={{
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: '20px',
                  textDecoration: task.done ? 'line-through' : 'none'
                }}
              >
                {task.text}
              </Typography>
            }
          />

          {/* Show difficulty icon */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '50px', // You can adjust the right value to move it closer or farther
              transform: 'translateY(-50%)', // Center the icon vertically
            }}
          >
          {task.difficulty === 'easy' && (
            <Battery0BarIcon sx={{ color: `${theme.palette.primary.dark}`, marginLeft: 1 }} />
          )}
          {task.difficulty === 'mid' && (
            <Battery4BarIcon sx={{ color: `${theme.palette.primary.dark}`, marginLeft: 1 }} />
          )}
          {task.difficulty === 'hard' && (
            <BatteryFullIcon sx={{ color: `${theme.palette.primary.dark}`, marginLeft: 1 }} />
          )}
          </div>

          {/* Show delete icon only if hovered AND task is not done */}
          {hoveredIndex === index && !task.done && (
            <IconButton
              edge="end"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // prevent toggling the task
                deleteTask(index);
              }}
            >
              <CloseTwoToneIcon fontSize="small"/>
            </IconButton>
          )}
        </ListItem>
      ))}
    </List>
    <Button
      onClick={clearCompletedTasks}
      disabled={!tasks.some(task => task.done)}
      sx={{...pixelButtonStyles, mt: 2}}
    >
      Clear Completed
    </Button>

    </Box>
  )
} 