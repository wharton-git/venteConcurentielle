import React from 'react';
import url from './../../Api/http';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const jwt = Cookie.get('jwt');
        url.post('/auth/logout', {}, {
            headers: {
                Authorization: 'Bearer ' + jwt,
            }
        })
            .then(() => {
                Cookie.remove('jwt');
                Cookie.remove('log');
                navigate('/login');
                window.location.reload();
            })
            .catch(error => {
                console.error('Erreur de déconnexion :', error);
            });
    }

    return (
        <button
            className='text-white'
            onClick={handleLogout}
        >
            Déconnexion
        </button>
    );
}

export default Logout;
