import request from '~/utils/request';

export const logOut = async () => {
	try {
		await request.post('auth/logout');
		return undefined;
	} catch (e) {
		console.log(localStorage.getItem('token'));
		console.log(e);
	}
};
