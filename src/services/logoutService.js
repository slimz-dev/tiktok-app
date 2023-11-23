import request from '~/utils/request';

export const logOut = async (token) => {
	try {
		//Logout
		await request.post('auth/logout');
		return undefined;
	} catch (e) {
		console.log('token', token);
		console.log(e);
	}
};
