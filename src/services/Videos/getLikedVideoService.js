import request from '~/utils/request';

export const getLikedVideo = async (userId) => {
	try {
		const response = await request.get(`users/${userId}/liked-videos`);
		return response.data.data;
	} catch (e) {
		return null;
	}
};
