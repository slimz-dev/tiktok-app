import axios from 'axios';

const request = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

request.interceptors.request.use(function (config) {
	request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
	return config;
});
export default request;
