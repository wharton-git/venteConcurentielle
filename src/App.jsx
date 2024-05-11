import React, { useEffect } from 'react';

import Routes from './Routes/Routes'

import './Style/Css/Style.css'

function App() {

  useEffect(() => {
    const savedItems = localStorage.getItem('cartItem');
    if (!savedItems) {
      localStorage.setItem('cartItem', JSON.stringify([]));
    }
  }, [])

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
