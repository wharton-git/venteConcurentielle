import React from 'react'
import url from './../../Api/http'
import Cookie from 'js-cookie'


const Solde = ({title, desc}) => {



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
            <div>

            </div>
        </div>
    )
}

export default Solde
