import request from '~/utils/request';

export const videoList = async (page = '1', type = 'for-you') => {
	const result = await request.get('videos', {
		params: {
			type,
			page,
		},
	});
	return result.data;
};

request.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err.response.status === 401) {
			console.log('error');
		}
		return err;
	}
);
