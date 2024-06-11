import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import url from './../../Api/http';
import { Edit } from 'lucide-react';
import Swal from 'sweetalert2'; // SweetAlert importé

const Info = ({ title, desc }) => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        numero_mobile: '',
    });
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        const jwt = Cookie.get('jwt');
        if (jwt) {
            try {
                console.log("Getting user info ...");

                const info = await url.post('/auth/me', {}, {
                    headers: {
                        Authorization: 'bearer ' + jwt,
                    }
                });
                setUserInfo(info.data);
                console.log(info.data);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleSave = async () => {
        const jwt = Cookie.get('jwt');
        if (jwt) {
            try {
                const response = await url.post(`/user/${userInfo.id}`, userInfo, {
                    headers: {
                        Authorization: 'bearer ' + jwt,
                    }
                });
                setEditable(false);
                console.log('User updated successfully:', response.data);
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
        }
    };

    const handleCancel = () => {
        setEditable(false);
        getUserInfo(); // Reset to original data
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

            <div className='bg-gray-900 w-3/4 mx-auto my-4 rounded-lg py-4 shadow-lg'>
                <form className={`mx-4 text-base ${editable && `text-black`}`}>
                    <div>
                        <div className='text-white'>
                            <label htmlFor="name">Nom</label>
                        </div>
                        <div className=''>
                            <input
                                type="text"
                                name="name"
                                className='py-2 px-6 font-bold w-full shadow-gray-950 shadow-inner rounded-lg disabled:bg-gray-800 my-2'
                                value={userInfo.name}
                                disabled={!editable}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='text-white'>
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className=''>
                            <input
                                type="email"
                                name="email"
                                className='py-2 px-6 font-bold w-full shadow-gray-950 shadow-inner rounded-lg disabled:bg-gray-800 my-2'
                                value={userInfo.email}
                                disabled={!editable}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='text-white'>
                            <label htmlFor="numero_mobile">Numéro Mobile</label>
                        </div>
                        <div className=''>
                            <input
                                type="text"
                                name="numero_mobile"
                                className='py-2 px-6 font-bold w-full shadow-gray-950 shadow-inner rounded-lg disabled:bg-gray-800 my-2'
                                value={userInfo.numero_mobile}
                                disabled={!editable}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Button save and cancel */}
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

                <div className='m-4'>
                    {!editable && (
                        <button
                            onClick={() => setEditable(true)}
                            className='flex items-center active:scale-95 active:bg-gray-950 px-3 py-2 bg-gray-800 rounded-lg space-x-2'
                        >
                            <Edit />
                            <span>Modifier</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Info;
