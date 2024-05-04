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
            <div className='bg-blue-400 w-2/4 mx-auto'>
                DIV
            </div>
            <div className='bg-red-400'>
                DIV2
            </div>
        </div>
    )
}

export default upload
