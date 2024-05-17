import React, { useEffect, useState } from 'react';
import url from './../../Api/http';
import Cookie from 'js-cookie';
import { ChevronDown } from 'lucide-react';

import Loading from './../Screen/Loading';

const Commande = ({ title, desc }) => {
    const [user, setUser] = useState([]);
    const [commandes, setCommandes] = useState([]);
    const [openCommand, setOpenCommand] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCommandeInfo();
        setLoading(true)
    }, []);

    const getCommandeInfo = async () => {
        const jwt = Cookie.get('jwt');
        if (jwt) {
            try {
                const userFetch = await url.post('/auth/me', {}, {
                    headers: {
                        Authorization: 'bearer ' + jwt,
                    }
                });
                setUser(userFetch.data);

                try {

                    const comm = await url.post('/commandes', { user_id: userFetch.data.id });
                    setCommandes(comm.data);

                    setTimeout(() => {
                        setLoading(false);
                    }, 300);

                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const toggleOpenCommand = (index) => {
        setOpenCommand(openCommand === index ? null : index);
    };

    return (
        <div className=''>

            {/* Loading Page*/}

            {loading && (
                <div className='absolute z-10 top-0 w-full h-screen'>
                    <Loading />
                </div>
            )}

            <div className='text-center'>
                <div className='uppercase text-2xl py-2 font-bold'>
                    {title}
                </div>
                <div className='hidden sm:block'>
                    {desc}
                </div>

                <div className='max-h-[85vh] overflow-y-scroll px-10 my-10'>
                    <div className='overflow-clip rounded-lg space-y-1'>
                        {commandes.map((commande, index) => (
                            <div key={commande.id}>
                                <div
                                    className='flex bg-gray-900 cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-700'
                                    onClick={() => toggleOpenCommand(index)}
                                >
                                    <p>Date: {commande.date}</p>
                                    <p>Prix Total: {commande.prix_commande} $</p>
                                    <div className={`transition-all ${openCommand === index && `rotate-180`}`}>
                                        <ChevronDown />
                                    </div>
                                </div>

                                <div className={`overflow-hidden max-h-0 bg-gray-800 ${openCommand === index && `max-h-96`} transition-all`}>
                                    <div className='grid grid-cols-3 border-b mx-6 uppercase font-bold'>
                                        <p>Article</p>
                                        <p>Quantité</p>
                                        <p>Prix</p>
                                    </div>
                                    {commande.lines.map(ligne => (
                                        <div key={ligne.id}>
                                            <div className='grid grid-cols-3 items-center mx-4 border-b-2 border-gray-500 border-opacity-40'>

                                                <p>{ligne.article}</p>
                                                <p>{ligne.qte}</p>
                                                <p> {ligne.prix} $</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commande;
