import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookie from 'js-cookie';

import Nav from './components/Navbar'
import Login from './common/Auth/Login'
import Register from './common/Auth/Register'
import Dashboard from './components/Dashboard'
import './Style/Css/Style.css'

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const verifyStateLog = () => {
    const verifyjwt = Cookie.get('jwt')
    if (!verifyjwt) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }

  useEffect(() => {

    verifyStateLog()

  }, [])

  return (
    <>
      <Router>
        <div className=''>
          <Routes>
            <Route path={'/'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'home'} />} />
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/login'} element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path={'/register'} element={<Register setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path={'/view'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'view'} />} />
            <Route path={'/cart'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'cart'} />} />
            <Route path={'/add'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'add'} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
