import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faContactCard, faCreditCard, faICursor, faLocationPin, faMobile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

import classe from './../Style/Css/style.module.css'
import url from './../Api/http'

const Cart = ({ items, removeFromCart, updateQuantity }) => {

    const [infoUser, setInfoUser] = useState([])
    const [activeModal, setActiveModal] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [adresseOption, setAdresseOption] = useState(false)
    const [otherPaid, setOtherPaid] = useState(false)
    const [cardMode, setCardMode] = useState(false)

    const navigate = useNavigate()

    const calculateSubtotal = () => {
        const subtotal = items.reduce((total, item) => {

            return total + (item.prix * item.quantity);

        }, 0);

        return subtotal.toFixed(2);
    };

    const handleDisactiveModal = () => {
        setActiveModal(false);
        setAdresseOption(false);
        setOtherPaid(false);
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

    const validateCommande = () => {

        const id = infoUser.id;
        const date = new Date("yyyy-MM-dd HH:mm:ss");
        const prix = calculateSubtotal()

        console.log(id);
        console.log(date);
        console.log(prix);

        url.post('/commande', {
            user_id: id,
            date_commande: date,
            prix_commande: prix
        })
        .then (response => {
            console.log(response.data);
            console.log('Commande passer avec Succes');
        })
        .catch (err => {
            console.log(err);
        });
    }


    const passerCommande = () => {
        const verifyjwt = Cookie.get('jwt')

        if (verifyjwt) {
            const jwt = Cookie.get('jwt')

            url.post('/auth/me', {}, {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            })
                .then(userInfo => {
                    setInfoUser(userInfo.data);
                })

                .catch(userInfoError => {
                    console.log(userInfoError.message);
                    alert("Une Erreur S'est Produite, veuiller vous reconnecter !")
                    Cookie.remove('jwt')
                    Cookie.remove('log')
                    Cookies.remove('name')
                    navigate('/login');
                });

            setActiveModal(true);

            setTimeout(() => {
                setShowContent(true);
            }, 500)
        }
        else {
            navigate('/login');
        }
    }

    return (
        <>
        {/* Modal de Payement */}

            {activeModal && (
                <div
                    // onClick={() => handleDisactiveModal()}
                    className={`absolute top-0 z-20 h-screen w-screen bg-black bg-opacity-85 flex items-center`}
                >
                    <div className={`bg-white mx-auto rounded-lg w-5/6 md:w-2/4 transition-all p-2 md:p-4 ${classe.modal} ${showContent && classe.showModal}`}>
                        <span
                            onClick={() => handleDisactiveModal()}
                            className='absolute right-4 top-0 md:top-1 text-2xl font-extrabold cursor-pointer p-1 hover:scale-[1.2] transition-all'
                        >
                            &times;
                        </span>
                        <div className='font-bold py-1 mb-2 border-b-2 border-black'>
                            <FontAwesomeIcon icon={faCoins} className='mx-2' />
                            Payement
                        </div>

                        <div>
                            <div className=''>
                                <div className='flex mb-3'>
                                    <div className='w-10 text-center'>
                                        <FontAwesomeIcon icon={faICursor} />
                                    </div>
                                    <div>
                                        {infoUser.name}
                                    </div>
                                </div>
                                <div className='flex mb-3'>
                                    <div className='w-10 text-center'>
                                        <FontAwesomeIcon icon={faContactCard} />
                                    </div>
                                    <div>
                                        {infoUser.email}
                                    </div>
                                </div>
                                <div className='flex mb-3'>
                                    <div className='w-10 text-center'>
                                        <FontAwesomeIcon icon={faLocationPin} />
                                    </div>
                                    <div>
                                        {infoUser.adresse}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => handleAdresseOptionsToggle()} className='underline text-indigo-600'>Changer l'adresse de Livraison ?</button>
                            </div>
                            {adresseOption && (
                                <div>
                                    <div className='flex mb-3 items-center'>
                                        <div className='w-10 text-center'>
                                            <FontAwesomeIcon icon={faLocationPin} />
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

                            {otherPaid && (
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
                            <div className='mt-3'>
                                <button onClick={() => validateCommande()} className='bg-gray-800 text-slate-100 py-1 px-3 rounded-lg m-1 hover:bg-gray-900 transition-all' >Payer</button>
                                <button onClick={() => handleOtherPaid()} className='underline text-indigo-600' >{otherPaid ? 'Payer avec le Solde' : 'Autre Methode de Payement ...'}</button>
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