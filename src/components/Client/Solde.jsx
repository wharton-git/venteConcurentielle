import React, { useEffect, useState } from 'react'
import url from './../../Api/http'
import Cookie from 'js-cookie'
import Swal from 'sweetalert2'

const Solde = ({ title, desc }) => {

    const [solde, setSolde] = useState(0);
    const [addSolde, setAddSolde] = useState(0);
    const [subSolde, setSubSolde] = useState(0);
    const [userInfo, setUserInfo] = useState("")
    const [soldeSep, setSoldeSep] = useState({ entier: '', decimal: '' });
    const [isWithdraw, setIsWithdraw] = useState(true);
    const [depositSelected, setDepositSelected] = useState(null);
    const [withdrawSelected, setWithdrawSelected] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState({
        card: "",
        mobile: "",
        mobile_alt: "",
    })

    useEffect(() => {
        getUserInfo()
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
            <div className='text-center'>
                <div className='uppercase text-2xl py-2 font-bold'>
                    {title}
                </div>
                <div className='hidden sm:block'>
                    {desc}
                </div>
            </div>
            <div className='rounded-md bg-gray-800'>
                <div className='text-center py-12'>
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
                <div className='w-full flex justify-evenly'>
                    <div
                        onClick={() => setIsWithdraw(false)}
                        className={`w-full text-center p-2 active:bg-gray-600 cursor-pointer ${!isWithdraw ? 'bg-gray-800' : 'bg-gray-700'}`}
                    >
                        Deposer
                    </div>
                    <div
                        onClick={() => setIsWithdraw(true)}
                        className={`w-full text-center p-2 active:bg-gray-600 cursor-pointer ${isWithdraw ? 'bg-gray-800' : 'bg-gray-700'}`}
                    >
                        Retirer
                    </div>
                </div>
                <div>
                    {!isWithdraw ? (
                        <div>
                            <div>
                                <input
                                    type="text"
                                    name="amount"
                                    id="amount"
                                    className='text-black'
                                    placeholder='Entre la Somme à déposer'
                                    value={addSolde}
                                    onChange={handleChangeAddSolde}
                                />
                            </div>
                            <div>
                                <div>
                                    ** La liste de vos methodes de payement s'affiche ici. <br />
                                    Veuillez en selectionner une pour le dépôt.
                                </div>
                                <div>
                                    <div>
                                        <div>Carte de Crédit / Débit</div>
                                        {
                                            paymentMethod.card && (
                                                <div
                                                    className={`bg-blue-500 px-4 py-2 rounded-md mx-3 my-1 ${depositSelected === 1 && `bg-red-500`}`}
                                                    onClick={() => selectDeposit(1)}>
                                                    {paymentMethod.card}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <div>Mobile Money</div>
                                        {
                                            paymentMethod.mobile && (
                                                <div
                                                    className={`bg-blue-500 px-4 py-2 rounded-md mx-3 my-1 ${depositSelected === 2 && `bg-red-500`}`}
                                                    onClick={() => selectDeposit(2)}>
                                                    {paymentMethod.mobile}
                                                </div>
                                            )
                                        }
                                        {
                                            paymentMethod.mobile_alt && (
                                                <div
                                                    className={`bg-blue-500 px-4 py-2 rounded-md mx-3 my-1 ${depositSelected === 3 && `bg-red-500`}`}
                                                    onClick={() => selectDeposit(3)}
                                                >
                                                    {paymentMethod.mobile_alt}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className=''
                                    onClick={() => deposit()}
                                >
                                    Déposer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <input
                                    type="text"
                                    name="amount"
                                    id="amount"
                                    className='text-black'
                                    placeholder='Entre la Somme à déposer'
                                    value={subSolde}
                                    onChange={handleChangeSubSolde}
                                />
                            </div>
                            <div>
                                <div>
                                    ** La liste de vos methodes de payement s'affiche ici. <br />
                                    Veuillez en selectionner une pour le Retrait.
                                </div>
                                <div>
                                    <div>
                                        <div>Carte de Crédit / Débit</div>
                                        {
                                            paymentMethod.card && (
                                                <div
                                                    className={`bg-blue-500 px-4 py-2 rounded-md mx-3 my-1 ${withdrawSelected === 1 && `bg-red-500`}`}
                                                    onClick={() => selectWithdraw(1)}>
                                                    {paymentMethod.card}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <div>Mobile Money</div>
                                        {
                                            paymentMethod.mobile && (
                                                <div
                                                    className={`bg-blue-500 px-4 py-2 rounded-md mx-3 my-1 ${withdrawSelected === 2 && `bg-red-500`}`}
                                                    onClick={() => selectWithdraw(2)}>
                                                    {paymentMethod.mobile}
                                                </div>
                                            )
                                        }
                                        {
                                            paymentMethod.mobile_alt && (
                                                <div
                                                    className={`bg-blue-500 px-4 py-2 rounded-md mx-3 my-1 ${withdrawSelected === 3 && `bg-red-500`}`}
                                                    onClick={() => selectWithdraw(3)}
                                                >
                                                    {paymentMethod.mobile_alt}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className=''
                                    onClick={() => withdraw()}
                                >
                                    Retirer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Solde