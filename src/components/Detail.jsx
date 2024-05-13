import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import url from './../Api/http'
import {  } from '@fortawesome/free-solid-svg-icons';

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
        <div className='w-3/4 mx-auto pt-10 sm:p-10'>
            <div className='p-2 rounded-md bg-gray-200'>
                <div className='flex space-x-4'>
                    <div className='w-1/3'>
                        <img src={"http://localhost:8000/images/" + detailProduits.image} alt={detailProduits.designation}
                            className='rounded-md border-4 border-gray-800'
                        />
                    </div>
                    <div>
                        <div className='sm:text-2xl font-bold'>
                            {detailProduits.designation}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={} size='xs' />
                        </div>
                    </div>
                </div>
                <div>
                    {detailProduits.description}
                </div>
            </div>
        </div>
    )
}

export default Detail