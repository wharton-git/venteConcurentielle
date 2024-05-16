import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Home, LockKeyhole, MapPin, TicketCheck, User2 } from 'lucide-react'

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
        user: "Connexion et Sécurité",
        info: "Information personnelle",
        adresse: "Adresse",
        security: "Connexion et Sécurité",
        payment: "Payement",
    }

    const descriptions = {
        commande: "Consulter l'historique de vos commandes.",
        user: "Modifier vos informations personnelles.",
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
                <div className='sm:hidden' onClick={() => setNavOpen(true)}>
                    Menu
                </div>
                <UserNav navOpen={navOpen} setNavOpen={setNavOpen} list={list} />
            </div>
            <div>
                <div className=''>
                    <Component title={title[route]} desc={descriptions[route]}/>
                </div>
            </div>
        </div>
    )
}

export default User