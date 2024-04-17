import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import url from "./Api/http"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Style/Css/Swipper.css'

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { faAdd, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Home() {

    const [produits, setProduits] = useState([])

    const fetchProduits = () => {
        url.get('/all')
            .then(res => setProduits(res.data))
            .catch(err => console.error('Erreur : ', err));
    }

    useEffect(() => {
        fetchProduits()
    }, [])

    console.log(produits)

    return (
        <>

            <div className='m-auto w-5/6'>
                <Swiper
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >

                    {produits.map((prod, index) => (
                        <SwiperSlide>
                            <div className='bg-indigo-500 my-4 rounded-md p-3'>
                                <div className='bg-white w-3/4 mx-auto rounded-lg p-3 m-2'>
                                    <img src={"http://localhost:8000/images/" + prod.image} alt="" />
                                </div>
                                <div className='text-white'>
                                    {prod.designation}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    ...
                </Swiper>
            </div>


            <div className=' m-10 shadow-xl rounded-lg p-3'>
                <Link to='/view'>
                    <span className='mx-4'>
                        View All
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} size='xs' />
                </Link>
                <div className='w-5/6 m-auto px-4 py-2'>
                    <Swiper

                        loop={true}
                        slidesPerView={3}
                        spaceBetween={10}


                        modules={[Pagination]}
                        className="mySwiper"

                    >
                        {produits.map((prod, index) => (
                            <SwiperSlide>
                                <div className='relative shadow-xl w-52 rounded-lg'>
                                    <div className='flex justify-between mx-3'>
                                        <div>50% off</div>
                                        <div>💖</div>
                                    </div>
                                    <div className='m-auto'>
                                        <img src={"http://localhost:8000/images/" + prod.image} alt="" />
                                    </div>
                                    <div className='mt-2 p-2 text-white bg-indigo-500 rounded-b-lg'>
                                        <div>
                                            {prod.designation}
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <div>Prix :</div>
                                            <div>$ {prod.prix}</div>
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <div>Stock :</div>
                                            <div> {prod.stock}</div>
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <button className='border-2 rounded-md border-white px-2 py-1'>
                                                <FontAwesomeIcon icon={faAdd} color='white' />
                                            </button>
                                            <input type="number" name="qte" id="qte" className='mx-4 w-full rounded-lg text-black px-3' placeholder='Quantité' />

                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div className=' m-10 shadow-xl rounded-lg p-3'>
                <Link to='/view'>
                    <span className='mx-4'>
                        View All
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} size='xs' />
                </Link>
                <div className='w-5/6 m-auto px-4 py-2'>
                    <Swiper

                        loop={true}
                        slidesPerView={3}
                        spaceBetween={10}


                        modules={[Pagination]}
                        className="mySwiper"

                    >
                        {produits.map((prod, index) => (
                            <SwiperSlide>
                                <div className='relative shadow-xl w-52 rounded-lg'>
                                    <div className='flex justify-between mx-3'>
                                        <div>50% off</div>
                                        <div>💖</div>
                                    </div>
                                    <div className='m-auto'>
                                        <img src={"http://localhost:8000/images/" + prod.image} alt="" />
                                    </div>
                                    <div className='mt-2 p-2 text-white bg-indigo-500 rounded-b-lg'>
                                        <div>
                                            {prod.designation}
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <div>Prix :</div>
                                            <div>$ {prod.prix}</div>
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <div>Stock :</div>
                                            <div> {prod.stock}</div>
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <button className='border-2 rounded-md border-white px-2 py-1'>
                                                <FontAwesomeIcon icon={faAdd} color='white' />
                                            </button>
                                            <input type="number" name="qte" id="qte" className='mx-4 w-full rounded-lg text-black px-3' placeholder='Quantité' />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div className=' m-10 shadow-xl rounded-lg p-3'>
                <Link to='/view'>
                    <span className='mx-4'>
                        View All
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} size='xs' />
                </Link>
                <div className='w-5/6 m-auto px-4 py-2'>
                    <Swiper

                        loop={true}
                        slidesPerView={3}
                        spaceBetween={10}


                        modules={[Pagination]}
                        className="mySwiper"

                    >
                        {produits.map((prod, index) => (
                            <SwiperSlide>
                                <div className='relative shadow-xl w-52 rounded-lg'>
                                    <div className='flex justify-between mx-3'>
                                        <div>50% off</div>
                                        <div>💖</div>
                                    </div>
                                    <div className='m-auto'>
                                        <img src={"http://localhost:8000/images/" + prod.image} alt="" />
                                    </div>
                                    <div className='mt-2 p-2 text-white bg-indigo-500 rounded-b-lg'>
                                        <div>
                                            {prod.designation}
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <div>Prix :</div>
                                            <div>$ {prod.prix}</div>
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <div>Stock :</div>
                                            <div> {prod.stock}</div>
                                        </div>
                                        <div className='flex justify-between mx-3'>
                                            <button className='border-2 rounded-md border-white px-2 py-1'>
                                                <FontAwesomeIcon icon={faAdd} color='white' />
                                            </button>
                                            <input type="number" name="qte" id="qte" className='mx-4 w-full rounded-lg text-black px-3' placeholder='Quantité' />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default Home;
