import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import url from './../Api/http'

import Home from './../Home'
import Add from './Add'
import View from './View'
import Cart from './Cart'
import Sidebar from './Sidebar'


function Navbar({ isUserLoggedIn, route }) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [produits, setProduits] = useState([])
    const [filtredData, setFiltredData] = useState(produits)
    const [cartItem, setCartItem] = useState([])
    const [categories, setCategories] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [sidebarOn, setSidebarOn] = useState(false)

    const displayTotalItems = isNaN(totalItems) ? 0 : totalItems;

    const handleInputChange = (e) => {
        handleSearchChange(e.target.value)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const hideSidebar = () => {
        setSidebarOn(false)
    }

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


    const refreshData = () => {
        fetchProduits()
        fetchCategories()
        console.log("refreshData");
    }

    useEffect(() => {
        fetchProduits()
        fetchCategories()

        const total = cartItem.reduce((acc, item) => acc + item.quantity, 0);
        setTotalItems(total);
    }, [cartItem])

    return (
        <>
            <div className='fixed z-10 top-0' onMouseLeave={() => { setIsMobileMenuOpen(false) }}>
                <nav className="bg-gray-800 w-screen p-4">
                    <div className="max-w-screen mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <div className='text-white mr-4' onClick={() => { setSidebarOn(!sidebarOn) }} >
                                <MenuIcon />
                            </div>
                            <Link to='/' className="text-white md:text-xl font-bold transition-all">
                                <span className=''>
                                    R. Market
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className=" relative bg-transparent rounded-full mr-5">
                                    <input type="text" placeholder="Recherche..."
                                        className="peer text-white cursor-pointer relative z-10 h-8 rounded-full border bg-transparent outline-none sm:pl-6 pl-2 w-24 sm:w-80 transition-all focus:cursor-text focus:border-gray-100 focus:pr-4"
                                        onChange={handleInputChange}
                                    />
                                    <Link to='/view'>
                                        <FontAwesomeIcon icon={faSearch} size='xl'
                                            className='text-white cursor-pointer px-3' />
                                    </Link>
                                </div>
                                <div className='mr-5'>
                                    <Link to='/cart' className="text-white relative">
                                        <FontAwesomeIcon icon={faShoppingBag} size='xl' />
                                        <span className='absolute text-xs left-2 bottom-0 px-1 bg-red-300 rounded-full' id='compteur-card'>{displayTotalItems}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="mt-[64px]"></div>

            <div className={`fixed top-0 pt-[64px] z-[2] w-screen h-screen bg-black bg-opacity-65 text-white ${!sidebarOn && `hidden`} `} onMouseEnter={() => {hideSidebar()}}>
            </div>
            <div className={`fixed top-0 pt-[64px] z-[3] bg-gray-800 w-60 h-full -translate-x-96 ${sidebarOn && `translate-x-0`} transition-all`}>
                <Sidebar isUserLoggedIn={isUserLoggedIn} />
            </div>

            {route == 'home' && <Home />}
            {route == 'add' && <Add refresh={refreshData} />}
            {route == 'view' && <View data={filtredData} addToCart={addToCart} type={categories} onCategorieChange={handleCategoriesChange} />}
            {route == 'cart' && <Cart items={cartItem} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
        </>
    );
}

export default Navbar;
