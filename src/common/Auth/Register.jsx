import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookie from 'js-cookie'

import url from './../../Api/http'

const Register = ({ setIsUserLoggedIn }) => {
    const [otherPage, setOtherPage] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        adresse: '',
        numero_mobile: '',
        carte: '',
        password: ''
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (mail, pass) => {
        url.post('/auth/login', {
            email: mail,
            password: pass
        })
            .then(authResponse => {
                const jwt = authResponse.data.access_token;
                Cookie.set('jwt', jwt, {expires: 60});
                setIsUserLoggedIn(true);
                Cookie.set('log', true, {expires: 60});
                navigate('/');
            })
            .catch(authError => {
                console.log(authError);
                // setError('Identifiants incorrects. Veuillez réessayer.');
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        url.post('/register', formData)
            .then((response) => {
                console.log(response.data);

                handleLogin(formData.email, formData.password)
            })
            .catch((error) => {
                console.error('Error registering user:', error);
            })
    };

    const nextPage = () => {
        setOtherPage(true);
    }

    const previewPage = () => {
        setOtherPage(false);
    }

    return (
        <div className="text-center">
            <h2 className="text-3xl mb-4 text-indigo-600 font-extrabold uppercase">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='relative'>
                    {
                        otherPage ?
                            (
                                <div className=''>
                                    <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                                    <input type="text" name="numero_mobile" value={formData.numero_mobile} onChange={handleChange} placeholder="Mobile Number" className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />

                                    <input type="text" name="carte" value={formData.carte} onChange={handleChange} placeholder="Carte" className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />

                                    <div>
                                        <button onClick={() => previewPage()} className="bg-white text-indigo-600 w-40 px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition duration-300">Preview</button>
                                        <button type="submit" className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition duration-300">Register</button>
                                    </div>
                                </div>
                            ) : (

                                <div className='mx-auto grid grid-cols-1 md:grid-cols-2'>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                                    <input type="password" name="passwordConfirmation" placeholder="Confirm Password" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                                    <button onClick={() => nextPage()} className="bg-white text-indigo-600 w-40 px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition duration-300">Next</button>
                                </div>
                            )
                    }

                </div>

            </form>
        </div>
    );
};

export default Register;
