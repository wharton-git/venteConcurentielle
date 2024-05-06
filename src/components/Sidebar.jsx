import React from 'react'
import { Link } from 'react-router-dom';


import Logout from './../common/Auth/Logout'
import { BoxIcon, HomeIcon, LogInIcon, User2Icon } from 'lucide-react';

const Sidebar = ({ isUserLoggedIn }) => {

    const sideElement = [
        {
            "route": "/",
            "name": "Accueil",
            "icon": <HomeIcon />,
        },
        {
            "route": "/view",
            "name": "Produits",
            "icon": <BoxIcon />,
        },
        {
            "route": "/user",
            "name": "Mon Compte",
            "icon": <User2Icon />,
        },

    ]

    return (
        <div className=''>
            <ul className="text-white  ">
                {
                    sideElement.map(list => (
                        <li className=''>

                            <Link to={list.route} className="flex items-center hover:bg-slate-50 hover:text-black hover:scale-110 w-full py-3 transition-all">
                                <div className='mx-3'>
                                    {list.icon}
                                </div>
                                <div>
                                    {list.name}
                                </div>
                            </Link>
                        </li>
                    ))
                }

            </ul>

            <div className="absolute bottom-0  w-60 h-10 grid items-center border-t-2">
                {isUserLoggedIn ? (
                    <div className=''>
                        <Logout />
                    </div>
                ) : (
                    <div className='text-white '>
                        <Link to='/login' className='flex space-x-2 items-center p-2 w-full'>
                            <LogInIcon />
                            <div>Se Connecter</div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
