import request from '~/utils/request';

export const getVideo = async (videoId) => {
	try {
		const response = await request.get(`videos/${videoId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response.data.data;
	} catch (e) {
		return null;
	}
};
