import request from '~/utils/request';

export const deleteComment = async (commentId) => {
	try {
		const response = await request.delete(`comments/${commentId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response.data.data;
	} catch (e) {
		return null;
	}
};
