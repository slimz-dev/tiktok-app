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
