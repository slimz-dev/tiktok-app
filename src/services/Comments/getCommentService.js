import request from '~/utils/request';

export const getComment = async (videoId) => {
	try {
		const response = await request.get(`videos/${videoId}/comments`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response.data.data;
	} catch (e) {
		return null;
	}
};
