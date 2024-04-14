import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Search = ({ onSearchChange, totalItems }) => {

     const handleInputChange = (e) => {
          onSearchChange(e.target.value)
     }

     const displayTotalItems = isNaN(totalItems) ? 0 : totalItems;

     return (
          <>
               <div className='flex'>
                    <div className='border-2 border-zinc-200 w-full flex rounded-lg mx-2'>
                         <Link to='/view' className='bg-zinc-400 rounded-l-md px-3 py-1 text-center'>
                              <FontAwesomeIcon icon={faSearch} />
                         </Link>
                         <input
                              className='px-3 py-1 w-full bg-transparent rounded-lg placeholder:text-zinc-200'
                              type="text" name="search-bar" id="search-bar" placeholder='Looking for something ? ...'
                              onChange={handleInputChange}
                         />
                    </div>
                    <Link to='/cart' className='m-3 relative'>
                         <FontAwesomeIcon icon={faShoppingBag} size='xl' />
                         <span className='absolute text-xs left-2 bottom-0 px-1 bg-red-300 rounded-full' id='compteur-card'>{displayTotalItems}</span>
                    </Link>
               </div>
          </>
     )
}

export default Search
