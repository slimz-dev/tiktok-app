import request from '~/utils/request';

export const likeComment = async (commentId, state) => {
	let action = 'like';
	if (state) {
		action = 'unlike';
	}
	try {
		const response = await request.post(`comments/${commentId}/${action}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response.data.data;
	} catch (e) {
		return null;
	}
};
