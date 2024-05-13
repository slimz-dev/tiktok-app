import request from '~/utils/request';

export const deleteVid = async (id) => {
	try {
		const response = await request.delete(`videos/${id}`);
		return response.data.data;
	} catch (e) {
		return null;
	}
};
