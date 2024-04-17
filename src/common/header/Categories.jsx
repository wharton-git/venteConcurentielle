import React from 'react'
import { Link } from 'react-router-dom';

const Categories = ({ categories, filtredCat }) => {

    return (
        
            <div className='absolute left-[10%] text-black'>
                <div className='m-0'>
                    <div className='m-2 rounded-md shadow-lg bg-slate-100'>
                        <ul className='rounded-xl grid grid-cols-2 sm:grid-cols-4 transition-all '>
                            {categories.map((type, index) => (
                                <div className='m-1 flex rounded-lg transition-all'>
                                    <Link
                                        to='/view'
                                        onClick={() => filtredCat(type.type)}
                                        className='px-4 py-2 bg-indigo-500 text-white rounded-md transition-all'
                                    >{type.type}</Link>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        
    )
}

export default Categories
