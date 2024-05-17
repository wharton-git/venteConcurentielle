import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.88.15:8000/api/',
    headers: {
        "Content-type": "application/json"
    }

})