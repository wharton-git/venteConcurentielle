import React from 'react'
import Search from '../common/header/Search';
import Navbar from '../common/header/Navbar';
import Logo from './../assets/images/Logo_R_Market.svg'

const fakeHeader = () => {
    return (
        <div className=''>
            <div className='flex bg-indigo-500 text-white px-4 py-2'>
                <div className='w-24 px-3 py-2'>
                    <img src={Logo} />
                </div>
                <div className='grid grid-cols-1 w-full'>
                    <Search />
                    <Navbar />
                </div>
            </div>
        </div>
    )
}

export default fakeHeader
