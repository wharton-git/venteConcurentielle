import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { MenuIcon, User2, UserCheck2, UserRoundCog } from 'lucide-react'
import { Link } from 'react-router-dom'

import url from './../Api/http'

import Home from './../Home'
import View from './View'
import Cart from './Cart'
import Sidebar from './Sidebar'
import Detail from './Detail'


function Navbar({ setIsUserLoggedIn, isUserLoggedIn, route }) {

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

    const hideSidebar = () => {
        setSidebarOn(false)
    }

    const fetchCategories = () => {
        url.post('/type')
            .then(res => {
                setCategories(res.data)
            })
            .catch(e => console.log(e))
    }
    const fetchProduits = () => {
        url.get('/all')
            .then(res => {
                setProduits(res.data)
                setFiltredData(res.data)
            })
            .catch(err => console.error('Erreur : ', err));
    }

    const handleSearchChange = (searchValue) => {
        const filtredResult = produits.filter(item => item.designation.toLowerCase().includes(searchValue.toLowerCase()));
        setFiltredData(filtredResult)
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
        const existingIndex = cartItem.findIndex(item => item.id === prod.id);

        if (existingIndex !== -1) {
            const updatedCart = [...cartItem];
            updatedCart[existingIndex].quantity += prod.quantity;
            setCartItem(updatedCart);
            localStorage.setItem('cartItem', JSON.stringify(updatedCart));
        } else {
            setCartItem(prevItems => {
                const updatedCart = [...prevItems, prod];
                localStorage.setItem('cartItem', JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    };

    const removeFromCart = (index) => {
        const newCartItems = [...cartItem];
        newCartItems.splice(index, 1);
        setCartItem(newCartItems);
        localStorage.setItem('cartItem', JSON.stringify(newCartItems));
    };

    const updateQuantity = (index, quantity) => {
        if (quantity >= 0 || isNaN(quantity)) {
            const newCartItems = [...cartItem];
            newCartItems[index].quantity = quantity;
            setCartItem(newCartItems);
            localStorage.setItem('cartItem', JSON.stringify(newCartItems));
        } else {
            alert("La quantité ne peut pas être négative"); //sweet
        }
    };


    const refreshData = () => {
        fetchProduits()
        fetchCategories()
        console.log("refreshData");
    }

    const fetchCartItems = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItem'));
        setCartItem(cartItems);
    }
    useEffect(() => {
        fetchProduits();
        fetchCategories();
        fetchCartItems();
    }, []);

    useEffect(() => {
        const total = cartItem.reduce((acc, item) => acc + item.quantity, 0);
        setTotalItems(total);
    }, [cartItem]);

    return (
        <>
            <div className='fixed z-10 top-0 shadow-md' onMouseLeave={() => { setIsMobileMenuOpen(false) }}>
                <nav className="bg-gray-800 w-screen p-4">
                    <div className="max-w-screen mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <div className={`text-white mr-4`} onClick={() => { setSidebarOn(!sidebarOn) }} >
                                <MenuIcon className={`${sidebarOn && `rotate-90`} transition-all`} />
                            </div>
                            <Link to='/' className="text-white hidden sm:block md:text-xl font-bold transition-all">
                                <span className=''>
                                    R. Market
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className=" relative bg-transparent rounded-full">
                                    <input type="text" placeholder="Recherche..."
                                        className="peer text-white cursor-pointer relative z-10 h-8 rounded-full border bg-transparent outline-none sm:pl-6 pl-2 w-32 sm:w-80 transition-all focus:cursor-text focus:border-gray-100 focus:pr-4"
                                        onChange={handleInputChange}
                                    />
                                    <Link to='/view'>
                                        <FontAwesomeIcon icon={faSearch} size='xl'
                                            className='text-white cursor-pointer px-3' />
                                    </Link>
                                </div>
                                <div className='sm:mx-2 text-white'>
                                    |
                                </div>
                                <div className=' px-2 text-white'>
                                    {!isUserLoggedIn ? (
                                        <Link to="/login" className='flex items-center space-x-2'>
                                            <div>
                                                <User2 />
                                            </div>
                                            <div className='hidden md:block transition-all'>
                                                Identifiez-vous
                                            </div>
                                        </Link>
                                    ):(
                                        <Link to="/user" className='flex items-center space-x-2'>
                                            <div>
                                                <UserCheck2 />
                                            </div>
                                            <div className='hidden md:block transition-all'>
                                                Mon Compte
                                            </div>
                                        </Link>
                                    )
                                }
                                </div>
                                <div className=''>
                                    <Link to='/cart' className="text-white relative px-3">
                                        <FontAwesomeIcon icon={faShoppingBag} size='xl' />
                                        <span className='absolute text-xs left-6 top-0 px-1 bg-red-300 rounded-full' id='compteur-card'>{displayTotalItems}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="mt-[64px]"></div>

            <div className={`fixed top-0 pt-[64px] z-[2] w-screen h-screen bg-black bg-opacity-65 text-white ${!sidebarOn && `hidden`} `} onMouseEnter={() => { hideSidebar() }}>
            </div>
            <div className={`fixed top-0 pt-[64px] z-[3] bg-gray-800 w-60 h-full -translate-x-96 ${sidebarOn && `translate-x-0`} transition-all`}>
                <Sidebar isUserLoggedIn={isUserLoggedIn} />
            </div>

            {route == 'home' && <Home addToCart={addToCart} />}
            {route == 'add' && <Add refresh={refreshData} />}
            {route == 'view' && <View data={filtredData} addToCart={addToCart} type={categories} onCategorieChange={handleCategoriesChange} refreshData={refreshData} />}
            {route == 'cart' && <Cart setItems={setCartItem} items={cartItem} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
            {route == 'detail' && <Detail addToCart={addToCart} />}

        </>
    );
}

export default Navbar;
