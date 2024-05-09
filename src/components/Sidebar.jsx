import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BoxIcon, HomeIcon, LogInIcon, User2Icon } from 'lucide-react';

import url from './../Api/http'
import Cookie from 'js-cookie';

import Logout from './../common/Auth/Logout'

const Sidebar = ({ setIsUserLoggedIn, isUserLoggedIn }) => {

    const [userInfo, setUserInfo] = useState([])
    const [infoCheck, setInfoCheck] = useState(false)

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
            {infoCheck && (
                <div className='absolute bottom-10 mb-3'>
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
            )}
            <div className="absolute bottom-0  w-60 h-10 grid items-center border-t-2">
                {isUserLoggedIn ? (
                    <div className=''>
                        <Logout  />
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