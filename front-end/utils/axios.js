import axios from 'axios';

const url = 'https://dog.ceo/api';

const axiosInstance = axios.create(
    {
        baseURL: url,
        responseType: 'json',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

export default axiosInstance;

