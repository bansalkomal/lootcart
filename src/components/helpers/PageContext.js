// PageContext.js
import { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');

  return (
    <PageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
