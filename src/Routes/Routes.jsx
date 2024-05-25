import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav from './../components/Navbar'
import Login from './../common/Auth/Login'
import Register from './../common/Auth/Register'
import User from './../components/User'

import Test from './../Tests/Test'

const RoutesX = () => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const verifyjwt = Cookie.get('jwt');
        setIsUserLoggedIn(!!verifyjwt);

    }, []);

    console.log(isUserLoggedIn);


    return (
        <div>
            <Router>
                <Routes>
                    <Route path={'/test'} element={<Test />} />

                    <Route path={'/'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'home'} />} />
                    <Route path={'/view'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'view'} />} />
                    <Route path={'/cart'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'cart'} />} />
                    <Route path={'/add'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'add'} />} />
                    <Route path={'/detail/:id'} element={<Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} route={'detail'} />} />
                    <Route path={'/commande'} element={<User route={'commande'} />} />
                    <Route path={'/info'} element={<User route={'info'} />} />
                    <Route path={'/adresse'} element={<User route={'adresse'} />} />
                    <Route path={'/security'} element={<User route={'security'} />} />
                    <Route path={'/payment'} element={<User route={'payment'} />} />
                    <Route path={'/user'} element={<User route={'commande'} />} />
                    <Route path={'/login'} element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />} />
                    <Route path={'/register'} element={<Register setIsUserLoggedIn={setIsUserLoggedIn} />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RoutesX
