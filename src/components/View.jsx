import { React, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faBars, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import baseUrl from './../Api/baseUrl';

import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

const View = ({ data, addToCart, type, onCategorieChange, refreshData }) => {
    const [quantities, setQuantities] = useState({});
    const [showcategory, setShowCategory] = useState(true);
    const [customQuantity, setCustomQuantity] = useState({});

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleAddToCart = (prod) => {
        addToCart({ ...prod, quantity: quantities[prod.id] || 1 });
        Toast.fire({
            icon: "success",
            title: "Ajouté"
        });
    };

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
            handleQuantityChange(id, 10); // Set default quantity to 10 initially
        } else {
            setCustomQuantity({ ...customQuantity, [id]: null });
            handleQuantityChange(id, parseInt(value));
        }
    };

    const handleCategories = (e) => {
        onCategorieChange(e.target.value)
    }

    const handleClick = () => {
        setShowCategory(!showcategory)
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <>
            <div className='flex'>
                <div>
                    <div
                        onClick={() => handleClick()}
                        className='absolute cmdSideBar mx-3 my-2 px-3 py-2 w-max text-center rounded-full bg-white shadow-lg hover:text-white hover:bg-indigo-500 active:text-xs transition-all'
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className={`sideMenu ${!showcategory && `cacheSideMenu`} ml-3 mt-14 capitalize transition-all grid grid-cols-1 py-6 bg-white rounded-lg shadow-lg`}>
                        <div className='flex'>
                            <input type="radio" value="all" name='type' className='pr-10 bg-blue-800' onClick={handleCategories} />
                            <label htmlFor="">All</label>
                        </div>
                        {type.map((cat, index) => (
                            <div className='flex' key={index}>
                                <input type="radio" value={cat} name='type' className='pr-10 bg-blue-800' onClick={handleCategories} />
                                <label htmlFor="">{cat}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='cardProd transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-6 h-[82vh] overflow-y-scroll'>
                    {data.map((prod, index) => (
                        <div className='transition-all relative shadow-xl w-52 rounded-lg mx-auto my-6 bg-white h-max' key={index}>
                            <div className='transition-all'>
                                <img src={`${baseUrl}images/` + prod.image} alt="" className='h-40 w-40 object-contain mx-auto' />
                            </div>
                            <div className='transition-all p-2 text-white bg-gray-800 rounded-b-lg '>
                                <div className='space-y-3 mx-3 mb-3'>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <div>
                                                <span className='text-2xl font-bold'> {prod.prix} </span> $
                                            </div>
                                            <div >
                                                <u>Stock :</u> <span>{prod.stock}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={`/detail/${prod.id}`} className='bg-white text-gray-800 rounded-lg max-w-10 overflow-hidden hover:max-w-96 flex items-center space-x-2 px-2 py-1 mx-auto  hover:scale-110 transition-all'>
                                                <div><Info /></div>
                                                <div>Info</div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className=' text-base font-bold h-12 line-clamp-2 whitespace-normal overflow-hidden text-ellipsis'>
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
                                    <button className='transition-all border-2 rounded-md border-white p-1 ' onClick={() => handleAddToCart(prod)}>
                                        <FontAwesomeIcon icon={faCartPlus} size='2xl' color='white' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* test
            <div className='grid grid-cols-6 pb-40 '>
                {data.map((item, index) => (
                    <div className='w-40' key={index}>
                        <img src={`${baseUrl}images/` + item.image} alt="" className='h-60 w-60 object-contain' />
                        <div className='h-10 whitespace-normal line-clamp-2 bg-green-300 overflow-hidden text-ellipsis'>
                            {item.description}
                        </div>
                    </div>
                ))}
            </div> */}
        </>
    )
}

export default View
