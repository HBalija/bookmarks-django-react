import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

const token = localStorage.getItem('access_token');
if (token) instance.defaults.headers.common['Authorization'] = `JWT ${token}`;

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
