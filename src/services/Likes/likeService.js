import request from '~/utils/request';

export const handleLike = async (id) => {
	try {
		let action;
		const currentVideo = await request.get(`videos/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		if (currentVideo.data.data.is_liked) {
			action = 'unlike';
		} else {
			action = 'like';
		}
		console.log(action);
		const response = await request.post(`videos/${id}/${action}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response.data.data;
	} catch (e) {
		return null;
	}
};
