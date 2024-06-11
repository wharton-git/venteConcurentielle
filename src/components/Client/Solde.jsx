import React, { useEffect, useState } from 'react'
import url from './../../Api/http'
import Cookie from 'js-cookie'
import Swal from 'sweetalert2'
import { CircleArrowLeft, CircleDollarSign } from 'lucide-react'

import Loading from './../Screen/Loading';

const Solde = ({ title, desc }) => {

    const [solde, setSolde] = useState(0);
    const [addSolde, setAddSolde] = useState(0);
    const [subSolde, setSubSolde] = useState(0);
    const [userInfo, setUserInfo] = useState("")
    const [soldeSep, setSoldeSep] = useState({ entier: '', decimal: '' });
    const [isWithdraw, setIsWithdraw] = useState(false);
    const [depositSelected, setDepositSelected] = useState(null);
    const [withdrawSelected, setWithdrawSelected] = useState(null);
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState({
        card: "",
        mobile: "",
        mobile_alt: "",
    })

    useEffect(() => {
        getUserInfo()
        setLoading(true)
    }, [])

    useEffect(() => {
        isWithdraw ? setDepositSelected(null) : setWithdrawSelected(null)
    }, [isWithdraw])

    useEffect(() => {
        if (userInfo.solde !== undefined) {
            setSolde(userInfo.solde);
            setSoldeSep(separerNombreDecimal(userInfo.solde));
            setPaymentMethod({
                card: userInfo.carte,
                mobile: userInfo.numero_mobile,
                mobile_alt: userInfo.numero_mobile_2,
            })
        }
    }, [userInfo]);

    const separerNombreDecimal = (nombre) => {
        const [entier, decimal] = nombre.toString().split('.');
        return {
            entier: entier || '',
            decimal: decimal || ''
        };
    };

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

                setTimeout(() => {
                    setLoading(false);
                }, 300);

                setUserInfo(response.data);
                setSolde(response.data.solde);
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

    const selectDeposit = (index) => {
        setDepositSelected(index);
    }

    const selectWithdraw = (index) => {
        setWithdrawSelected(index);
    }

    const handleChangeAddSolde = (e) => {
        setAddSolde(e.target.value);
    }

    const handleChangeSubSolde = (e) => {
        setSubSolde(e.target.value);
    }

    const deposit = async () => {
        if (depositSelected === null) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veuillez sélectionner un mode de paiement.',
            });
            return;
        }

        try {

            const soldePlus = await url.post(`/addSolde/${userInfo.id}`, { addSolde: addSolde })
            console.log(soldePlus.data.solde);
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Solde mis à jour.',
            });

            await getUserInfo()

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Impossible de mettre à jour les informations de l\'utilisateur.',
            });
        }

    }

    const withdraw = async () => {
        if (withdrawSelected === null) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veuillez sélectionner un mode de paiement.',
            });
            return;
        }

        try {

            const soldeMoins = await url.post(`/subSolde/${userInfo.id}`, { subSolde: subSolde })
            console.log(soldeMoins.data.solde);
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Solde mis à jour.',
            });

            await getUserInfo()

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Impossible de mettre à jour les informations de l\'utilisateur.',
            });
        }

    }

    return (
        <div>

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
            </div>

            <div className='rounded-md mx-5 my-4 overflow-clip bg-gray-900'>
                <div className='text-center py-6'>
                    <div className='relative'>
                        <span className='text-6xl'>
                            {soldeSep.entier}
                        </span>
                        <span className='text-2xl absolute top-0 mx-2'>
                            {soldeSep.decimal}
                        </span>
                        <span className='ml-10 text-3xl'>
                            $
                        </span>
                    </div>
                </div>
                <div className='bg-gray-800 p-2'>
                    <div className='w-full flex justify-evenly'>
                        <div
                            onClick={() => setIsWithdraw(false)}
                            className={`w-full text-center p-2 active:bg-gray-600 cursor-pointer ${!isWithdraw && 'border-b-2'} transition-all`}
                        >
                            Deposer
                        </div>
                        <div
                            onClick={() => setIsWithdraw(true)}
                            className={`w-full text-center p-2 active:bg-gray-600 cursor-pointer ${isWithdraw && 'border-b-2'} transition-all`}
                        >
                            Retirer
                        </div>
                    </div>
                    <div>
                        {!isWithdraw ? (
                            <div>
                                <div className='w-3/5 mx-auto'>
                                    <div>Entrer le montant à deposer : ( en $ )</div>
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        className='py-2 px-6 font-bold w-full shadow-gray-700 text-black shadow-inner rounded-lg disabled:bg-gray-800 my-2'
                                        placeholder='Entre la Somme à déposer'
                                        value={addSolde}
                                        onChange={handleChangeAddSolde}
                                    />
                                </div>
                                <div>
                                    <div className='text-xs text-yellow-300 text-center'>
                                        ** La liste de vos methodes de payement s'affiche ici. <br />
                                        Veuillez en selectionner une pour le <u>dépôt</u>.
                                    </div>
                                    <div className='mx-auto px-5'>
                                        <div>
                                            <div>Carte de Crédit / Débit</div>
                                            {
                                                paymentMethod.card && (
                                                    <div className='flex h-7 rounded-lg overflow-clip w-full'>
                                                        <div className={`h-full w-3 ${depositSelected === 1 ? `bg-gray-500` : `bg-gray-900`}`}>
                                                        </div>
                                                        <div
                                                            className={`py-1 px-3 bg-gray-900 w-full`}
                                                            onClick={() => selectDeposit(1)}
                                                        >
                                                            {paymentMethod.card}
                                                        </div>
                                                    </div>)
                                            }
                                        </div>
                                        <div>
                                            <div>Mobile Money</div>
                                            {
                                                paymentMethod.mobile && (
                                                    <div className='flex h-7 rounded-lg overflow-clip w-full'>
                                                        <div className={`h-full w-3 ${depositSelected === 2 ? `bg-gray-500` : `bg-gray-900`}`}>
                                                        </div>
                                                        <div
                                                            className={`py-1 px-3 bg-gray-900 w-full`}
                                                            onClick={() => selectDeposit(2)}
                                                        >
                                                            {paymentMethod.mobile}
                                                        </div>
                                                    </div>)
                                            }
                                            {
                                                paymentMethod.mobile_alt && (
                                                    <div className='flex h-7 rounded-lg overflow-clip w-full'>
                                                        <div className={`h-full w-3 ${depositSelected === 3 ? `bg-gray-500` : `bg-gray-900`}`}>
                                                        </div>
                                                        <div
                                                            className={`py-1 px-3 bg-gray-900 w-full `}
                                                            onClick={() => selectDeposit(3)}
                                                        >
                                                            {paymentMethod.mobile_alt}
                                                        </div>
                                                    </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='flex items-center active:scale-95 active:bg-gray-950 px-3 py-2 m-4 bg-gray-900 rounded-lg space-x-2'
                                        onClick={() => deposit()}
                                    >
                                        <div>
                                            <CircleDollarSign />
                                        </div>
                                        <div>
                                            Déposer
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className='w-3/5 mx-auto'>
                                    <div>Entrer le montant à retirer : ( en $ )</div>
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        className='py-2 px-6 font-bold w-full shadow-gray-700 text-black shadow-inner rounded-lg disabled:bg-gray-800 my-2'
                                        placeholder='Entre la Somme à retirer'
                                        value={subSolde}
                                        onChange={handleChangeSubSolde}
                                    />
                                </div>
                                <div>
                                    <div className='text-xs text-yellow-300 text-center'>
                                        ** La liste de vos methodes de payement s'affiche ici. <br />
                                        Veuillez en selectionner une pour le <u>Retrait</u>.
                                    </div>
                                    <div className='mx-auto px-5'>
                                        <div>
                                            <div>Carte de Crédit / Débit</div>
                                            {
                                                paymentMethod.card && (
                                                    <div className='flex h-7 rounded-lg overflow-clip w-full'>
                                                        <div className={`h-full w-3 ${withdrawSelected === 1 ? `bg-gray-500` : `bg-gray-900`}`}>
                                                        </div>
                                                        <div
                                                            className={`py-1 px-3 bg-gray-900 w-full`}
                                                            onClick={() => selectWithdraw(1)}
                                                        >
                                                            {paymentMethod.card}
                                                        </div>
                                                    </div>)
                                            }
                                        </div>
                                        <div>
                                            <div>Mobile Money</div>
                                            {
                                                paymentMethod.mobile && (
                                                    <div className='flex h-7 rounded-lg overflow-clip w-full'>
                                                        <div className={`h-full w-3 ${withdrawSelected === 2 ? `bg-gray-500` : `bg-gray-900`}`}>
                                                        </div>
                                                        <div
                                                            className={`py-1 px-3 bg-gray-900 w-full`}
                                                            onClick={() => selectWithdraw(2)}
                                                        >
                                                            {paymentMethod.mobile}
                                                        </div>
                                                    </div>)
                                            }
                                            {
                                                paymentMethod.mobile_alt && (
                                                    <div className='flex h-7 rounded-lg overflow-clip w-full'>
                                                        <div className={`h-full w-3 ${withdrawSelected === 3 ? `bg-gray-500` : `bg-gray-900`}`}>
                                                        </div>
                                                        <div
                                                            className={`py-1 px-3 bg-gray-900 w-full `}
                                                            onClick={() => selectWithdraw(3)}
                                                        >
                                                            {paymentMethod.mobile_alt}
                                                        </div>
                                                    </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='flex items-center active:scale-95 active:bg-gray-950 px-3 py-2 m-4 bg-gray-900 rounded-lg space-x-2'
                                        onClick={() => withdraw()}
                                    >
                                        <div>
                                            <CircleArrowLeft />
                                        </div>
                                        <div>
                                            Retirer
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Solde
