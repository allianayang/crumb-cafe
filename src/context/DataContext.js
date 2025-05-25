import React, { createContext, useContext, useEffect, useState } from 'react';

const DATA_KEY = 'gameData';

const defaultData = {
  ordersFilled: 0,
  wrongOrders: 0,
  perfectOrders: 0,
  ingredientsBought: 0,
  ingredientsUsed: 0,
  tasksCompleted: 0,
  pomodoroSessions: 0 //ensure they are completed fully
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(DATA_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  });

  // Sync to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }, [data]);

  // Utility functions
  const increment = (key, amount = 1) => {
    if (data.hasOwnProperty(key)) {
      setData(prev => ({
        ...prev,
        [key]: prev[key] + amount,
      }));
    }
  };

  const resetData = () => {
    setData(defaultData);
  };

  return (
    <DataContext.Provider value={{ data, increment, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
