import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BoxIcon, HomeIcon, LogInIcon, ShoppingCart, User2Icon } from 'lucide-react';

import url from './../Api/http'
import Cookie from 'js-cookie';

import Logout from './../common/Auth/Logout'

const Sidebar = ({ setIsUserLoggedIn, isUserLoggedIn }) => {

    const [userInfo, setUserInfo] = useState([])
    const [infoCheck, setInfoCheck] = useState(false)

    const location = useLocation()

    useEffect(() => {
        getUserInfo();
    }, [])

    const getUserInfo = async () => {
        const jwt = Cookie.get('jwt')
        if (jwt) {
            try {
                const info = await url.post('/auth/me', {}, {
                    headers: {
                        Authorization: 'bearer ' + jwt,
                    }
                });
                setUserInfo(info.data);
                setInfoCheck(true)
            } catch (error) {
                console.log(error);
                setInfoCheck(false)
            }
        }

    }

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
            "route": "/cart",
            "name": "Panier",
            "icon": <ShoppingCart />,
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
                    sideElement.map((list, index) => (
                        <li className='' key={index}>

                            <Link to={list.route} className={`flex items-center hover:bg-slate-50 hover:text-black hover:scale-110 w-full py-3 transition-all ${location.pathname === list.route && `bg-slate-50 text-black`} active:scale-100`}>
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
            {infoCheck && (
                <Link to='/user' className='cursor-pointer'>
                    <div className='absolute bottom-10 mb-3 active:scale-95 w-full transition-all'>
                        <div className=' text-white space-x-3 ml-3 flex items-center'>
                            <div className='border p-2.5 rounded-md bg-gray-700'>
                                <User2Icon />
                            </div>
                            <div className=''>
                                <div className='text-[1.2rem]'>
                                    {userInfo.name}
                                </div>
                                <div className='text-[.7rem]'>
                                    {userInfo.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            <div className="absolute bottom-0 w-60 h-10 grid items-center border-t-2 active:scale-95 transition-all">
                {isUserLoggedIn ? (
                    <div className='text-white'>
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
