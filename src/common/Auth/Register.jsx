import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import url from './../../Api/http';

const Register = ({ setIsUserLoggedIn }) => {
    const [otherPage, setOtherPage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        username: '', 
        email: '',
        adresse: '',
        numero_mobile: '',
        carte: '',
        password: '',
        passwordConfirmation: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            ...(name === 'name' && { username: generateUsername(value) })
        }));
    };

    const generateUsername = (name) => {
        const formattedName = name.toLowerCase().replace(/\s+/g, '_');
        return formattedName;
    };

    const handleLogin = (mail, pass) => {
        url.post('/auth/login', {
            login: mail,
            password: pass
        })
        .then(authResponse => {
            const jwt = authResponse.data.access_token;
            Cookie.set('jwt', jwt, { expires: 60 });
            setIsUserLoggedIn(true);
            Cookie.set('log', true, { expires: 60 });
            navigate('/');
        })
        .catch(authError => {
            console.log(authError);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        url.post('/register', formData)
        .then((response) => {
            console.log(response.data);
            handleLogin(formData.email, formData.password);
        })
        .catch((error) => {
            console.error('Error registering user:', error);
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const nextPage = () => {
        setOtherPage(true);
    };

    const previewPage = () => {
        setOtherPage(false);
    };



    return (
        <div className="text-center">
            <h2 className="text-3xl mb-4 text-indigo-600 font-extrabold uppercase">Register</h2>
            <form onSubmit={handleSubmit} className="mx-auto grid grid-cols-1 md:grid-cols-2">
                {otherPage ? (
                    <>
                        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                        <input type="text" name="numero_mobile" value={formData.numero_mobile} onChange={handleChange} placeholder="Mobile Number" className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                        <input type="text" name="carte" value={formData.carte} onChange={handleChange} placeholder="Carte" className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                        <div>
                            <button onClick={previewPage} className="bg-white text-indigo-600 w-40 px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition duration-300">Preview</button>
                            <button type="submit" className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition duration-300">Register</button>
                        </div>
                    </>
                ) : (
                    <>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                            <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2" onClick={togglePasswordVisibility}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleChange} placeholder="Confirm Password" required className="mb-4 p-2 rounded-lg w-3/4 mx-auto " />
                            <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2" onClick={togglePasswordVisibility}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <button onClick={nextPage} className="bg-white text-indigo-600 w-40 px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition duration-300">Next</button>
                    </>

                )}
            </form>
        </div>
    );
};

export default Register;
