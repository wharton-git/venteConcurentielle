import React from 'react';
import url from './../../Api/http';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = ({ icon, text }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const jwt = Cookie.get('jwt');

        try {
            const deconnexion = await url.post('/auth/logout', {}, {
                headers: {
                    Authorization: 'Bearer ' + jwt,
                }
            })

            Cookie.remove('jwt')
            Cookie.remove('log')
            Cookie.remove('name')
            localStorage.clear()
            window.location.href = '/login'

        } catch (error) {
            console.error('Erreur de déconnexion :', error);
            Cookie.remove('jwt')
            Cookie.remove('log')
            Cookie.remove('name')
            localStorage.clear()
            window.location.href = '/login'
        }
    }

    return (
        <button
            className='flex space-x-2 items-center p-2 w-full'
            onClick={handleLogout}
        >
            <div>
                {icon}
            </div>
            <div>
                {text}
            </div>
        </button>
    );
}

export default Logout;
