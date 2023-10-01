import * as request from '~/utils/request';

export const search = async (query, type = 'less') => {
	const res = await request.get('users/search', {
		params: {
			q: query,
			type,
		},
	});
	return res;
};
