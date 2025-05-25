import React, { createContext, useContext, useState } from 'react';

// Create the context
const MoneyContext = createContext();

// Provider component
export const MoneyProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [gems, setGems] = useState(0);

  // Coins utilities
  const addCoins = (amount) => setCoins((prev) => prev + amount);
  const subtractCoins = (amount) => setCoins((prev) => Math.max(prev - amount, 0));
  const resetCoins = () => setCoins(0);

  // Gems utilities
  const addGems = (amount) => setGems((prev) => prev + amount);
  const subtractGems = (amount) => setGems((prev) => Math.max(prev - amount, 0));
  const resetGems = () => setGems(0);

  return (
    <MoneyContext.Provider
      value={{
        coins,
        gems,
        setCoins,
        setGems,
        addCoins,
        subtractCoins,
        resetCoins,
        addGems,
        subtractGems,
        resetGems,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

// Custom hook for easier usage
export const useMoney = () => {
  const context = useContext(MoneyContext);
  if (!context) {
    throw new Error('useMoney must be used within a MoneyProvider');
  }
  return context;
};
