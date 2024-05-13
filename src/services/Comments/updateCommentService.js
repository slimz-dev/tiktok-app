import request from '~/utils/request';

export const updateComment = async (id, content) => {
	try {
		const response = await request.patch(
			`comments/${id}`,
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
