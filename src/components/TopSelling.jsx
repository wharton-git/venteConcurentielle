import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './../Style/Css/Swipper.css'

import { Pagination } from 'swiper/modules';

import url from "./../Api/http"
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

                    breakpoints={{
                        520: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}

                    modules={[Pagination]}
                    className="mySwiper"

                >
                    {mostpurchased.map((best) => (
                        <SwiperSlide>
                            <div className="p-2 w-4/5">
                                <div className="flex rounded-lg w-40 mx-auto h-64 dark:bg-gray-800 bg-teal-400 p-3 flex-col">
                                    <div className=''>
                                        <img src={"http://localhost:8000/images/" + best.image} alt="" className='rounded-md ' />
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        <p className="leading-relaxed text-base text-white dark:text-gray-300">{best.designation}</p>
                                        <Link to='/detail' className='bg-white text-gray-800 rounded-lg flex items-center space-x-2 w-max px-2 py-1 mx-auto  hover:scale-110 transition-all'>
                                            <Info/>
                                            <div>Info</div>
                                        </Link>
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
