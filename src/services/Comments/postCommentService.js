import request from '~/utils/request';

export const postComment = async (uuid, content) => {
	try {
		const response = await request.post(
			`videos/${uuid}/comments`,
			{
				comment: content,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);
		return response.data.data;
	} catch (e) {
		return null;
	}
};
