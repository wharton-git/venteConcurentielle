import React, { useEffect, useState } from 'react';
import iconVisa from "./../../assets/images/Visa Payment Card.svg";
import iconMasterCard from "./../../assets/images/icons8-mastercard.svg";
import { CreditCard, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

import Cookie from 'js-cookie';
import url from '../../Api/http';

const Payement = ({ title, desc }) => {
    const [cardIsOn, setCardIsOn] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [numero_mobile, set_numero_mobile] = useState({
        1: '',
        2: '',
    });
    const [cardType, setCardType] = useState('');
    const [divFocus, setDivFocus] = useState(false);
    const [icon, setIcon] = useState(<CreditCard />);
    const [expDate, setExpDate] = useState('');
    const [codeCVV, setCodeCVV] = useState('');
    const [editable, setEditable] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [num_alt_Exist, set_num_alt_Exist] = useState(false);

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        verifyNum2(userInfo);
    }, [userInfo]);

    const getUserInfo = async () => {
        const jwt = Cookie.get('jwt');
        if (jwt) {
            try {
                console.log("Récupération des informations de l'utilisateur...");

                const response = await url.post('/auth/me', {}, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                });
                const user = response.data;
                setUserInfo(user);
                setCardNumber(user.carte || '');
                set_numero_mobile({
                    1: user.numero_mobile || '',
                    2: user.numero_mobile_2 || ''
                });
                handleCardNumberChange({ target: { value: user.carte || '' } });
                console.log(response.data);

            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Impossible de récupérer les informations de l\'utilisateur.',
                });
            }
        }
    };

    const verifyNum2 = (info) => {
        set_num_alt_Exist(info.numero_mobile_2 != null);
    };

    const removeSpaces = (str) => {
        return str.replace(/\s+/g, '');
    };

    const formatCardNumber = (number) => {
        return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        setCardNumber(formatCardNumber(input));

        if (/^4/.test(input)) {
            setCardType('Visa');
            setIcon(<img src={iconVisa} alt="Visa" className='w-9' />);
        } else if (/^5[1-5]/.test(input)) {
            setCardType('MasterCard');
            setIcon(<img src={iconMasterCard} alt="MasterCard" className='w-9' />);
        } else {
            setCardType('');
            setIcon(<CreditCard />);
        }
    };

    const handleCodeCVVChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        if (input.length <= 3) {
            setCodeCVV(input);
        }
    };

    const handleExpdateChange = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 2) {
            input = input.substring(0, 2) + '/' + input.substring(2);
        }
        setExpDate(input);
    };

    const handleChangeNumero = (e, index) => {
        const value = e.target.value.replace(/\D/g, '');
        set_numero_mobile(prevState => ({
            ...prevState,
            [index]: value
        }));
    };

    const handleSave = async () => {
        const jwt = Cookie.get('jwt');

        if (numero_mobile[1] === '' && numero_mobile[2] !== '') {
            set_numero_mobile({
                1: numero_mobile[2],
                2: ''
            });
        }

        if (!num_alt_Exist) {
            numero_mobile[2] = null;
        } else if (!num_alt_Exist && numero_mobile[1] == "") {
            numero_mobile[1] = null;
            numero_mobile[2] = null;
        }

        const carteNum = removeSpaces(cardNumber);

        if (jwt) {
            try {
                let response;
                if (cardIsOn) {

                    if (expDate === null || expDate === undefined || expDate === "") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'Veuillez renseigner une date d\'expiration valide.',
                        });
                        return;
                    }

                    if (codeCVV === null || codeCVV === undefined || codeCVV === "") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'Veuillez renseigner un code CVV valide.',
                        });
                        return;
                    }

                    response = await url.post(`/userCard/${userInfo.id}`,
                        { carte: carteNum },
                        {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            }
                        });
                } else {
                    response = await url.post(`/userPhone/${userInfo.id}`,
                        {
                            numero_mobile: numero_mobile[1],
                            numero_mobile_2: numero_mobile[2]
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            }
                        });
                }

                setEditable(false);
                console.log('Mise à jour réussie:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Les informations de l\'utilisateur ont été mises à jour avec succès.',
                });

                setCodeCVV(null);
                setExpDate(null);

            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Impossible de mettre à jour les informations de l\'utilisateur.',
                });
            }
            getUserInfo();
        }
    };

    const handleDeleteNum = (index) => {
        if (index === 1 && numero_mobile[2]) {
            set_numero_mobile({
                1: numero_mobile[2],
                2: ''
            });
        } else {
            set_numero_mobile({
                ...numero_mobile,
                [index]: ''
            });
        }
    };

    const handleCancel = () => {
        setEditable(false);
        set_num_alt_Exist(false);
        getUserInfo();
        setCodeCVV(null);
        setExpDate(null);
    };

    return (
        <div>
            <div className='text-center'>
                <div className='uppercase text-2xl py-2 font-bold'>
                    {title}
                </div>
                <div className='hidden sm:block'>
                    {desc}
                </div>
            </div>

            <div className='bg-gray-900 rounded-md mx-5 overflow-clip'>
                <div>
                    <div className='text-center flex items-center justify-evenly'>
                        <div
                            className={`p-2 cursor-pointer bg-gray-700 w-full hover:bg-gray-500 ${cardIsOn && 'bg-gray-900'} transition-all`}
                            onClick={() => setCardIsOn(true)}
                        >
                            Carte
                        </div>
                        <div
                            className={`p-2 cursor-pointer bg-gray-700 w-full hover:bg-gray-500 ${!cardIsOn && 'bg-gray-900'} transition-all`}
                            onClick={() => setCardIsOn(false)}
                        >
                            Mobile Money
                        </div>
                    </div>
                </div>

                {cardIsOn ? (
                    <div>
                        <div className='text-center'>
                            <div className='uppercase text-2xl py-2 font-bold'>
                                Par Carte
                            </div>
                            <div className='hidden sm:block'>
                                {desc}
                            </div>
                        </div>
                        <div className='p-4'>
                            <div>
                                <label className='block text-white'>Numéro de la carte</label>
                                <div className={`flex items-center mt-2 bg-gray-800 space-x-2 overflow-clip ${divFocus && `mb-0 outline outline-1 rounded-md`}`}>
                                    <div className=''>
                                        <div className='border-r-2 px-3 border-gray-500'>
                                            {icon}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            type='text'
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            maxLength={19}
                                            className='py-2 px-6 font-bold w-full text-black disabled:bg-gray-800 disabled:text-white focus:outline-none'
                                            onFocus={() => setDivFocus(true)}
                                            onBlur={() => setDivFocus(false)}
                                            disabled={!editable}
                                        />
                                    </div>
                                </div>
                            </div>

                            {editable && (
                                <div>
                                    <div className='text-yellow-500 mt-4'>
                                        ** Nous n'enregistrerons pas les informations suivantes, ils servent juste à verifier votre Authenticité
                                    </div>
                                    <div className=''>
                                        <label className='block text-white'>Date d'expiration</label>
                                        <input
                                            type='text'
                                            placeholder='MM/AA'
                                            maxLength={5}
                                            onChange={handleExpdateChange}
                                            value={expDate}
                                            className='w-full p-2 mt-2 text-black disabled:bg-gray-800 disabled:text-white focus:outline focus:outline-1 focus:outline-white focus:rounded-md'
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <label className='block text-white'>Code de sécurité</label>
                                        <input
                                            type='text'
                                            placeholder='CVV'
                                            maxLength={3}
                                            onChange={handleCodeCVVChange}
                                            value={codeCVV}
                                            className='w-full p-2 mt-2 text-black disabled:bg-gray-800 disabled:text-white focus:outline focus:outline-1 focus:outline-white focus:rounded-md'
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='text-center'>
                            <div className='uppercase text-2xl py-2 font-bold'>
                                Mobile
                            </div>
                            <div className='hidden sm:block'>
                                {desc}
                            </div>
                        </div>
                        <div className='mx-8'>
                            <div className='flex items-center space-x-2'>
                                <div className='w-full'>
                                    <input
                                        type="text"
                                        name="numero_mobile"
                                        className='py-2 px-6 font-bold w-full rounded-lg disabled:bg-gray-800 disabled:text-white text-black my-2 '
                                        value={numero_mobile[1]}
                                        onChange={(e) => handleChangeNumero(e, 1)}
                                        disabled={!editable}
                                    />
                                </div>
                                {
                                    editable && (
                                        <div>
                                            <div onClick={() => handleDeleteNum(1)} className='bg-red-400 p-2 active:shadow-red-900 shadow-inner rounded-md transition-all'>
                                                <Trash2 />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {num_alt_Exist && (
                                <div className='flex items-center space-x-2'>
                                    <div className='w-full'>
                                        <input
                                            type="text"
                                            name="numero_mobile_2"
                                            className='py-2 px-6 font-bold w-full rounded-lg disabled:bg-gray-800 disabled:text-white text-black my-2 '
                                            value={numero_mobile[2]}
                                            onChange={(e) => handleChangeNumero(e, 2)}
                                            disabled={!editable}
                                        />
                                    </div>
                                    {
                                        editable && (
                                            <div>
                                                <div onClick={() => handleDeleteNum(2)} className='bg-red-400 p-2 active:shadow-red-900 shadow-inner rounded-md transition-all'>
                                                    <Trash2 />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                            {!editable && (
                                <div>
                                    <div>
                                        {!num_alt_Exist && (
                                            <button className='underline text-gray-400'
                                                onClick={() => {
                                                    set_num_alt_Exist(true);
                                                    setEditable(true)
                                                }}
                                            >
                                                Ajouter un autre numero
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {editable && (
                    <div className='flex justify-end space-x-2 p-4'>
                        <button type="button" onClick={handleCancel} className='bg-gray-800 active:scale-95 active:bg-gray-950 transition-all text-white px-4 py-2 rounded-lg'>
                            Annuler
                        </button>
                        <button type="button" onClick={handleSave} className='bg-gray-950 active:scale-95 active:bg-black transition-all text-white px-4 py-2 rounded-lg'>
                            Enregistrer
                        </button>
                    </div>
                )}

                {!editable && (
                    <div className='p-4'>
                        <button
                            onClick={() => setEditable(true)}
                            className='flex items-center active:scale-95 active:bg-gray-950 px-3 py-2 bg-gray-800 rounded-lg space-x-2'
                        >
                            <Edit />
                            <span>{userInfo.carte ? 'Modifier' : 'Ajouter'}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payement;
