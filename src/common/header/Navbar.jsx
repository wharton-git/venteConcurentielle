import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHome, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import NavAlt from './../../components/NavAlternative'

const Navbar = ({ categories, filtredCat, isUserLoggedIn }) => {
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdown(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            event.target !== document.querySelector('.dropdown-button')
        ) {
            setDropdown(false);
        }
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='flex justify-between mt-2'>
                <button className='dropdown-button px-2 py-1 mx-1' onClick={toggleDropdown}>
                    Categories
                    <span className='transition-all'>
                        <FontAwesomeIcon icon={faChevronDown} className={dropdown ? '-rotate-180 transition-all' : 'rotate-0 transition-all'} />
                    </span>
                </button>

                <div className='flex items-center'>
                    {isUserLoggedIn ? (
                        <div className='flex items-center'>
                            <Link to='/' className='px-2 py-1 mx-1  hover:bg-indigo-600 rounded-lg transition-all'>
                                <FontAwesomeIcon icon={faHome} />
                                Home
                            </Link>
                            <Link to='/user' className='px-2 py-1 mx-1  hover:bg-indigo-600 rounded-lg transition-all'>
                                <FontAwesomeIcon icon={faUser} />
                                Profil
                            </Link>
                            <Link to='/contact' className='px-2 py-1 mx-1  hover:bg-indigo-600 rounded-lg transition-all'>
                                <FontAwesomeIcon icon={faPhone} />
                                Contact
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link to='/login' className='px-2 py-1 mx-1  hover:bg-indigo-600 rounded-lg transition-all'>
                                Se connecter
                            </Link>
                            <Link to='/register' className='px-2 py-1 mx-1  hover:bg-indigo-600 rounded-lg transition-all'>
                                S'enregistrer
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className={dropdown ? 'dropdownShow ' : 'dropdownHide'} ref={dropdownRef}>
                <div className='absolute text-black'>
                    <div className='m-0'>
                        <div className='m-2 rounded-md shadow-lg bg-slate-100'>
                            <ul className='rounded-xl grid grid-cols-2 sm:grid-cols-4 transition-all '>
                                {categories && categories.map((type, index) => (
                                    <div key={index} className='m-1 flex rounded-lg transition-all'>
                                        <Link
                                            to='/view'
                                            onClick={() => filtredCat(type)}
                                            className='px-4 py-2 bg-indigo-500 text-white rounded-md transition-all'
                                        >{type}</Link>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <NavAlt />

        </>
    );
};

export default Navbar;
