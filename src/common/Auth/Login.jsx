import React, { useState } from 'react';
import url from './../../Api/http'
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'


const Login = ({ setIsUserLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    const handleLogin = () => {
        url.post('/auth/login', {
            email: email,
            password: password
        })
            .then(authResponse => {
                const jwt = authResponse.data.access_token;
                Cookie.set('jwt', jwt);
                setIsUserLoggedIn(true);
                Cookie.set('log', true);

                url.post('/auth/me', {}, {
                    headers: {
                        Authorization: 'Bearer ' + jwt,
                    }
                })
                    .then(userInfo => {
                        console.log(userInfo.data);
                    })
                    .catch(userInfoError => {
                        console.log(userInfoError.message);
                    });

                navigate('/');
            })
            .catch(authError => {
                console.log(authError);
                setError('Identifiants incorrects. Veuillez réessayer.');
            });
    }


    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion à votre compte</h2>
                    {error && <p className="mt-2 text-center text-red-600">{error}</p>}
                </div>
                <form className="mt-8 space-y-6" onSubmit={e => e.preventDefault()}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Adresse email</label>
                            <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Adresse email" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Connexion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
