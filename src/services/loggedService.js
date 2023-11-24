import request from '~/utils/request';

export const logged = async () => {
	try {
		const response = await request.get('auth/me', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response.data;
	} catch (e) {
		return null;
	}
};
