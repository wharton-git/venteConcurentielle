import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookie from 'js-cookie';

import Nav from './components/Navbar'
import Login from './common/Auth/Login'
import Register from './common/Auth/Register'
import User from './components/User'
import './Style/Css/Style.css'

import Test from './Tests/Test'

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const verifyjwt = Cookie.get('jwt');
    setIsUserLoggedIn(!!verifyjwt);

  }, []);

  console.log(isUserLoggedIn);


  return (
    <>
      <Router>
        <div className=''>
          <Routes>

            <Route path={'/test'} element={<Test />} />

            <Route path={'/'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'home'} />} />
            <Route path={'/view'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'view'} />} />
            <Route path={'/cart'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'cart'} />} />
            <Route path={'/add'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'add'} />} />
            <Route path={'/user'} element={<User />} />
            <Route path={'/login'} element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path={'/register'} element={<Register setIsUserLoggedIn={setIsUserLoggedIn} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
