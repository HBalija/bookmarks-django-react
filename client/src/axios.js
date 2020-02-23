import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

const tokenData = JSON.parse(localStorage.getItem('bookmarksData'));
if (tokenData) instance.defaults.headers.common['Authorization'] = `JWT ${tokenData.accessToken}`;

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
