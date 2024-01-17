import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createContext } from 'react';

export const Context = createContext();
// export const server = 'http://localhost:5000';
export const server = 'https://secretmessagebackend.onrender.com';

const AppWrapper = () => {

  //Global Variables
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loader, setLoader] = useState(false);

  return (
    <Context.Provider value={{
      isUserLoggedIn,
      setIsUserLoggedIn,
      loader, setLoader, server
    }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper />
)
