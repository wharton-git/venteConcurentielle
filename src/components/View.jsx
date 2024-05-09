import { React, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faBars } from '@fortawesome/free-solid-svg-icons';

const View = ({ data, addToCart, type, onCategorieChange, refreshData }) => {

    const [quantities, setQuantities] = useState({});
    const [showcategory, setShowCategory] = useState(true);

    const handleAddToCart = (prod) => {
        addToCart({ ...prod, quantity: quantities[prod.id] || 1 });
    };

    const handleQuantityChange = (id, event) => {
        const newQuantities = { ...quantities, [id]: parseInt(event.target.value) };
        setQuantities(newQuantities);
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
                            <div className='flex'>
                                <input type="radio" value={cat} name='type' className='pr-10 bg-blue-800' onClick={handleCategories} />
                                <label htmlFor="">{cat}</label>
                            </div>

                        ))}
                    </div>
                </div>
                <div className='cardProd transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-6 h-[82vh] overflow-y-scroll'>
                    {data.map((prod, index) => (
                        <div className='transition-all relative shadow-xl w-52 rounded-lg mx-auto my-6 bg-white h-max'>
                            <div className='transition-all flex justify-between mx-3'>
                                <div>50% off</div>
                            </div>
                            <div className='transition-all w-20 m-auto hover:w-full'>
                                <img src={"http://localhost:8000/images/" + prod.image} alt="" />
                            </div>
                            <div className='transition-all p-2 text-white bg-gray-800 rounded-b-lg '>
                                <div className='flex justify-between'>
                                    <span className='underline capitalize font-bold'>{prod.designation}</span>
                                    <span className=' capitalize px-1 rounded-md'>{prod.type}</span>
                                </div>
                                <div className='transition-all flex justify-between mx-3'>
                                    <div>Prix :</div>
                                    <div> {prod.prix} $</div>
                                </div>
                                <div className='transition-all flex justify-between mx-3'>
                                    <div>Stock :</div>
                                    <div> {prod.stock}</div>
                                </div>
                                <div className='transition-all flex justify-between mx-3'>
                                    <button className='transition-all border-2 rounded-md border-white px-2 py-1' onClick={() => handleAddToCart(prod)}>
                                        <FontAwesomeIcon icon={faAdd} color='white' />
                                    </button>
                                    <input
                                        type="number"
                                        name="qte"
                                        id="qte"
                                        className='mx-4 w-full rounded-lg text-black px-3 border-b-2 border-gray-500 bg-white'
                                        placeholder='Quantité'
                                        onChange={(event) => handleQuantityChange(prod.id, event)} // Gérer le changement de quantité
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default View
