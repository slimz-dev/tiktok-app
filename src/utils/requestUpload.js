import axios from 'axios';

const requestUpload = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

requestUpload.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
export default requestUpload;
