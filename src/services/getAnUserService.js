import request from '~/utils/request';

export const getUser = async (userName) => {
	try {
		const response = await request.get(`users/${userName}`);
		return response.data.data;
	} catch (e) {
		return null;
	}
};
