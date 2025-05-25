import React, { createContext, useContext, useEffect, useState } from 'react';

const InventoryContext = createContext();
export const useInventory = () => useContext(InventoryContext);

// Load from localStorage
const loadInventory = () => {
  const stored = localStorage.getItem('inventory');
  return stored ? JSON.parse(stored) : [{id:1,count:2},{id:2,count:1}];
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventoryState] = useState(loadInventory);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const setInventory = (newInventory) => {
    setInventoryState(newInventory);
  };

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};
