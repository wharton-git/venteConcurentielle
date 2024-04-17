import React, { useState } from 'react'
import Categories from './Categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleUp, faHome, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = ({categories, filtredCat}) => {

    const [dropdown, setDropdown] = useState(false)

    const activeDrop = () => {
        setDropdown(true)
    }

    const disactiveDrop = () => {
        setDropdown(false)
    }

    return (
        <>
            <div className='flex justify-between mt-2'>
                <button className='px-2 py-1 mx-1' onClick={() => setDropdown(!dropdown)}>
                    Categories
                    {dropdown ? <FontAwesomeIcon icon={faChevronCircleDown} /> : <FontAwesomeIcon icon={faChevronCircleUp} />}
                </button>
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
            </div>
            {dropdown ?
                <div >
                    <Categories categories={categories} filtredCat={filtredCat} />
                </div>
                :
                <div>

                </div>
            }
        </>
    )
}

export default Navbar
