import request from '~/utils/request';

//Login user
export const userLogin = async (data) => {
	const response = await request.post('auth/login', data);
	const userToken = response.data.meta.token;
	return {
		token: userToken,
	};
};
