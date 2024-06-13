import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBars, faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import baseUrl from './../Api/baseUrl';

import { Link } from 'react-router-dom';
import { Info, Minus, Plus } from 'lucide-react';

const View = ({ data, addToCart, type, onCategorieChange, refreshData }) => {
    const [quantities, setQuantities] = useState({});
    const [showcategory, setShowCategory] = useState(true);

    useEffect(() => { }, [data]);

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
        handleQuantityChange(id, value);
    };

    const handleIncrement = (id) => {
        const newQuantity = (quantities[id] || 1) + 1;
        handleQuantityChange(id, newQuantity);
    };

    const handleDecrement = (id) => {
        const newQuantity = (quantities[id] || 0) - 1;
        if (newQuantity > 0) {
            handleQuantityChange(id, newQuantity);
        }
    };

    const handleCategories = (e) => {
        onCategorieChange(e.target.value);
    };

    const handleClick = () => {
        setShowCategory(!showcategory);
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
                            <label htmlFor="">Toutes</label>
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
                            {prod.reduction && (
                                <div className='absolute -right-3 -top-3 bg-gray-600 text-white flex items-center justify-center rounded-full w-10 h-10'>
                                    <p>-{prod.reduction}%</p>
                                </div>
                            )}
                            <div className='transition-all'>
                                <img src={`${baseUrl}images/` + prod.image} alt="" className='h-40 w-40 object-contain mx-auto' />
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
                                <div className='transition-all flex mx-2 justify-between items-center'>
                                    <div className='flex items-center bg-white text-black rounded-md'>
                                        <button className='transition-all' onClick={() => handleDecrement(prod.id)}>
                                            <Minus className='px-1'/>
                                        </button>
                                        <input
                                            type="text"
                                            name="qte"
                                            id="qte"
                                            className='w-10 h-8 text-black border-x-2 bg-white text-center focus:outline-none'
                                            placeholder='Quantité'
                                            value={quantities[prod.id] || '1'}
                                            onChange={(event) => handleCustomQuantityChange(prod.id, event)} // Handle quantity change
                                        />
                                        <button className='transition-all' onClick={() => handleIncrement(prod.id)}>
                                            <Plus className='px-1'/>
                                        </button>
                                    </div>
                                    <button className='transition-all border-2 rounded-md border-white p-1' onClick={() => handleAddToCart(prod)}>
                                        <FontAwesomeIcon icon={faCartPlus} size='2xl' color='white' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default View;
