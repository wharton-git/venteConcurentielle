import React from 'react'
import { Link } from 'react-router-dom'


import './../../Style/Css/Loading.css'

const Loading = ({ errorState, loading }) => {

    return (

        <div className='absolute z-20 top-0 flex items-center bg-black bg-opacity-85 h-screen w-screen'>
            <div class="mx-auto">
                {!errorState ? (
                    <svg class="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                            <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
                                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                                <circle cx="43" cy="111" r="13" />
                                <circle cx="102" cy="111" r="13" />
                            </g>
                            <g class="cart__lines" stroke="currentColor">
                                <polyline class="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" stroke-dasharray="338 338" stroke-dashoffset="-338" />
                                <g class="cart__wheel1" transform="rotate(-90,43,111)">
                                    <circle class="cart__wheel-stroke" cx="43" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
                                </g>
                                <g class="cart__wheel2" transform="rotate(90,102,111)">
                                    <circle class="cart__wheel-stroke" cx="102" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
                                </g>
                            </g>
                        </g>
                    </svg>

                ) : (
                    <div className='text-white text-center relative font-bold bg-red-500 py-4 px-2 rounded-md'>
                        <button onClick={() => { loading(false) }}><span className='absolute top-0 right-2 text-2xl hover:scale-[1.3] cursor-pointer transition-all'>&times;</span></button>
                        <div className='text-[4em]'>
                            ≧ ﹏ ≦
                        </div>
                        <div className='text-xl'>
                            Désolé, une erreur est survenue !
                            <span className='block text-xs'>
                                Veuillez vous reconnecter.
                            </span>
                            <div className='my-5 text-[13px] hover:scale-110 w-max mx-auto transition-all'>
                                <Link to='/login' className='bg-slate-200 shadow-md active:shadow-2xl text-black rounded-md  px-3 py-2 hover:bg-white transition-all'>Reconnecter</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Loading
