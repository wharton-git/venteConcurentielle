import React from 'react'
import wave from './../assets/images/FooterWave.svg'

const Footer = () => {
    return (
        <>
            <div className='m-0 bg-gradient-to-t from-gray-800 from-20% to-gray-100 to-80%'>
                <img src={wave} alt="" className='' />
                <div className='text-white'>
                    Footer
                </div>
            </div>

        </>
    )
}

export default Footer
