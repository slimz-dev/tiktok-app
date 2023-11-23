import request from '~/utils/request';

export const logged = async () => {
	try {
		const response = await request.get('auth/me');
		return response.data;
	} catch (e) {
		console.log(e);
		return false;
	}
};
