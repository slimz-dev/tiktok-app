import request from '~/utils/request';

export const logged = async (token) => {
	try {
		const response = await request.get('auth/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (e) {
		console.log(e);
		return false;
	}
};
