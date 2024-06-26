import React, { useState } from 'react';
import url from './../../Api/http'
import { useNavigate, Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import { HomeIcon } from 'lucide-react';
import Swal from 'sweetalert2';


const Login = ({ setIsUserLoggedIn }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleLogin = () => {
        url.post('/auth/login', {
            login: login,
            password: password
        })
            .then(authResponse => {
                const jwt = authResponse.data.access_token;
                Cookie.set('jwt', jwt, { expires: 60 });
                setIsUserLoggedIn(true);
                Cookie.set('log', true, { expires: 60 });

                url.post('/auth/me', {}, {
                    headers: {
                        Authorization: 'Bearer ' + jwt,
                    }
                })
                    .then(userInfo => {
                        console.log(userInfo.data);
                        Cookie.set('name', userInfo.data.name, { expires: 60 });
                    })

                    .catch(userInfoError => {
                        console.log(userInfoError.message);
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Connecté avec succès"
                    });
                navigate('/');
            })
            .catch(authError => {
                console.log(authError);
                if (authError.response && authError.response.status === 500) {
                    Swal.fire({
                        title: 'Erreur côté Serveur !',
                        text: 'Veuillez réessayer plus tard.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                } else {
                    Swal.fire({
                        title: 'Erreur !',
                        text: 'Identifiants incorrects. Veuillez réessayer.',
                        icon: 'error',
                        confirmButtonText: 'Réessayer'
                    })
                }
            });
    }


    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion à votre compte</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={e => e.preventDefault()}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Adresse email</label>
                            <input id="login" name="login" type="text" autoComplete="text" required value={login} onChange={e => setLogin(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Adresse email" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe" />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center'>
                            <Link to='/' className="py-2 mr-2 px-4 rounded-md shadow-md text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-600 transition-all">
                                <HomeIcon size={20} />
                            </Link>
                            <button type="submit" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-md bg-indigo-600 hover:bg-indigo-700">
                                Connexion
                            </button>
                        </div>
                        <div className='my-2 text-center'>
                            Pas de Compte ? <Link to='/register' className='text-indigo-600 hover:text-indigo-800 drop-shadow-sm'>Créer un compte</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
