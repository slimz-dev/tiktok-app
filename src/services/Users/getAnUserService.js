import request from '~/utils/request';

export const getUser = async (userName) => {
	try {
		let response;
		if (JSON.parse(localStorage.getItem('user'))) {
			response = await request.get(`users/${userName}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')} ` },
			});
		} else {
			response = await request.get(`users/${userName}`);
		}
		return response.data.data;
	} catch (e) {
		return null;
	}
};
