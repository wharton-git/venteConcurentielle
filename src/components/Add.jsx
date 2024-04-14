import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
    const [product, setProduct] = useState({
        designation: '',
        description: '',
        prix: 0,
        stock: 0,
        type: '',
        image: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('designation', product.designation);
        formData.append('description', product.description);
        formData.append('prix', product.prix);
        formData.append('stock', product.stock);
        formData.append('type', product.type);
        formData.append('image', product.image);

        try {
            await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='text-center'>
            <div className='flex justify-center'>
                <input className='mx-1 my-5 px-2 py-2 rounded-lg border-b-4 w-5/6 md:w-80 transition-all border-indigo-500 bg-slate-200 ' type="text" name="designation" placeholder="Designation" value={product.designation} onChange={handleInputChange} />
                <input className='mx-1 my-5 px-2 py-2 rounded-lg border-b-4 w-5/6 md:w-80 transition-all border-indigo-500 bg-slate-200 ' type="number" name="prix" placeholder="Price" value={product.prix} onChange={handleInputChange} />
            </div>
            <div className='flex justify-center'>
                <input className='mx-1 my-5 px-2 py-2 rounded-lg border-b-4 w-5/6 md:w-80 transition-all border-indigo-500 bg-slate-200 ' type="text" name="type" placeholder="Type" value={product.type} onChange={handleInputChange} />
                <input className='mx-1 my-5 px-2 py-2 rounded-lg border-b-4 w-5/6 md:w-80 transition-all border-indigo-500 bg-slate-200 ' type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleInputChange} />
            </div>
            <input type="file" onChange={handleFileChange}
                className='border-b-4 border-indigo-500 bg-slate-200 px-3 py-1 rounded-lg' />
            <div>
                <textarea name="description" id=""
                    placeholder="Description (Peut être vide)" value={product.description} onChange={handleInputChange}
                    className='w-5/6 h-20 my-5 px-3 py-1 rounded-lg border-b-4 border-indigo-500 bg-slate-200'>
                </textarea>
            </div>
            <div className='mx-auto w-max'>
                <button className='p-3 bg-indigo-500 hover:bg-indigo-800 transition-all text-white rounded-md' type="submit">Add Product</button>
            </div>
        </form>
    );
}

export default ProductForm;
