import React, { useEffect, useState } from 'react';
import { PlusSquare } from 'lucide-react';

import url from "./../Api/http"

function TopSellingComponent() {
    const [mostpurchased, setMostPurchased] = useState([])
    const [hoverStates, setHoverStates] = useState(Array(mostpurchased.length).fill(false));

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

    const handleMouseEnter = index => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = true;
        setHoverStates(newHoverStates);
    };

    const handleMouseLeave = index => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = false;
        setHoverStates(newHoverStates);
    };

    return (
        <div className="">
            <div className='m-10 shadow-xl rounded-lg p-3 transition-all'>
                <div>Top vente</div>
                <div className='grid grid-cols-2 sm:flex sm:justify-evenly'>
                    {mostpurchased.map((best, index) => (
                        <div className='bg-blue-400 w-max sm:w-full transition-all' key={index} >
                            <div className='m-1 relative peer bg-red-300 flex w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 overflow-hidden transition-all' onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
                                <img src={"http://localhost:8000/images/" + best.image} alt="" />
                                <div className={`bg-black bg-opacity-75 text-white text-center absolute w-full h-full py-4 font-bold ${hoverStates[index] ? 'translate-y-0' : 'translate-y-96'} transition-all`}>
                                    <div>{best.designation}</div>
                                    <div>{best.prix} $</div>
                                    <div className='my-8 '>
                                        <button className='bg-white text-gray-800 px-3 py-1 rounded-md'>
                                            <div className='flex space-x-2'>
                                                <PlusSquare />
                                                <p>Panier</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopSellingComponent;
