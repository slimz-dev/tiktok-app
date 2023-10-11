import request from '~/utils/request';

export const logOut = async (token) => {
	try {
		const userToken = token.trim();
		const response = await request.post('auth/logout', {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		});
		return response;
	} catch (e) {
		console.log(e);
	}
};
