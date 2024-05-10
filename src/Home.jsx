import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import url from "./Api/http"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Style/Css/Swipper.css'

import { Autoplay, Pagination } from 'swiper/modules';
import { faAdd, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ArrowRightIcon, Award, ShieldCheck, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

import ShopIllustration from './assets/images/Shopp Illustration noBg.png'
import Footer from './components/Footer'

function Home() {

    const [produits, setProduits] = useState([])

    const fetchProduits = async () => {
        try {
            const listProduits = await url.get('/all')
            setProduits(listProduits.data)
        } catch (error) {
            console.error('Erreur : ', error);
        }
    }

    useEffect(() => {
        fetchProduits()
    }, [])

    return (
        <>
            <div className=''>
                <div className='relative overflow-x-hidden'>
                    <img src={ShopIllustration} alt="" className='mx-auto' />
                    <div className='absolute w-screen bottom-10 text-center '>
                        <Link to='/view' className='bg-gray-800 text-white px-3 py-2 rounded-md hover:text-[16px] shadow-lg shadow-gray-500 transition-all'>
                            Voir les articles . . .
                        </Link>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 w-4/5 mx-auto p-3">
                    <div className=''>
                        <div className='flex items-center text-xl font-bold uppercase'>
                            <div><Award className='text-blue-500 mr-2' size={30} /></div>
                            <div>Qualité Garantie</div>
                        </div>
                        <div className='ml-10'>Produits rigoureusement sélectionnés pour leur qualité supérieure.</div>
                    </div>
                    <div className=''>
                        <div className='flex items-center text-xl font-bold uppercase'>
                            <div><Tag className='text-orange-600 mr-2' size={30} /></div>
                            <div>Offre Journalière</div>
                        </div>
                        <div className='ml-10'>Produits rigoureusement sélectionnés pour leur qualité supérieure.</div>
                    </div>
                    <div className=''>
                        <div className='flex items-center text-xl font-bold uppercase'>
                            <div><ShieldCheck className='text-green-600 mr-2' size={30} /></div>
                            <div>Payement Sécurisé</div>
                        </div>
                        <div className='ml-10'>Produits rigoureusement sélectionnés pour leur qualité supérieure.</div>
                    </div>
                </div>
            </div>

<div className="">
    <div className='m-10 shadow-xl rounded-lg p-3'>
        Top vente
    </div>
</div>

<div className="grid sm:grid-cols-2">
    <div className='m-10 shadow-xl rounded-lg p-3'>
        Chaussures
    </div>
    <div className='m-10 shadow-xl rounded-lg p-3'>
        Accessoire
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
                        slidesPerView={1}
                        spaceBetween={10}

                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}

                        modules={[Pagination]}
                        className="mySwiper"

                    >
                        {produits.map((prod, index) => (
                            <SwiperSlide>
                                <div className='relative shadow-xl w-52 rounded-lg'>
                                    <div className='flex justify-between mx-3'>
                                        <div>50% off</div>
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

            <Footer />
        </>
    );
}

export default Home;
