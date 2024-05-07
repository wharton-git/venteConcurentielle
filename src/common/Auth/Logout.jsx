import React from 'react';
import url from './../../Api/http';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';

const Logout = ({ }) => {
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
            window.location.href = '/login'

        } catch (error) {
            console.error('Erreur de déconnexion :', error);
            Cookie.remove('jwt')
            Cookie.remove('log')
            Cookie.remove('name')
            window.location.href = '/login'
        }
    }

return (
    <button
        className='text-white flex space-x-2 items-center p-2 w-full'
        onClick={handleLogout}
    >
        <LogOutIcon />
        <div>
            Déconnexion
        </div>
    </button>
);
}

export default Logout;
