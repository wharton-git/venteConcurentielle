import React from 'react'


import './../../Style/Css/Loading.css'

const Loading = () => {
    return (

        <div className='absolute z-20 top-0 flex items-center bg-black bg-opacity-85 h-screen w-screen'>
            <div class="preloader mx-auto">
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
            </div>
        </div>
    )
}

export default Loading
