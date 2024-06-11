import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Style/Css/Swipper.css'

import { Pagination } from 'swiper/modules';
import { faAdd, faChevronRight, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Award, Info, ShieldCheck, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

import url from "./Api/http"
import baseUrl from './Api/baseUrl';

import ShopIllustration from './assets/images/Shopp Illustration noBg.png'
import Footer from './components/Footer'
import TopSelling from './components/TopSelling'

function Home() {

    const [produits, setProduits] = useState([])
    const [customQuantity, setCustomQuantity] = useState({});
    const [quantities, setQuantities] = useState({});

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

    const handleQuantityChange = (id, value) => {
        const newQuantities = { ...quantities, [id]: value };
        setQuantities(newQuantities);
    };

    const handleCustomQuantityChange = (id, event) => {
        const value = parseInt(event.target.value) || '';
        setCustomQuantity({ ...customQuantity, [id]: value });
        handleQuantityChange(id, value);
    };

    const handleSelectChange = (id, event) => {
        const value = event.target.value;
        if (value === '10+') {
            setCustomQuantity({ ...customQuantity, [id]: '' });
            handleQuantityChange(id, 10);
        } else {
            setCustomQuantity({ ...customQuantity, [id]: null });
            handleQuantityChange(id, parseInt(value));
        }
    };

    return (
        <>
            <div className=''>
                <div className='relative overflow-x-hidden'>
                    <img src={ShopIllustration} alt="" className='shopIllustration mx-auto' />
                    <div className='ctaVoirArticle absolute w-screen bottom-10 text-center '>
                        <Link to='/view' className='bg-gray-800 text-white px-3 py-2 rounded-md hover:text-[16px] shadow-lg shadow-gray-500 transition-all active:text-[14px]'>
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

            <TopSelling />

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
                <div className=' m-auto px-4 py-2'>
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
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}

                        modules={[Pagination]}
                        className="mySwiper"

                    >
                        {produits.map((prod, index) => (
                            <SwiperSlide>
                                <div className='transition-all relative shadow-xl w-52 rounded-lg mx-auto my-6 bg-white h-max' key={index}>
                                    {prod.reduction && (
                                        <div className='absolute -right-3 -top-3 bg-gray-600 text-white flex items-center justify-center rounded-full w-10 h-10'>
                                            <p>-{prod.reduction}%</p>
                                        </div>
                                    )}
                                    <div className='transition-all'>
                                        <img src={`${baseUrl}images/` + prod.image} alt="" className='object-contain py-3' />
                                    </div>
                                    <div className='transition-all p-2 text-white bg-gray-800 rounded-b-lg'>
                                        <div className='space-y-3 mx-3 mb-3'>
                                            <div className='flex justify-between items-center'>
                                                <div>
                                                    <div>
                                                        <span className='text-2xl font-bold'>{prod.prix}</span> $
                                                    </div>
                                                    <div>
                                                        <u>Stock :</u> <span>{prod.stock}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Link to={`/detail/${prod.id}`} className='bg-white text-gray-800 rounded-lg max-w-10 overflow-hidden hover:max-w-96 flex items-center space-x-2 px-2 py-1 mx-auto hover:scale-110 transition-all'>
                                                        <div><Info /></div>
                                                        <div>Info</div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='text-base font-bold h-12 line-clamp-2 whitespace-normal overflow-hidden text-ellipsis'>
                                                {prod.designation}
                                            </div>
                                        </div>
                                        <div className='transition-all flex justify-between mx-2'>
                                            {customQuantity[prod.id] === '' ? (
                                                <input
                                                    type="number"
                                                    name="qte"
                                                    id="qte"
                                                    className='mr-4 w-full rounded-lg text-black px-3 border-b-2 border-gray-500 bg-white'
                                                    placeholder='Quantité'
                                                    value={customQuantity[prod.id]}
                                                    onChange={(event) => handleCustomQuantityChange(prod.id, event)} // Gérer le changement de quantité
                                                />
                                            ) : (
                                                <select
                                                    name="qte"
                                                    id="qte"
                                                    className='mr-4 w-full rounded-lg text-black px-3 border-b-2 border-gray-500 bg-white'
                                                    value={quantities[prod.id] || ''}
                                                    onChange={(event) => handleSelectChange(prod.id, event)}
                                                >
                                                    {[...Array(10)].map((_, i) => (
                                                        <option key={i} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                    <option value="10+">10+</option>
                                                </select>
                                            )}
                                            <button className='transition-all border-2 rounded-md border-white p-1' onClick={() => handleAddToCart(prod)}>
                                                <FontAwesomeIcon icon={faCartPlus} size='xl' color='white' />
                                            </button>
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
