import { Home } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UserNavigation = ({ navOpen, setNavOpen, list }) => {


    const navigate = useNavigate()
    const [animNav, setAnimNav] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (navOpen) {
            setAnimNav(true)
        }
    })

    useEffect(() => {
        if (location.pathname === "/user") {
            navigate("/commande")
        }
    }, [list])

    const closeNav = () => {
        setAnimNav(false)
        setNavOpen(false)
    }

    const goTo = (route) => {
        navigate(route)
        setNavOpen(false)
    }

    return (
        <>
            {navOpen && (
                <div className='sm:hidden absolute z-20 w-screen h-screen bg-black bg-opacity-80 top-0 flex items-center'>
                    <div className='text-white absolute top-3 right-5 text-5xl font-bold' onClick={() => closeNav()}>&times;</div>
                    <div className={`space-y-3 text-xl w-full ${animNav && `userNavAnimation_show`} transition-all`}>
                        {
                            list.map(list => (
                                <div className='div cursor-pointer'>
                                    <div onClick={() => goTo(list.route)} className='flex items-center p-2 text-black bg-white rounded-lg w-5/6 mx-auto space-x-2 transition-all'>
                                        <div>
                                            {list.icon}
                                        </div>
                                        <div>
                                            <div>
                                                {list.name}
                                            </div>
                                            <div className='text-xs text-gray-500'>
                                                {list.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}

            <div className='hidden sm:block absolute text-white h-screen top-0 left-0 w-[30vw] max-w-52 py-4'>
                <div className='border-r-2 border-white h-full relative'>
                    <div className='mb-5'>
                        <div className='p-4 space-y-3'>
                            <div className='text-xl font-black'>
                                Espace Comptes
                            </div>
                            <div className='text-xs font-bold'>
                                Gérer vos paramètres de comptes et votre profil
                            </div>
                        </div>

                    </div>

                    <div className='space-y-3'>
                        {
                            list.map(list => (
                                <div className='div cursor-pointer'>
                                    <div
                                        onClick={() => navigate(list.route)}
                                        className={`flex items-center p-2 rounded-lg w-5/6 mx-auto space-x-2 transition-all ${location.pathname === list.route ? 'bg-gray-600' : ''} hover:bg-gray-500`}
                                    >
                                        <div>
                                            {list.icon}
                                        </div>
                                        <div>
                                            <div>
                                                {list.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className='absolute bottom-0 w-full px-3'>
                        <div className='div cursor-pointer'>
                            <div
                                onClick={() => navigate("/")}
                                className={`flex items-center p-2 bg-gray-800 rounded-lg  space-x-2 transition-all`}
                            >
                                <div>
                                    <Home />
                                </div>
                                <div>
                                    <div>
                                        Revenir à l'accueil
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserNavigation
