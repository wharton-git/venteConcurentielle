import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookie from 'js-cookie';

import Nav from './components/Navbar'
import Login from './common/Auth/Login'
import Register from './common/Auth/Register'
import Dashboard from './components/Dashboard'
import './Style/Css/Style.css'

import Test from './Tests/Test'

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const verifyjwt = Cookie.get('jwt');
    setIsUserLoggedIn(!!verifyjwt);

  }, []);


  return (
    <>
      <Router>
        <div className=''>
          <Routes>

          <Route path={'/test'} element={<Test />} />

            <Route path={'/'} element={<Nav isUserLoggedIn={isUserLoggedIn} route={'home'} />} />
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/login'} element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path={'/register'} element={<Register setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path={'/view'} element={<Nav isUserLoggedIn={isUserLoggedIn} route={'view'} />} />
            <Route path={'/cart'} element={<Nav isUserLoggedIn={isUserLoggedIn} route={'cart'} />} />
            <Route path={'/add'} element={<Nav isUserLoggedIn={isUserLoggedIn} route={'add'} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
