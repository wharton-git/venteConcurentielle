import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMobile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AtSignIcon, HandCoinsIcon, MapPinIcon, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

import classe from './../Style/Css/style.module.css'
import url from './../Api/http'

import Loading from './Loading/Loading';

const Cart = ({ items, removeFromCart, updateQuantity }) => {

    const [infoUser, setInfoUser] = useState([])
    const [activeModal, setActiveModal] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [adresseOption, setAdresseOption] = useState(false)
    const [otherPaid, setOtherPaid] = useState(false)
    const [cardMode, setCardMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorCart, setErrorCart] = useState(false)

    useEffect(() => {
        setErrorCart(false)
    }, [])

    const navigate = useNavigate()

    const calculateSubtotal = () => {
        const subtotal = items.reduce((total, item) => {

            return total + (item.prix * item.quantity);

        }, 0);

        return subtotal.toFixed(2);
    };

    const handleDisactiveModal = () => {
        setTimeout(() => {
            setActiveModal(false);
            setAdresseOption(false);
            setOtherPaid(false);
        }, 200)
        setShowContent(false);
    }

    const handleAdresseOptionsToggle = () => {
        setAdresseOption(!adresseOption);
    }

    const handleOtherPaid = () => {
        setOtherPaid(!otherPaid);
    }

    const handleMethodPaid = (method) => {
        if (method === 'mobile') {
            setCardMode(false);
        }
        else {
            setCardMode(true);
        }
    };

    const validateCommande = async () => {
        try {
            const id = infoUser.id;
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const prix = calculateSubtotal();

            console.log(id);
            console.log(date);
            console.log(prix);

            const response = await url.post('/commande', {
                user_id: id,
                date_commande: date,
                prix_commande: prix
            });

            console.log(response.data);

            const response2 = await url.post('/detailCommande', items);
            console.log(response2.data);
            console.log('Detail Sauvegardé !');

            console.log('Commande passée avec succès');
            alert('Commande passée avec succès');
            navigate('/')

        } catch (err) {
            console.log(err);
            alert(err)
        }
    };


    const passerCommande = async () => {
        const jwt = Cookie.get('jwt');

        if (!jwt) {
            navigate('/login');
            return;
        }

        try {

            setLoading(true);

            const userInfo = await url.post('/auth/me', {}, {
                headers: {
                    Authorization: 'bearer ' + jwt,
                }
            });

            setInfoUser(userInfo.data);
            setActiveModal(true);

            setTimeout(() => {
                setLoading(false);
                setShowContent(true)
            }, 500);

        } catch (userInfoError) {
            console.log(userInfoError.message);
            setErrorCart(true);
            Cookie.remove('jwt');
            Cookie.remove('log');
            Cookie.remove('name');
        }
    };


    return (
        <>

            {/* Loading Page*/}

            {loading && (
                <Loading errorState={errorCart} loading={setLoading} setModal={handleDisactiveModal}/>
            )}

            {/* Modal de Payement */}

            {activeModal && (
                <div
                    // onClick={() => handleDisactiveModal()}
                    className={`absolute top-0 z-20 h-screen w-screen bg-black bg-opacity-85 flex items-center `}
                >
                    <div className={`bg-white mx-auto rounded-lg w-5/6 md:w-2/4 relative p-2 md:p-4  ${classe.modal} ${showContent && classe.showModal} transition-all`}>
                        <span
                            onClick={() => handleDisactiveModal()}
                            className='absolute right-4 top-0 md:top-1 text-2xl font-extrabold cursor-pointer p-1 hover:scale-[1.2] transition-all'
                        >
                            &times;
                        </span>
                        <div className='font-bold flex items-center py-1 mb-2 border-b-2 border-black'>
                            <HandCoinsIcon className='mx-2' />
                            Payement
                        </div>

                        <div>
                            <div className=''>
                                <div className='flex mb-3'>
                                    <div className='w-10 text-center'>
                                        <UserRound />
                                    </div>
                                    <div>
                                        {infoUser.name}
                                    </div>
                                </div>
                                <div className='flex mb-3'>
                                    <div className='w-10 text-center'>
                                        <AtSignIcon />
                                    </div>
                                    <div>
                                        {infoUser.email}
                                    </div>
                                </div>
                                <div className='flex mb-3'>
                                    <div className='w-10 text-center'>
                                        <MapPinIcon />
                                    </div>
                                    <div className='md:flex md:space-x-4 transition-all'>
                                        <div>
                                            {infoUser.adresse}
                                        </div>
                                        <div className=''>
                                            <button onClick={() => handleAdresseOptionsToggle()} className='underline text-indigo-600 w-max'>Changer l'adresse de Livraison ?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                adresseOption && (
                                    <div>
                                        <div className='flex mb-3 items-center'>
                                            <div className='w-10 text-center'>
                                                <MapPinIcon />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="adresse"
                                                    id="adresse"
                                                    className='p-1 my-2 border-black border-2 rounded-lg'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            {
                                otherPaid && (
                                    <div className='p-1 my-5'>
                                        <div className='flex text-center'>
                                            <div className={`w-full ${cardMode ? `bg-slate-300 text-black` : `bg-slate-700 text-white`}  cursor-pointer transition-all hover:bg-slate-500`} onClick={() => handleMethodPaid('mobile')}>
                                                <FontAwesomeIcon icon={faMobile} className='mx-2' />
                                                Mobile Money
                                            </div>
                                            <div className={`w-full ${cardMode ? `bg-slate-700 text-white` : `bg-slate-300 text-black`}  cursor-pointer transition-all hover:bg-slate-500`} onClick={() => handleMethodPaid('carte')}>
                                                <FontAwesomeIcon icon={faCreditCard} className='mx-2' />
                                                Carte
                                            </div>
                                        </div>
                                        <div className=''>
                                            {
                                                cardMode ? (
                                                    <div>
                                                        <input type="text" placeholder='N° carte' className='w-full my-1 py-1 px-2 border-b-2 border-black' />
                                                        <div className='grid grid-cols-2'>
                                                            <input type="text" placeholder='CCV' className='my-1 py-1 px-2 border-b-2 border-black ' />
                                                            <input type="text" placeholder='EXP' className='my-1 py-1 px-2 border-b-2 border-black ml-1' />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <input type="text" placeholder='N° Mobile Money' className='my-2 py-1 px-2 w-full border-b-2 border-black' />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                            <div className='mt-3 mr-5 text-right space-x-6'>
                                <button onClick={() => handleOtherPaid()} className='underline text-indigo-600 text-[10px] sm:text-base' >{otherPaid ? 'Payer avec le Solde' : 'Autre Methode de Payement ...'}</button>
                                <button onClick={() => validateCommande()} className='bg-gray-800 text-slate-100 py-1 px-3 rounded-lg m-1 hover:bg-gray-900 transition-all' >Payer</button>
                            </div>
                            <div className='m-0 text-right'>
                                Solde : <span className='font-bold'> {infoUser.solde} </span> $
                            </div>
                            <p className='m-0 text-[10px] font-bold'>**Le somme sera deduis automatiquement de votre solde</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Contenu Cart.jsx */}

            <div>
                <h1 className='my-[3%] text-2xl font-bold text-center'>PANIER</h1>
                <div className='py-3 rounded-lg md:mx-auto transition-all'>
                    <div className='sm:w-3/4 w-full mx-auto'>
                        <div className='flex justify-between items-center m-3'>
                            <div className=''>
                                Sous Total :
                                <span className='font-bold ml-2'>
                                    {calculateSubtotal()} $
                                </span>
                            </div>
                            <button className='bg-gray-800 text-white px-3 py-2 rounded-lg shadow-md'
                                onClick={() => passerCommande()}
                            >Passer la commande</button>
                        </div>
                        <div className='m-3'>
                            <ul className=''>
                                {items.map((item, index) => (
                                    <li className='flex justify-between my-2 rounded-md shadow-lg' key={index}>
                                        <div className='flex items-center'>
                                            <div className='w-20 border border-gray-800 rounded-md'>
                                                <img src={"http://localhost:8000/images/" + item.image} className='rounded-md' alt={item.designation} />
                                            </div>
                                            <div className='ml-3'>
                                                <div>
                                                    {item.designation}
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        name="qte"
                                                        id="qte"
                                                        className='rounded-lg text-black px-3 w-full'
                                                        value={item.quantity}
                                                        placeholder='Quantité'
                                                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                                    />
                                                </div>
                                                <div className='flex justify-between'>
                                                    <div className='mr-2'><u>P.U.</u> : {item.prix} $</div>
                                                    <div className='ml-2'><u>Somme</u> : {item.prix * item.quantity} $</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' w-10 flex items-center text-white'>
                                            <button onClick={() => removeFromCart(index)} className='bg-gray-800 rounded-r-md h-full w-full mx-auto'>
                                                <FontAwesomeIcon icon={faTrash} size='lg' />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;