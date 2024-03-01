import request from '~/utils/request';

export const handleFollow = async (userId, isFollow) => {
	try {
		let action = 'follow';
		if (isFollow) {
			action = 'unfollow';
		}
		const response = await request.post(`users/${userId}/${action}`);
		return response.data.data;
	} catch (e) {
		return null;
	}
};
