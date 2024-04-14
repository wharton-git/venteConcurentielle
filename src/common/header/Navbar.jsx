import React, { useState } from 'react'
import Categories from './Categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleUp, faHome, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [dropdown, setDropdown] = useState(false)

    const activeDrop = () => {
        setDropdown(true)
    }

    const disactiveDrop = () => {
        setDropdown(false)
    }

    return (
        <>
            <div className='flex justify-between'>
                <button className='px-2 py-1 m-1' onClick={() => setDropdown(!dropdown)}>
                    Categories
                    {dropdown ? <FontAwesomeIcon icon={faChevronCircleDown} /> : <FontAwesomeIcon icon={faChevronCircleUp} />}
                </button>
                <div className=''>
                    <Link to='/' className='px-2 py-1 m-1'>
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </Link>
                    <button className='px-2 py-1 m-1'>
                        <FontAwesomeIcon icon={faPhone} />
                        Contact
                    </button>
                </div>
            </div>
            {dropdown ?
                <div >
                    <Categories />
                </div>
                :
                <div>

                </div>
            }
        </>
    )
}

export default Navbar
