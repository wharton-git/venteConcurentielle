import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
                    // console.log(userInfo.data);
                    setInfoUser(userInfo.data);
                })
                .catch(userInfoError => {
                    console.log(userInfoError.message);
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
            {activeModal && (
                <div
                    // onClick={() => handleDisactiveModal()}
                    className={`absolute top-0 z-20 h-screen w-screen bg-black opacity-85 flex items-center`}
                >
                    <div className={`relative bg-white mx-auto rounded-lg w-3/4 md:w-2/4 transition-all p-2 md:p-4 ${classe.modal} ${showContent && classe.showModal}`}>
                        <span
                            onClick={() => handleDisactiveModal()}
                            className='absolute right-4 top-0 md:top-1 text-2xl font-extrabold cursor-pointer p-1 hover:scale-[1.2] transition-all'
                        >
                            &times;
                        </span>
                        <div className='font-bold py-1 mb-2 border-b-2 border-black'>
                            Payement
                        </div>
                        <div>
                            <ul>
                                <li>{infoUser.name}</li>
                                <li>{infoUser.email}</li>
                                <li>{infoUser.adresse}</li>
                                <div>
                                    <button onClick={() => handleAdresseOptionsToggle()} >Changer Adresse de Livraison ?</button>
                                </div>
                                {adresseOption && (
                                    <input
                                        type="text"
                                        name="adresse"
                                        id="adresse"
                                        className='p-1 border-black border-2 rounded-lg'
                                    />
                                )}
                                <div>
                                    <button onClick={() => handleOtherPaid()} >Payer par Carte ou Mobile Money ?</button>
                                </div>
                                {otherPaid && (
                                    <div>
                                        <div className='flex text-center'>
                                            <div className={`w-full ${cardMode ? `bg-slate-400` : `bg-slate-600`} text-white cursor-pointer transition-all hover:bg-slate-600`} onClick={() => handleMethodPaid('mobile')}>Mobile Money</div>
                                            <div className={`w-full ${cardMode ? `bg-slate-600` : `bg-slate-400`} text-white cursor-pointer transition-all hover:bg-slate-600`} onClick={() => handleMethodPaid('carte')}>Carte</div>
                                        </div>
                                        <div>
                                            <h3>Le somme sera deduis automatiquement de votre solde</h3>
                                            {
                                                cardMode ? (
                                                    <div>
                                                        <input type="text" placeholder='N° carte' />
                                                        <input type="text" placeholder='CCV' />
                                                        <input type="text" placeholder='EXP' />
                                                    </div>
                                                ) : (

                                                    <div>
                                                        <input type="text" placeholder='N° Mobile Money' />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                                <li>{infoUser.solde}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
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
