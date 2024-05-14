import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import url from './../Api/http'
import { ShoppingCart } from 'lucide-react';

const Detail = () => {

    const [detailProduits, setDetailProduits] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetchDetailProduits()
    }, [])

    const fetchDetailProduits = async () => {
        try {
            const details = await url.post(`/detail/${id}`)
            console.log(details.data);
            setDetailProduits(details.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full sm:w-5/6 sm:mx-auto p-4 transition-all space-y-10'>
            <div className='flex space-x-6'>
                <div className='min-w-10 w-1/2 max-w-72'>
                    <img src={"http://localhost:8000/images/" + detailProduits.image} alt={detailProduits.designation}
                        className='mx-auto rounded-lg border-4 border-gray-800'
                    />
                </div>
                <div>
                    <div className='font-bold my-1 sm:my-3 sm:text-xl md:text-2xl lg:text-3xl transition-all'>
                        {detailProduits.designation}
                    </div>
                    <div className='sm:space-y-4'>
                        <div className='space-x-4 text-base'>
                            <span className='underline'>
                                Prix :
                            </span>
                            <span className='font-bold'>
                                {detailProduits.prix} $
                            </span>
                        </div>
                        <div className='space-x-4 text-base'>
                            <span className='underline'>
                                Disponible :
                            </span>
                            <span className='font-bold'>
                                {detailProduits.stock}
                            </span>
                        </div>
                        <div className='space-x-4 text-base'>
                            <span className='underline'>
                                Details :
                            </span>
                            <span className='font-bold'>
                                {detailProduits.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className='flex items-center space-x-2 bg-gray-800 text-white p-2 rounded-md shadow-lg shadow-gray-400 hover:shadow-gray-600 hover:scale-110 active:scale-100 active:bg-white active:text-black active:shadow-inner active:shadow-gray-500 transition-all'>
                    <div>
                        <ShoppingCart />
                    </div>
                    <div>
                        Ajouter au panier
                    </div>
                </button>
            </div>
            <div>
                Les prix des articles vendus sur R Market incluent la TVA. En fonction de votre adresse de livraison, la TVA peut varier au moment du paiement.
            </div>
        </div>
    )
}

export default Detail