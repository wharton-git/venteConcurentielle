import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import UserNav from './UserNavigation'
import Commande from './Client/Commande'

const User = ({ route }) => {

    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        if (route === 'user') {
            setNavOpen(true)
        }
    },[route])

    return (
        <div className='sm:pl-52 bg-gray-700 h-screen text-white'>
            <div>
                <div className='' onClick={() => setNavOpen(true)}>
                    Menu
                </div>
                <UserNav navOpen={navOpen} setNavOpen={setNavOpen} />
            </div>
            <div className='text-center uppercase text-2xl my-2 font-bold'>
                Votre Compte
            </div>
            <div>
                {route === 'user' && <Commande />}
                {route === 'commande' && <Commande />}
            </div>
        </div>
    )
}

export default User
User