import React, { useEffect, useState } from 'react';
import PixelBorder from './PixelBorder.js';
import portraits from '../portraits.js';
import ingredients from '../ingredients';
import recipes from '../recipes.js';
import InventoryModal from './InventoryModal.js';
import AnimationPlayer from './AnimationPlayer.js';

import { Box, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import { useInventory } from '../context/InventoryContext.js';
import { useMoney } from '../context/MoneyContext';


const foodList = ['Croissant', 'Latte', 'Donut', 'Espresso', 'Bagel', 'Tea', 'Muffin'];
const frames = [
  './assets/smoke/1.png',
  './assets/smoke/2.png',
  './assets/smoke/3.png',
  './assets/smoke/4.png',
  './assets/smoke/5.png',
]

const orderPhrases = [
  "I'd like to order {order}.",
  "Today I feel like eating {order}.",
  "Can I get {order}, please?",
  "One {order}, coming up!",
  "Surprise me with some {order}.",
  "Gimme {order}, I'm starving!",
];

// When given the correct item
const goodResponse = [
  "That was the most delicious {order} I've ever had!",
]

// When given a different item
const avgResponse = [
  "Not what I expected..."
]

// When given sludge
const badResponse = [
  "What was that?!"
]

function formatOrderMessage(items) {
  const template = orderPhrases[Math.floor(Math.random() * orderPhrases.length)];
  const itemList = items.join(', ');
  const [before, after] = template.split('{order}');
  return {
    before,
    order: itemList,
    after,
  };
}

function getRandomOrderItems() {
  const count = Math.floor(Math.random() * 3) + 1; 
  const randomRecipes = [...recipes]
    .sort(() => 0.5 - Math.random()) 
    .slice(0, count); 

  return randomRecipes.map(recipe => recipe.id);
}

function getRandomCustomerId() {
  const keys = Object.keys(portraits);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

function generateDailyOrders() {
  const orderCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const orders = [];

  for (let i = 0; i < orderCount; i++) {
    const itemIds = getRandomOrderItems();  // This now returns an array of recipe ids
    
    // Map the itemIds to their corresponding recipe names
    const items = itemIds.map(id => {
      const recipe = recipes.find(r => r.id === id); 
      return recipe ? recipe.name : 'Unknown'; 
    });
    
    orders.push({
      items,
      customerId: getRandomCustomerId(),
      messageParts: formatOrderMessage(items),
    });
  }

  return orders;
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const countMap = {};

  for (let item of arr1) {
    countMap[item] = (countMap[item] || 0) + 1;
  }

  for (let item of arr2) {
    if (!countMap[item]) return false;
    countMap[item]--;
  }

  return true;
}

function getRecipe(ing) {
  for (let r of recipes) {
    if (arraysEqual(r.ingredients, ing)) {
      return r;
    }
  }
  return recipes[0];
}

export default function OrderMenu() {
  const [orders, setOrders] = useState([]);
  const [activeOrderIndex, setActiveOrderIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // State to store selected items
  const [showAnimation, setShowAnimation] = useState(false);
  const [currRecipe, setCurrRecipe] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const { inventory, setInventory } = useInventory();
  const activeOrder = orders.length > 0 ? orders[activeOrderIndex] : null;
  const activeCustomerId = activeOrder ? activeOrder.customerId : null;
  const { addGems } = useMoney();
  
  useEffect(() => {
    const today = new Date().toDateString();
    const lastGenerated = localStorage.getItem('ordersDate');
  
    if (lastGenerated !== today) {
      const newOrders = generateDailyOrders();
      setOrders(newOrders);
      localStorage.setItem('orders', JSON.stringify(newOrders));
      localStorage.setItem('ordersDate', today);
  
      if (newOrders.length > 0) {
        setActiveOrderIndex(0)
      }
    } else {
      const stored = localStorage.getItem('orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        setOrders(parsed);
        if (parsed.length > 0) {
          setActiveOrderIndex(0)
        }
      }
    }
  }, []);

  useEffect(() => {
    if (orders && orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const handleOrderClick = (index) => {
    const order = orders[index];
    if (order && order.customerId) {
      setActiveOrderIndex(index)
    }
  };
  
  const handleCook = () => {
    const updatedInventory = inventory
      .map(item => {
        // If the item was selected, subtract 1 from count
        if (selectedItems.includes(item.id)) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      })
      .filter(item => item.count > 0); // Remove items with 0 or less
  
    setInventory(updatedInventory);
    setCurrRecipe(getRecipe(selectedItems))
    setSelectedItems([]);
    setShowAnimation(true);
    setShowRecipe(true);
  };

  const handleSend = () => {
    const updatedOrders = [...orders];
    const recipeIndex = activeOrder.items.indexOf(currRecipe.name);
    
    if (recipeIndex !== -1) {
      activeOrder.items.splice(recipeIndex, 1);
      setResponse(goodResponse[0].replace('{order}', currRecipe.name))
      addGems(2);
    } else {
      activeOrder.items.shift();
      setResponse(avgResponse[0].replace('{order}', currRecipe.name))
      addGems(1);
    }
  
    // Update the messageParts with the new item names
    activeOrder.messageParts = {
      ...activeOrder.messageParts,
      order: activeOrder.items,
    };

    // If activeOrder is empty after modification, remove it from orders
    if (activeOrder.items.length === 0) {
      updatedOrders.splice(activeOrderIndex, 1);
    }
    
    // Update the state with the modified orders
    setOrders(updatedOrders);
    setShowRecipe(false);
    setShowResponse(true)
  }

  const handleResponseButton = () => {
    setShowResponse(false)
  }
  

  return (
    <>
      <PixelBorder>
        <List sx={{ m: 2, display: 'flex', flexDirection: 'column' }}>
          {orders.map((order, index) => (
            <ListItem
              divider
              button
              key={index}
              onClick={() => handleOrderClick(index)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#dcd8cc',
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', textAlign: 'left' }}>
                    <strong>Order {index + 1}:</strong> {order.items.join(', ')}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </PixelBorder>

      {/* Kitchen Counter */}
      <Box
        sx={{
          width: '100%',
          height: '120px',
          backgroundColor: '#8B5A2B', // counter wood tone
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '10px solid #654321',
          position: 'relative',
          imageRendering: 'pixelated',
        }}
      >
        {activeCustomerId && portraits[activeCustomerId] && (
          <Box
            component="img"
            src={portraits[activeCustomerId]}
            sx={{
              height: '140px',
              position: 'absolute',
              mt: -42,
              ml: 30,
              imageRendering: 'pixelated'
            }}
          />
        )}

        {activeOrder && <Box 
        sx={{
          width: '100%',
          height: '30px',
          position: 'absolute',
          mt: -22,
          backgroundColor: '#D2B48C', // light wood for the board
          border: '4px solid #A0522D',
          boxShadow: '0 4px #654321',
        }}>

          {showResponse ? 
          <Typography>
            {response}
          </Typography>
          :
            <Typography>
          {activeOrder.messageParts.before}
          <strong>{activeOrder.messageParts.order}</strong>
          {activeOrder.messageParts.after}
          </Typography>}
        </Box>}
        
        {showResponse && 
        <Button onClick={handleResponseButton}>
          Ok
        </Button>}

        {/* Chopping Board */}
        <Box
          sx={{
            width: '30%',
            height: '60%',
            mt: -2,
            backgroundColor: '#D2B48C', // light wood for the board
            border: '4px solid #A0522D',
            boxShadow: '0 4px #654321',
            cursor: 'pointer',  // make it clickable
          }}
          onClick={() => {
            setIsModalOpen(true);  // Open the modal
            setIsCookingMode(true); // Set cooking mode to true
          }}
        />
        
        <Box sx={{position: 'absolute', mt: -2, justifyContent: 'space-evenly'}}>
        {selectedItems.map((id, index) => {
          const ingredient = ingredients.find(item => item.id === id);
          return (
            ingredient && (
              <img
                key={index}
                src={ingredient.image}
                alt={`ingredient-${id}`}
                style={{
                  height: '30px',
                  width: '30px',
                  margin: '0 5px',
                  imageRendering: 'pixelated',
                }}
              />
            )
          );
        })}
        </Box>

        {showRecipe && currRecipe && (
        <>
        <Box sx={{position: 'absolute', mt: -3,}}>
          <img src={currRecipe.image} style={{
            height: '40px',
            width: '40px',
            imageRendering: 'pixelated'
            }}/>
        </Box>
        <Button onClick={handleSend} sx={{position: 'absolute', ml: 30}}>Send</Button>
        </>
      )}

        {isModalOpen && (
          <InventoryModal
            isCookingMode={isCookingMode}
            onClose={() => setIsModalOpen(false)}
            selected={selectedItems}
            setSelected={setSelectedItems}
          />
        )}

        {selectedItems.length > 1 && 
        <Button
          onClick={handleCook}
          sx={{
            mt: 2,
            fontFamily: 'monospace',
            backgroundColor: '#e0c177',
            border: '2px solid #000',
            boxShadow: '2px 2px 0 #000',
            position: 'absolute',
            ml: 30,
            '&:hover': {
              backgroundColor: '#c5a25a',
            },
          }}
        >
          Cook
        </Button>
        }

        {showAnimation && (
        <Box sx={{position: 'absolute'}}>
        <AnimationPlayer
          frames={frames}
          onDone={() => setShowAnimation(false)}
        />
        </Box>
      )}

      </Box>
    </>
  );
}