import request from '~/utils/request';

export const userLogin = async (data) => {
	const response = await request.post('auth/login', data);
	const userToken = response.data.meta.token;
	await request.get('auth/me', {
		headers: {
			Authorization: `Bearer ${userToken}`,
		},
	});
	return {
		token: userToken,
	};
};
