import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './../Style/Css/Swipper.css'

import { Pagination } from 'swiper/modules';

import url from "./../Api/http"
import baseUrl from './../Api/baseUrl';
import { Info } from 'lucide-react';

function TopSellingComponent() {
    const [mostpurchased, setMostPurchased] = useState([])

    useEffect(() => {
        getMostPurchased()
    }, [])

    const getMostPurchased = async () => {
        try {
            const purchased = await url.get('/mostpurchased')
            setMostPurchased(purchased.data)
        } catch (error) {
            console.error('Erreur : ', error);
        }
    }

    const pagination = {
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div className="mx-10">
            <div className='uppercase text-xl font-extrabold mt-5'>
                Meilleure Vente
            </div>
            <div className='m-0 border-t-4 border-gray-800 pt-5 '>
                <Swiper

                    loop={false}
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={pagination}

                    breakpoints={{
                        520: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}

                    modules={[Pagination]}
                    className="mySwiper"

                >
                    {mostpurchased.map((best) => (
                        <SwiperSlide>
                            <div className="p-2 w-4/5 mb-8">
                                <div className="transition-all relative shadow-xl w-52 rounded-lg mx-auto my-6 bg-white h-max">
                                <div className='transition-all'>
                                        <img src={`${baseUrl}images/` + best.image} alt="" className='object-contain py-3' />
                                    </div>
                                    <div className='transition-all p-2 text-white bg-gray-800 rounded-b-lg'>
                                        <div className='space-y-3 mx-3 mb-3'>
                                            <div className='flex justify-between items-center'>
                                                <div>
                                                    <div>
                                                        <span className='text-2xl font-bold'>{best.prix}</span> $
                                                    </div>
                                                    <div>
                                                        <u>Stock :</u> <span>{best.stock}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Link to={`/detail/${best.id}`} className='bg-white text-gray-800 rounded-lg max-w-10 overflow-hidden hover:max-w-96 flex items-center space-x-2 px-2 py-1 mx-auto hover:scale-110 transition-all'>
                                                        <div><Info /></div>
                                                        <div>Info</div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='text-base font-bold h-12 line-clamp-2 whitespace-normal overflow-hidden text-ellipsis'>
                                                {best.designation}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default TopSellingComponent;
