import request from '~/utils/request';

export const updateUser = async (info) => {
	try {
		console.log('upload file', info);
		const response = await request.post(`auth/me?`, info, {
			params: {
				_method: 'PATCH',
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data.data;
	} catch (e) {
		return null;
	}
};
