import React from 'react'

const Security = ({ title, desc }) => {
    return (
        <div>
            <div className='text-center'>
                <div className=' uppercase text-2xl py-2 font-bold'>
                    {title}
                </div>
                <div className='hidden sm:block'>
                    {desc}
                </div>
            </div>
        </div>
    )
}

export default Security
