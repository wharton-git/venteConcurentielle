import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import url from "./../../Api/http";
import { ChevronDown, Edit, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Security = ({ title, desc }) => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
    });
    const [editableSection, setEditableSection] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [openSection, setOpenSection] = useState(null);

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

    const handleSaveLogin = async () => {
        const jwt = Cookie.get('jwt');
        if (jwt) {
            try {
                const response = await url.post(`/userLogin/${userInfo.id}`, { login: userInfo.login }, {
                    headers: {
                        Authorization: 'bearer ' + jwt,
                    }
                });
                setEditableSection(null);
                console.log('Login updated successfully:', response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSavePassword = async () => {
        if (userInfo.password !== userInfo.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        const jwt = Cookie.get('jwt');
        if (jwt) {
            try {
                const response = await url.post(`/userPassword/${userInfo.id}`, { password: userInfo.password }, {
                    headers: {
                        Authorization: 'bearer ' + jwt,
                    }
                });
                setEditableSection(null);
                console.log('Password updated successfully:', response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        setEditableSection(null);
        getUserInfo(); // Reset to original data
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleSection = (section) => {
        if (openSection === section) {
            setOpenSection(null);
        } else {
            setOpenSection(section);
        }
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

            <div className='bg-gray-900 w-3/4 mx-auto rounded-lg py-4 shadow-lg'>

                {/* Edit Login Part */}
                <div>
                    <div className='flex justify-between cursor-pointer' onClick={() => toggleSection('login')}>
                        <div>Connexion</div>
                        <div className={`${openSection === 'login' ? 'rotate-180' : ''} transition-all`}><ChevronDown /></div>
                    </div>

                    <div className={`transition-all overflow-hidden ${openSection === 'login' ? 'max-h-96' : 'max-h-0'}`}>
                        <form className={`mx-4 text-base ${editableSection === 'login' && 'text-black'}`}>
                            <div>
                                <div className='text-white'>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        className='py-2 px-6 text-white font-bold w-full rounded-lg disabled:bg-gray-800 shadow-lg my-2'
                                        value={userInfo.email}
                                        disabled
                                        onChange={handleChange}
                                    />
                                    {editableSection === 'login' && (
                                        <div className='text-xs text-white'>
                                            ** E-mail modifiable uniquement dans la section
                                            <Link to="/info" className='ml-1 text-blue-500 underline cursor-pointer'>Information Personnel</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className='text-white'>
                                    <label htmlFor="login">Login</label>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="login"
                                        className='py-2 px-6 font-bold w-full rounded-lg disabled:bg-gray-800 shadow-lg my-2'
                                        value={userInfo.login}
                                        disabled={editableSection !== 'login'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Button save and cancel Login */}
                            {editableSection === 'login' && (
                                <div className='flex justify-between mt-4'>
                                    <button type="button" onClick={handleSaveLogin} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                                        Enregistrer
                                    </button>
                                    <button type="button" onClick={handleCancel} className='bg-red-500 text-white px-4 py-2 rounded-lg'>
                                        Annuler
                                    </button>
                                </div>
                            )}
                        </form>

                        <div className='m-2'>
                            {editableSection !== 'login' && (
                                <button
                                    onClick={() => setEditableSection('login')}
                                    className='flex px-3 py-2 bg-gray-700 rounded-lg space-x-2'
                                >
                                    <Edit />
                                    <span>Modifier</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Edit Password Part */}
                <div>
                    <div className='flex justify-between cursor-pointer' onClick={() => toggleSection('password')}>
                        <div>Mot de passe</div>
                        <div className={`${openSection === 'password' ? 'rotate-180' : ''} transition-all`}><ChevronDown /></div>
                    </div>

                    <div className={`transition-all overflow-hidden ${openSection === 'password' ? 'max-h-96' : 'max-h-0'}`}>
                        <form className={`mx-4 text-base ${editableSection === 'password' && 'text-black'}`}>
                            <div>
                                <div className='text-white flex items-center'>
                                    <label htmlFor="password">Nouveau mot de passe</label>
                                    <button type="button" onClick={toggleShowPassword} className='ml-2'>
                                        {showPassword ? <EyeOff className='text-white' /> : <Eye className='text-white' />}
                                    </button>
                                </div>
                                <div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className='py-2 px-6 font-bold w-full rounded-lg disabled:bg-gray-800 shadow-lg my-2'
                                        value={userInfo.password}
                                        disabled={editableSection !== 'password'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='text-white flex items-center'>
                                    <label htmlFor="confirmPassword">Confirmer mot de passe</label>
                                </div>
                                <div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className='py-2 px-6 font-bold w-full rounded-lg disabled:bg-gray-800 shadow-lg my-2'
                                        value={userInfo.confirmPassword}
                                        disabled={editableSection !== 'password'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Button save and cancel Password */}
                            {editableSection === 'password' && (
                                <div className='flex justify-between mt-4'>
                                    <button type="button" onClick={handleSavePassword} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                                        Enregistrer
                                    </button>
                                    <button type="button" onClick={handleCancel} className='bg-red-500 text-white px-4 py-2 rounded-lg'>
                                        Annuler
                                    </button>
                                </div>
                            )}
                        </form>

                        <div className='m-2'>
                            {editableSection !== 'password' && (
                                <button
                                    onClick={() => setEditableSection('password')}
                                    className='flex px-3 py-2 bg-gray-700 rounded-lg space-x-2'
                                >
                                    <Edit />
                                    <span>Modifier</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;
