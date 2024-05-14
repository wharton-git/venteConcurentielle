import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Swal from 'sweetalert2'; // Assurez-vous d'importer Swal (SweetAlert2)

import url from './../Api/http';

const Detail = ({ addToCart }) => {
    const [detailProduits, setDetailProduits] = useState([]);
    const [quantity, setQuantity] = useState(1); // État local pour la quantité
    const [isCustomQuantity, setIsCustomQuantity] = useState(false); // État local pour indiquer si la quantité personnalisée est activée

    const { id } = useParams();

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

    useEffect(() => {
        fetchDetailProduits();
    }, []);

    const handleAddToCart = (prod) => {
        addToCart({ ...prod, quantity }); // Utilisez la quantité actuelle définie dans l'état local
        Toast.fire({
            icon: "success",
            title: "Ajouté"
        });
    };

    const fetchDetailProduits = async () => {
        try {
            const details = await url.post(`/detail/${id}`);
            setDetailProduits(details.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
        if (value === 10) {
            setIsCustomQuantity(true);
        } else {
            setIsCustomQuantity(false);
        }
    };

    const handleCustomQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
    };

    return (
        <div className='w-full sm:w-5/6 sm:mx-auto p-4 transition-all space-y-10'>
            <div className='flex space-x-6'>
                <div className='min-w-10 w-1/2 max-w-72'>
                    <img
                        src={`http://localhost:8000/images/${detailProduits.image}`}
                        alt={detailProduits.designation}
                        className='mx-auto rounded-lg border-4 border-gray-800'
                    />
                </div>
                <div>
                    <div className='font-bold my-1 sm:my-3 sm:text-xl md:text-2xl lg:text-3xl transition-all'>
                        {detailProduits.designation}
                    </div>
                    <div className='sm:space-y-4'>
                        <div className='space-x-4 text-base'>
                            <span className='underline'>Prix :</span>
                            <span className='font-bold'>{detailProduits.prix} $</span>
                        </div>
                        <div className='space-x-4 text-base'>
                            <span className='underline'>Disponible :</span>
                            <span className='font-bold'>{detailProduits.stock}</span>
                        </div>
                        <div className='space-x-4 text-base'>
                            <span className='underline'>Details :</span>
                            <span className='font-bold'>{detailProduits.description}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between sm:justify-normal sm:space-x-5'>
                <button
                    onClick={() => handleAddToCart(detailProduits)}
                    className='flex items-center space-x-2 bg-gray-800 text-white p-2 rounded-md shadow-lg shadow-gray-400 hover:shadow-gray-600 hover:scale-110 active:scale-100 active:bg-white active:text-black active:shadow-inner active:shadow-gray-500 transition-all'
                >
                    <div>
                        <ShoppingCart />
                    </div>
                    <div>Ajouter au panier</div>
                </button>
                <div className='space-x-4 text-base'>
                    <span className='underline'>Quantité :</span>
                    {isCustomQuantity ? (
                        <input
                            type='number'
                            value={quantity}
                            min={1}
                            onChange={handleCustomQuantityChange}
                            className='border border-gray-300 rounded-md px-3 py-1'
                        />
                    ) : (
                        <select
                            value={quantity}
                            onChange={handleQuantityChange}
                            className='border border-gray-300 rounded-md px-3 py-1'
                        >
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                            <option value={10}>Saisi manuel</option>
                        </select>
                    )}
                </div>
            </div>
            <div>
                Les prix des articles vendus sur R Market incluent la TVA. En fonction de votre adresse de livraison, la TVA peut varier au moment du paiement.
            </div>
        </div>
    );
};

export default Detail;
