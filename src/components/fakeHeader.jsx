import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-screen mx-auto flex justify-between items-center">
                <div className="flex-shrink-0">
                    <Link to='/' className="text-white text-xl font-bold">MonSiteEcommerce</Link>
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
                            <Link to='/cart' className="hover:text-gray-300">Panier</Link>
                        </li>
                        <li>
                            <Link to='/user' className="hover:text-gray-300">Mon Compte</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center">
                    <div className="hidden md:block mr-4">
                        <input type="text" placeholder="Recherche..." className="px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
                    </div>
                    <div className="hidden md:block mr-4">
                        <span className="text-white mr-2">Bienvenue, Utilisateur!</span>
                        <Link to='/' className="text-white hover:underline">Déconnexion</Link>
                    </div>
                    <Link to='/' className="text-white hover:text-gray-300">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path d="M3 3h18v2H3V3m3 7h12l-1.5 7H7.5l-1.5-7zM7.5 18h9l2.25-8H5.25L7.5 18z" />
                        </svg>
                    </Link>
                </div>
                {/* Burger menu icon for mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white hover:text-gray-300 focus:outline-none">
                        {/* {isMobileMenuOpen ? (
                                
                            ) : (
                                
                            )} */}
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <ul className="text-white">
                        <li><Link to='/' className="block py-2 px-4 hover:bg-gray-700">Accueil</Link></li>
                        <li><Link to='/' className="block py-2 px-4 hover:bg-gray-700">Produits</Link></li>
                        <li><Link to='/' className="block py-2 px-4 hover:bg-gray-700">Panier</Link></li>
                        <li><Link to='/' className="block py-2 px-4 hover:bg-gray-700">Mon Compte</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
