import axios from 'axios';
import { DEV_API } from './index.js';

const client = axios.create({
    baseURL: DEV_API,
    withCredentials: true
    
});

export default client;