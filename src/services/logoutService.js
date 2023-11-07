import request from '~/utils/request';

export const logOut = async (token) => {
	try {
		const userToken = token.trim();
		//Logout
		await request.post('auth/logout', {
			Authorization: {
				Type: 'Bearer Token',
			},
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		});
		return undefined;
	} catch (e) {
		console.log('token', token);
		console.log(e);
	}
};
