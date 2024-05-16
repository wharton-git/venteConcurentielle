import { UserRoundCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserNavigation = ({ navOpen, setNavOpen, list }) => {


    const navigate = useNavigate()
    const [animNav, setAnimNav] = useState(false)

    useEffect(() => {
        if (navOpen) {
            setAnimNav(true)
        }
    })

    const closeNav = () => {
        setAnimNav(false)
        setTimeout(() => {
            setNavOpen(false)
        }, 600)
    }

    const goTo = (route) => {
        navigate(route)
        setNavOpen(false)
    }

    return (
        <>
            {navOpen && (
                <div className='sm:hidden absolute w-screen h-screen bg-black bg-opacity-80 top-0 flex items-center'>
                    <div className='text-white absolute top-3 right-5 text-5xl font-bold' onClick={() => closeNav()}>&times;</div>
                    <div className={`space-y-3 text-xl w-full ${animNav ? `userNavAnimation_show` : `userNavAnimation_hide`} transition-all`}>
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

            <div className='hidden sm:block absolute rounded-xl  text-white h-screen top-0 left-0 w-[30vw] max-w-52 '>
                <div className='flex items-center space-x-2 p-3 text-base font-bold'>
                    <div>
                        <UserRoundCog />
                    </div>
                    <div>
                        Espace Compte
                    </div>
                </div>
                <div>
                    {
                        list.map(list => (
                            <div className='div cursor-pointer'>
                                <div onClick={() => goTo(list.route)} className='flex items-center p-2 rounded-lg w-5/6 mx-auto space-x-2 transition-all'>
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
            </div>
        </>
    )
}

export default UserNavigation
