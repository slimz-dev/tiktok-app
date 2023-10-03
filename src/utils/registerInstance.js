import axios from 'axios';

const regInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

export default regInstance;
