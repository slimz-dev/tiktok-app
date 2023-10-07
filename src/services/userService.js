import request from '~/utils/request';

export const userLogin = async (data) => {
	const userData = {
		...data,
	};
	const response = await request.post('auth/login', userData, { withCredentials: true });
	// console.log('from service', response);
	return response.data;
};
