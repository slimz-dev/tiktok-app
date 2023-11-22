import axios from 'axios';

const request = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default request;
