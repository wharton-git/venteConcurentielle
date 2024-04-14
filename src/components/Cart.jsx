import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ items, removeFromCart, updateQuantity }) => {
    return (
        <div>
            <h1 className='my-[3%] text-2xl font-bold text-center'>PANIER</h1>
            <div className='py-3 mx-6 rounded-lg md:w-2/4 md:mx-auto transition-all md:transition-all'>
                <ul className='mx-10'>
                    {items.map((item, index) => (
                        <li key={index} className='flex justify-between items-center bg-indigo-500 text-white my-2 p-2 rounded-md shadow-lg'>
                            <div className='ml-3'>
                                <div>
                                    {item.designation}
                                </div>
                                <div>
                                    <input 
                                        type="number" 
                                        name="qte" 
                                        id="qte" 
                                        className='rounded-lg text-black px-3' 
                                        value={item.quantity} 
                                        placeholder='Quantité' 
                                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))} 
                                    />
                                </div>
                            </div>
                            <div className='mr-3'>
                                <button onClick={() => removeFromCart(index)}> 
                                    <FontAwesomeIcon icon={faTrash} size='lg'/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Cart;
