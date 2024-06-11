import axios from 'axios'
import baseUrl from './baseUrl'

export default axios.create({
    baseURL: `${baseUrl}api/`,
    headers: {
        "Content-type": "application/json"
    }
})