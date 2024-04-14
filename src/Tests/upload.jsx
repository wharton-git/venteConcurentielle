import React, { useState } from 'react'
import axios from 'axios'

const upload = () => {

    const [imageData, setImageData] = useState('')

    const handleChange = file => {
        setImageData(file[0])
    }

    const submitData = e => {
        e.preventDefault();
        const fdata = new FormData()

        fdata.append('image', imageData)

        console.log(fdata)

        axios.post('http://127.0.0.1:8000/api/upload', fdata)
            .then(res => {
                console.log('Response', res)
            })
            .catch(err => {
                console.error('Failure', err)
            })
    }

    return (
        <div>
            <div className='bg-gray-300 w-2/4 mx-auto text-center py-4 rounded-xl my-2'>
                <form onSubmit={submitData}>
                    <input type="file" className='m-4 bg-indigo-300 rounded-md' onChange={e => handleChange(e.target.files)} /> <br />
                    <button type="submit" onClick={submitData} className='px-3 py-1 bg-indigo-400 rounded-md text-white hover:bg-indigo-500 transition-all'>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default upload
