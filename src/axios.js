import axios from 'axios';


let baseURL = 'https://bookmarks-web.herokuapp.com/';
if (process.env.NODE_ENV === 'development') baseURL = 'http://localhost:8000';


const instance = axios.create({
  baseURL: baseURL
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
