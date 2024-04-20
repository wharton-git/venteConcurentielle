import React from 'react';
import url from './../../Api/http';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsUserLoggedIn }) => {
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
            setIsUserLoggedIn(false); 
            navigate('/'); 
        })
        .catch(error => {
            console.error('Erreur de déconnexion :', error);
        });
    }

    return (
        <button onClick={handleLogout}>Déconnexion</button>
    );
}

export default Logout;
