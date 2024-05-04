import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookie from 'js-cookie';

import FakeHeader from './components/fakeHeader'
import url from './Api/http'
import View from './components/View'
import Test from './Tests/Test'
import Add from './components/Add'
import Home from './Home'
import Nav from './components/Navbar'
import Login from './common/Auth/Login'
import Register from './common/Auth/Register'
import Cart from './components/Cart'
import './Style/Css/Style.css'

function App() {

  const [searchValue, setSearchValue] = useState('')
  const [produits, setProduits] = useState([])
  const [filtredData, setFiltredData] = useState(produits)
  const [cartItem, setCartItem] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [categories, setCategories] = useState([])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState([])

  const fetchCategories = () => {
    url.post('/type')
      .then(res => {
        setCategories(res.data)
        console.log(categories)
      })
      .catch(e => console.log(e))
  }
  const fetchProduits = () => {
    url.get('/all')
      .then(res => {
        setProduits(res.data)
        setFiltredData(res.data)
        console.log(produits)
      })
      .catch(err => console.error('Erreur : ', err));
  }

  const handleSearchChange = (searchValue) => {
    setSearchValue(searchValue);
    console.log('Valeur de Recherche : ' + searchValue)
    const filtredResult = produits.filter(item => item.designation.toLowerCase().includes(searchValue.toLowerCase()));
    setFiltredData(filtredResult)
    console.log(filtredResult)
    console.log('Valeur Filtré : ' + filtredResult)
  }

  const handleCategoriesChange = (categories) => {
    if (categories != "all") {
      const filtredResult = produits.filter(item => item.type.toLowerCase().includes(categories.toLowerCase()));
      setFiltredData(filtredResult)
    } else {
      setFiltredData(produits)
    }
  }

  const addToCart = (prod) => {
    setCartItem([...cartItem, prod])
  }

  const removeFromCart = (index) => {
    const newCartItems = [...cartItem];
    newCartItems.splice(index, 1);
    setCartItem(newCartItems);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity >= 0 || isNaN(quantity)) {
        const newCartItems = [...cartItem];
        newCartItems[index].quantity = quantity;
        setCartItem(newCartItems);
    } else {
        alert("La quantité ne peut pas être négative");
    }
};


  const filtredCategories = (types) => {
    // console.log(types);
    const filtredResult = produits.filter(item => item.type.toLowerCase().includes(types.toLowerCase()));
    setFiltredData(filtredResult)
    // console.log(filtredResult);
  }

  const refreshData = () => {
    fetchProduits()
    fetchCategories()
    console.log("refreshData");
  }

  const updateUserLoginStatus = (status) => {
    setIsUserLoggedIn(status);
  }

  const verifyStateLog = () => {
    const verifyjwt = Cookie.get('jwt')
    if (!verifyjwt) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }

  useEffect(() => {
    fetchProduits()
    fetchCategories()

    verifyStateLog()

    const total = cartItem.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  }, [cartItem])

  return (
    <>
      <Router>
        {/* <div className='fixed w-screen top-0 z-10 shadow-lg'>
          <div className='flex bg-indigo-500 text-white px-4 pt-2'>
            <div className='w-24 px-3 pt-2'>
              <img src={Logo} />
            </div>
            <div className='grid grid-cols-1 w-full'>
              <Navbar categories={categories} filtredCat={filtredCategories} isUserLoggedIn={isUserLoggedIn} />
            </div>
          </div>
        </div> */}
        <div className='fixed z-20'>
          <Nav totalItems={totalItems} onSearchChange={handleSearchChange} isUserLoggedIn={isUserLoggedIn} />
        </div>
        <FakeHeader />
        <div className=''>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/login'} element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path={'/register'} element={<Register setIsUserLoggedIn={setIsUserLoggedIn} />} />
            <Route path={'/view'} element={<View data={filtredData} addToCart={addToCart} type={categories} onCategorieChange={handleCategoriesChange} />} />
            <Route path={'/test'} element={<Test />} />
            <Route path={'/cart'} element={<Cart items={cartItem} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path={'/add'} element={<Add refresh={refreshData} />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
