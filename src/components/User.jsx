import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, EllipsisVertical, Home, LockKeyhole, MapPin, TicketCheck, User2 } from 'lucide-react'

import UserNav from './UserNavigation'
import Commande from './Client/Commande'
import Info from './Client/Info'
import Adress from './Client/Adresse'
import Security from './Client/Security'
import Payment from './Client/Payment'

const User = ({ route }) => {

    const list = [
        {
            "route": "/",
            "name": "Accueil",
            "icon": <Home />,
            "description": "Retourner à l'accueil.",
        },
        {
            "route": "/commande",
            "name": "Vos Commande",
            "icon": <TicketCheck />,
            "description": "Consulter l'historique de vos commandes.",
        },
        {
            "route": "/info",
            "name": "Information personnelle",
            "icon": <User2 />,
            "description": "Modifier vos informations personelles.",
        },
        {
            "route": "/security",
            "name": "Connexion et Sécurité",
            "icon": <LockKeyhole />,
            "description": "Modifier votre e-mail, mot de passe.",
        },
        {
            "route": "/adresse",
            "name": "Adresse",
            "icon": <MapPin />,
            "description": "Modifier votre adresse de livraison.",
        },
        {
            "route": "/payment",
            "name": "Payement",
            "icon": <CreditCard />,
            "description": "Modifier vos informations de payement.",
        },
    ]

    const components = {
        commande: Commande,
        user: Commande,
        info: Info,
        adresse: Adress,
        security: Security,
        payment: Payment,
    };

    const title = {
        commande: "Vos Commandes",
        user: "Vos Commandes",
        info: "Information personnelle",
        adresse: "Adresse",
        security: "Connexion et Sécurité",
        payment: "Payement",
    }

    const descriptions = {
        commande: "Consulter l'historique de vos commandes.",
        user: "Consulter l'historique de vos commandes.",
        info: "Modifier vos informations personelles.",
        adresse: "Modifier votre adresse de livraison.",
        security: "Modifier votre e-mail, mot de passe.",
        payment: "Modifier vos informations de payement.",
    };

    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        if (route === 'user') {
            setNavOpen(true);
        }
    }, [route]);

    const Component = components[route];

    return (
        <div className='sm:pl-52 bg-gray-700 mt-0 h-screen text-white bg-gradient-to-tr from-gray-600 from-10% via-gray-700 via-50% to-gray-600 to-90%'>
            <div>
                <div className='sm:hidden absolute z-20 top-5 right-5 bg-gray-800 rounded-full shadow-md p-1 transition-all active:bg-white active:text-gray-800' onClick={() => setNavOpen(true)}>
                    <EllipsisVertical/>
                </div>
                <UserNav navOpen={navOpen} setNavOpen={setNavOpen} list={list} />
            </div>
            <div>
                <div className='relative pt-10'>
                    <Component title={title[route]} desc={descriptions[route]}/>
                </div>
            </div>
        </div>
    )
}

export default User