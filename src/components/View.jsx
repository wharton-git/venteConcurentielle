import {React, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const View = ({ data, addToCart }) => {

    const [quantities, setQuantities] = useState({});

    const handleAddToCart = (prod) => {
        addToCart({ ...prod, quantity: quantities[prod.id] || 1 }); // Ajouter la quantité lors de l'ajout au panier
    };

    const handleQuantityChange = (id, event) => {
        const newQuantities = { ...quantities, [id]: parseInt(event.target.value) };
        setQuantities(newQuantities);
    };

    return (
        <>
            <div className='transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 mx-auto my-10'>
                {data.map((prod, index) => (
                    <div className='transition-all relative shadow-xl w-52 rounded-lg mx-auto my-6'>
                        <div className='transition-all flex justify-between mx-3'>
                            <div>50% off</div>
                            <div>💖</div>
                        </div>
                        <div className='transition-all w-20 m-auto'>
                            <img src={"http://localhost:8000/images/" + prod.image} alt="" />
                        </div>
                        <div className='transition-all mt-2 p-2 text-white bg-indigo-500 rounded-b-lg'>
                            <div>
                                {prod.designation}
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
                                    className='mx-4 w-full rounded-lg text-black px-3'
                                    placeholder='Quantité'
                                    onChange={(event) => handleQuantityChange(prod.id, event)} // Gérer le changement de quantité
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default View
