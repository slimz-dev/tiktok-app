import request from '~/utils/request';

export const user = async (data) => {
	const response = await request.post('auth/login', data);
	return response.data;
};
