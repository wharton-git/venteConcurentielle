import React, { useState } from 'react';
import iconVisa from "./../../assets/images/Visa Payment Card.svg"
import iconMasterCard from "./../../assets/images/icons8-mastercard.svg"
import { CreditCard } from 'lucide-react';

const Payement = ({ title, desc }) => {
    const [cardIsOn, setCardIsOn] = useState(true);
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');
    const [divFocus, setDivFocus] = useState(false);
    const [icon, setIcon] = useState(<CreditCard />);
    const [expDate, setExpDate] = useState('');
    const [codeCVV, setCodeCVV] = useState('');

    const formatCardNumber = (number) => {
        return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, ''); // Supprime tous les caractères non numériques
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
        const input = e.target.value.replace(/\D/g, ''); // Supprime tous les caractères non numériques
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
                        <div className=' p-4'>
                            <div>
                                <label className='block text-white'>Numéro de la carte</label>
                                <div className={`flex items-center mt-2 bg-gray-800 space-x-2 ${divFocus && `mb-0 outline outline-1 rounded-md`}`}>
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
                                            className='w-full p-2 bg-transparent text-white focus:outline-none'
                                            onFocus={() => setDivFocus(true)}
                                            onBlur={() => setDivFocus(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* {cardType && (
                                <div className='mt-2 text-white'>
                                    Type de carte: {cardType}
                                </div>
                            )} */}
                            <div className='mt-4'>
                                <label className='block text-white'>Date d'expiration</label>
                                <input
                                    type='text'
                                    placeholder='MM/AA'
                                    maxLength={5}
                                    onChange={handleExpdateChange}
                                    value={expDate}
                                    className='w-full p-2 mt-2 bg-gray-800 text-white focus:outline focus:outline-1 focus:outline-white focus:rounded-md'
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
                                    className='w-full p-2 mt-2 bg-gray-800 text-white focus:outline focus:outline-1 focus:outline-white focus:rounded-md'
                                />
                            </div>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payement;
