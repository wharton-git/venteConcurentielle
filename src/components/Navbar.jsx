import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';

import url from './../Api/http'

import Logout from './../common/Auth/Logout'
import Home from './../Home'
import Add from './Add'
import View from './View';
import Cart from './Cart'

function Navbar({ setIsUserLoggedIn, isUserLoggedIn, route }) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [produits, setProduits] = useState([])
    const [filtredData, setFiltredData] = useState(produits)
    const [cartItem, setCartItem] = useState([])
    const [categories, setCategories] = useState([])
    const [totalItems, setTotalItems] = useState(0)

    const displayTotalItems = isNaN(totalItems) ? 0 : totalItems;

    const handleInputChange = (e) => {
        handleSearchChange(e.target.value)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
            <div className='fixed z-10 top-0'>
                <nav className="bg-gray-800 w-screen p-4">
                    <div className="max-w-screen mx-auto flex justify-between items-center">
                        <div className="flex-shrink-0">
                            <Link to='/' className="text-white text-xl font-bold">
                                <span className=''>
                                    R. Market
                                </span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <ul className="flex space-x-4 text-white">
                                <li>
                                    <Link to='/' className="hover:text-gray-300">Accueil</Link>
                                </li>
                                <li>
                                    <Link to='/view' className="hover:text-gray-300">Produits</Link>
                                </li>
                                <li>
                                    <Link to='/user' className="hover:text-gray-300">Mon Compte</Link>
                                </li>
                            </ul>
                        </div>
                        {/* Burger menu icon for mobile */}
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className=" relative bg-transparent rounded-full mr-5">
                                    <input type="text" placeholder="Recherche..."
                                        className="peer text-white cursor-pointer relative z-10 h-8 rounded-full border bg-transparent outline-none pl-6 w-32 md:w-60 transition-all focus:cursor-text focus:border-gray-100 focus:pr-4"
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
                                <div className="hidden md:block px-3 border-l-2 h-5">
                                    {isUserLoggedIn ? (
                                        <div>
                                            <Logout />
                                        </div>
                                    ) : (
                                        <div className='text-white'>
                                            <Link to='/login'>Se Connecter</Link>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className='md:hidden'>
                                <button onClick={toggleMobileMenu} className="text-white hover:text-gray-300 focus:outline-none">
                                    <FontAwesomeIcon icon={faBars} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden">
                            <ul className="text-white">
                                <li><Link to='/' className="block py-2 px-4 hover:bg-gray-700">Accueil</Link></li>
                                <li><Link to='/view' className="block py-2 px-4 hover:bg-gray-700">Produits</Link></li>
                                <li><Link to='/user' className="block py-2 px-4 hover:bg-gray-700">Mon Compte</Link></li>
                                <li className="block py-2 px-4 hover:bg-gray-700"><Logout /></li>
                            </ul>
                        </div>
                    )}
                </nav>
            </div>

            <div className="mt-[64px]"></div>

            {route == 'home' && <Home />}
            {route == 'add' && <Add refresh={refreshData} />}
            {route == 'view' && <View data={filtredData} addToCart={addToCart} type={categories} onCategorieChange={handleCategoriesChange} />}
            {route == 'cart' && <Cart items={cartItem} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
        </>
    );
}

export default Navbar;
