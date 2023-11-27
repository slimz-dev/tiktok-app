import request from '~/utils/request';

export const handleLike = async (id) => {
	try {
		let action;
		const currentVideo = await request.get(`videos/${id}`);
		if (currentVideo.data.data.is_liked) {
			action = 'unlike';
		} else {
			action = 'like';
		}
		console.log(action);
		const response = await request.post(`videos/${id}/${action}`);
		return response.data.data;
	} catch (e) {
		return null;
	}
};
