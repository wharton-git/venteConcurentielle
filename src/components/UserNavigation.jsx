import { CreditCard, Home, LockKeyhole, MapPin, Shield, TicketCheck, User2, UserRoundCog } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserNavigation = ({ navOpen, setNavOpen }) => {

    const list = [
        {
            "route": "/",
            "name": "Accueil",
            "icon": <Home />,
            "description": "Retourner à l'accueil.",
        },
        {
            "route": "/commande",
            "name": "Vos Commandes",
            "icon": <TicketCheck />,
            "description": "Consulter l'historique de vos commandes.",
        },
        {
            "route": "/user",
            "name": "Information personnelle",
            "icon": <User2 />,
            "description": "Modifier vos informations personelles.",
        },
        {
            "route": "/user",
            "name": "Connexion et Sécurité",
            "icon": <LockKeyhole />,
            "description": "Modifier votre e-mail, mot de passe",
        },
        {
            "route": "/user",
            "name": "Adresse",
            "icon": <MapPin />,
            "description": "Modifier votre adresse de livraison.",
        },
        {
            "route": "/user",
            "name": "Payement",
            "icon": <CreditCard />,
            "description": "Modifier vos informations de payement.",
        },
    ]

    const navigate = useNavigate()
    const [animNav, setAnimNav] = useState(true)

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
                                <div className='div'>
                                    <div onClick={() => goTo(list.route)} className='flex items-center p-2 bg-white rounded-lg w-5/6 mx-auto space-x-2 transition-all'>
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

            <div className='hidden sm:block absolute rounded-xl bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-700 text-white h-screen top-0 left-0 w-[30vw] max-w-52 '>
                <div className='flex items-center space-x-2 p-3 text-base font-bold'>
                    <div>
                        <UserRoundCog/>
                    </div>
                    <div>
                        Espace Compte
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserNavigation
