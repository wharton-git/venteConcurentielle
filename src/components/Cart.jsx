import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMobile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AtSignIcon, HandCoinsIcon, MapPinIcon, Minus, Plus, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';

import classe from './../Style/Css/style.module.css'
import url from './../Api/http'
import baseUrl from './../Api/baseUrl'

import Loading from './Screen/Loading';

const Cart = ({ setItems, items, removeFromCart, updateQuantity }) => {

    const [infoUser, setInfoUser] = useState([]);
    const [activeModal, setActiveModal] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [adresseOption, setAdresseOption] = useState(false);
    const [otherPaid, setOtherPaid] = useState(false);
    const [cardMode, setCardMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorCart, setErrorCart] = useState(false);

    useEffect(() => {
        setErrorCart(false)
    }, []);

    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const calculateSubtotal = () => {
        const subtotal = items.reduce((total, item) => {
            return total + (item.prix * item.quantity);
        }, 0);
        return subtotal.toFixed(2);
    };

    const deleteCartItem = (selectedItem) => {
        removeFromCart(selectedItem)
        Toast.fire({
            icon: "success",
            title: "Supprimé"
        });
    };

    const handleDisactiveModal = () => {
        setTimeout(() => {
            setActiveModal(false);
            setAdresseOption(false);
            setOtherPaid(false);
        }, 200)
        setShowContent(false);
    };

    const handleAdresseOptionsToggle = () => {
        setAdresseOption(!adresseOption);
    };

    const handleOtherPaid = () => {
        setOtherPaid(!otherPaid);
    };

    const handleMethodPaid = (method) => {
        if (method === 'mobile') {
            setCardMode(false);
        }
        else {
            setCardMode(true);
        }
    };

    const verifySolde = () => {
        const solde = infoUser.solde;
        const subtotal = calculateSubtotal();

        return solde >= subtotal;
    };

    const validateCommande = async () => {
        try {
            const id = infoUser.id;
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const prix = calculateSubtotal();

            if (otherPaid) {
                await sendCommandeRequests(id, date, prix);
            } else {
                const isSoldeEnough = verifySolde();
                if (isSoldeEnough) {
                    await sendCommandeRequests(id, date, prix);
                } else {
                    Swal.fire({
                        title: 'Solde insuffisant',
                        text: 'Oops! votre solde est insuffisant.',
                        icon: 'warning',
                        showDenyButton: true,
                        showCancelButton: true,
                        cancelButtonColor: "#197319",
                        cancelButtonText: 'Recharger',
                        confirmButtonText: "OK",
                        denyButtonText: `Autre Methode`
                    }).then((result) => {
                        if (result.isDismissed) {
                            navigate("/user")
                        } else if (result.isDenied) {
                            setOtherPaid(true)
                        }
                    });
                }
            }
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    const openPaymentModal = () => {
        if (items.length === 0) {
            Swal.fire({
                title: 'Panier Vide',
                text: 'Veuillez ajouter au moins un produit dans le panier.',
                icon: 'info',
            });

        } else {
            paymentModal();
        }
    };

    const sendCommandeRequests = async (id, date, prix) => {
        try {
            if (!otherPaid) {
                await url.post(`/subSolde/${id}`, { subSolde: prix });
            }

            try {
                const response = await url.post('/commande', {
                    user_id: id,
                    date_commande: date,
                    prix_commande: prix
                });

                const commandeId = response.data.id;

                const detailsCommande = items.map(item => ({
                    id_com: commandeId,
                    article: item.designation,
                    qte: item.quantity,
                    prix_article: item.prix * item.quantity,
                }));

                const response2 = await url.post('/detailCommande', detailsCommande);

                console.log(response2.data);
                console.log('Commande passée avec succès');

                localStorage.clear();
                setItems([]);

                Swal.fire({
                    title: 'Achat Effectué!',
                    text: 'Commande passée avec succès',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                });
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Erreur de validation du commande',
                    icon: 'error',
                });
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Erreur',
                text: 'Une Erreur est survenue, veuillez réessayer !',
                icon: 'error',
            });
        }
    };

    const paymentModal = async () => {
        for (const item of items) {
            if (item.quantity > item.stock) {
                Swal.fire({
                    title: "Stock insuffisant",
                    text: `La quantité de ${item.designation} dépasse le stock disponible.`,
                    icon: 'warning',
                });
                return;
            }
        }

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
                setShowContent(true);
            }, 500);

        } catch (userInfoError) {
            console.log(userInfoError.message);
            setErrorCart(true);
            Cookie.remove('jwt');
            Cookie.remove('log');
            Cookie.remove('name');
        }
    };

    const handleQuantityChange = (index, value) => {
        if (value >= 1) {
            updateQuantity(index, value);
        }
    };

    return (
        <>
            {loading && (
                <div className='absolute top-0 left-0 h-screen w-screen'>
                    <Loading />
                </div>
            )}

            {activeModal && (
                <div
                    className={`absolute top-0 z-20 h-screen w-screen bg-black bg-opacity-85 flex items-center`}
                >
                    <div className={`bg-white mx-auto rounded-lg w-5/6 md:w-2/4 relative p-2 md:p-4 ${classe.modal} ${showContent && classe.showModal} transition-all`}>
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

                            {adresseOption && (
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

                            {otherPaid && (
                                <div className='p-1 my-5'>
                                    <div className='flex text-center'>
                                        <div className={`w-full ${cardMode ? `bg-slate-300 text-black` : `bg-slate-700 text-white`} cursor-pointer transition-all hover:bg-slate-500`} onClick={() => handleMethodPaid('mobile')}>
                                            <FontAwesomeIcon icon={faMobile} className='mx-2' />
                                            Mobile Money
                                        </div>
                                        <div className={`w-full ${cardMode ? `bg-slate-700 text-white` : `bg-slate-300 text-black`} cursor-pointer transition-all hover:bg-slate-500`} onClick={() => handleMethodPaid('carte')}>
                                            <FontAwesomeIcon icon={faCreditCard} className='mx-2' />
                                            Carte
                                        </div>
                                    </div>
                                    <div className=''>
                                        {cardMode ? (
                                            <div>
                                                <input type="text" placeholder='N° carte' className='w-full my-1 py-1 px-2 border-b-2 border-black' />
                                                <div className='grid grid-cols-2'>
                                                    <input type="text" placeholder='CVV' className='my-1 py-1 px-2 border-b-2 border-black ' />
                                                    <input type="text" placeholder='EXP' className='my-1 py-1 px-2 border-b-2 border-black ml-1' />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <input type="text" placeholder='N° Mobile Money' className='my-2 py-1 px-2 w-full border-b-2 border-black' />
                                            </div>
                                        )}
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

            <div>
                <h1 className='my-[3%] text-2xl font-bold text-center'>PANIER</h1>
                <div className='py-3 rounded-lg md:mx-auto transition-all'>
                    <div className='sm:w-3/4 w-full mx-auto'>
                        <div className='flex justify-between items-center m-3 '>
                            <div className=''>
                                Sous Total :
                                <span className='font-bold ml-2'>
                                    {calculateSubtotal()} $
                                </span>
                            </div>
                            <button className='bg-gray-800 text-white px-3 py-2 rounded-lg shadow-md'
                                onClick={() => openPaymentModal()}
                            >Passer la commande</button>
                        </div>
                        {items.length !== 0 ? (
                            <div className='m-3'>
                                <ul className=''>
                                    {items.map((item, index) => (
                                        <li className='flex justify-between my-2 rounded-md shadow-lg' key={index}>
                                            <div className='flex items-center'>
                                                <div className='w-20 border border-gray-800 rounded-md'>
                                                    <img src={`${baseUrl}images/` + item.image} className='rounded-md' alt={item.designation} />
                                                </div>
                                                <div className='ml-3'>
                                                    <div>
                                                        {item.designation}
                                                    </div>
                                                    <div className='flex items-center border-2 border-black w-max rounded-md'>
                                                        <button 
                                                            className='px-1' 
                                                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                                        >
                                                            <Minus/>
                                                        </button>
                                                        <input
                                                            type="text"
                                                            name="qte"
                                                            id="qte"
                                                            className='w-10 h-8 text-black border-x-2 bg-white text-center focus:outline-none'
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                        />
                                                        <button 
                                                            className='px-1' 
                                                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                                        >
                                                            <Plus/>
                                                        </button>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <div className='mr-2'><u>P.U.</u> : {item.prix} $</div>
                                                        <div className='ml-2'><u>Somme</u> : {item.prix * item.quantity} $</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-10 flex items-center text-white'>
                                                <button onClick={() => deleteCartItem(index)} className='bg-gray-800 rounded-r-md h-full w-full mx-auto'>
                                                    <FontAwesomeIcon icon={faTrash} size='lg' />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className='h-[50vh] text-5xl text-gray-200 flex items-center w-full justify-center'>
                                Panier Vide
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
