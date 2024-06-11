import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import url from './../../Api/http';
import { Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

import Loading from './../Screen/Loading';

const Adresse = ({ title, desc }) => {
    const [userInfo, setUserInfo] = useState({
        adresse: '',
        adresse_alt: '',
    });
    const [editable, setEditable] = useState(false);
    const [adrAltExist, setAdrAltExist] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUserInfo();
        setLoading(true)
    }, []);

    useEffect(() => {
        verifyAdrAlt(userInfo);
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

                setTimeout(() => {
                    setLoading(false);
                }, 300);

                setUserInfo(response.data);
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

    const verifyAdrAlt = (info) => {
        setAdrAltExist(info.adresse_alt != null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const jwt = Cookie.get('jwt');

        var adresse = userInfo.adresse;
        var adresse_alt = userInfo.adresse_alt;

        if (!adrAltExist) {
            adresse_alt = null;
        } else if (!adrAltExist && adresse === "") {
            adresse = null;
            adresse_alt = null;
        }

        if (jwt) {
            try {
                const response = await url.post(`/userAdresse/${userInfo.id}`,
                    {
                        adresse: adresse,
                        adresse_alt: adresse_alt,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }
                    });
                setEditable(false);
                console.log('Mise à jour réussie:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Les informations de l\'utilisateur ont été mises à jour avec succès.',
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Impossible de mettre à jour les informations de l\'utilisateur.',
                });
            }
            getUserInfo()
            verifyAdrAlt(userInfo)
        }
    };

    const handleCancel = () => {
        setEditable(false);
        getUserInfo(); // Réinitialiser les données originales
    };

    const handleDeleteAdr = () => {
        setUserInfo(prevState => ({
            ...prevState,
            adresse: prevState.adresse_alt,
            adresse_alt: ''
        }));
    };

    const handleDeleteAdr_alt = () => {
        setUserInfo(prevState => ({
            ...prevState,
            adresse_alt: ''
        }));
    };

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

            <div className='bg-gray-900 w-3/4 my-4 mx-auto rounded-lg py-4 shadow-lg'>
                <form className={`mx-4 text-base ${editable && `text-black`}`}>
                    <div>
                        <div className='text-white'>
                            <label htmlFor="adresse">Adresse</label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <input
                                type="text"
                                name="adresse"
                                className='py-2 px-6 font-bold w-full shadow-gray-950 shadow-inner rounded-lg disabled:bg-gray-800 my-2'
                                value={userInfo.adresse}
                                disabled={!editable}
                                onChange={handleChange}
                                placeholder='Entre votre adresse'
                            />
                            {
                                editable && (
                                    <div>
                                        <div onClick={handleDeleteAdr} className='bg-red-400 p-2 active:shadow-red-900 shadow-inner rounded-md transition-all'>
                                            <Trash2 />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        adrAltExist && (
                            <div>
                                <div className='text-white'>
                                    <label htmlFor="adresse_alt">Adresse alternative</label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <input
                                        type="text"
                                        name="adresse_alt"
                                        className='py-2 px-6 font-bold w-full shadow-gray-950 shadow-inner rounded-lg disabled:bg-gray-800 my-2'
                                        value={userInfo.adresse_alt}
                                        disabled={!editable}
                                        onChange={handleChange}
                                        placeholder='Entre votre adresse alternative'
                                    />
                                    {
                                        editable && (
                                            <div>
                                                <div onClick={handleDeleteAdr_alt} className='bg-red-400 active:shadow-red-900 p-2 rounded-md transition-all'>
                                                    <Trash2 />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                    {editable && (
                        <div className='flex justify-end space-x-2 mt-4'>
                            <button type="button" onClick={handleCancel} className='bg-gray-800 active:scale-95 active:bg-gray-950 transition-all text-white px-4 py-2 rounded-lg'>
                                Annuler
                            </button>
                            <button type="button" onClick={handleSave} className='bg-gray-950 active:scale-95 active:bg-black transition-all text-white px-4 py-2 rounded-lg'>
                                Enregistrer
                            </button>
                        </div>
                    )}
                </form>

                <div className='m-2'>
                    {!editable && (
                        <div className='space-y-4 mx-2'>
                            {
                                !adrAltExist && (
                                    <div>
                                        <button
                                            onClick={() => {
                                                setUserInfo(prevState => ({
                                                    ...prevState,
                                                    adresse_alt: ''
                                                }));
                                                setAdrAltExist(true);
                                                setEditable(true);
                                            }}
                                            className='flex items-center active:scale-95 active:bg-gray-950 px-3 py-2 bg-gray-800 rounded-lg space-x-2'
                                        >
                                            <Edit />
                                            <span>Ajouter une autre adresse ?</span>
                                        </button>
                                    </div>
                                )
                            }
                            <div>
                                <button
                                    onClick={() => setEditable(true)}
                                    className='flex items-center active:scale-95 active:bg-gray-950 px-3 py-2 bg-gray-800 rounded-lg space-x-2'
                                >
                                    <Edit />
                                    <span>Modifier</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Adresse;
