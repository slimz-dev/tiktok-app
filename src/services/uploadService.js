import request from '~/utils/request';

export const uploadVid = async (token, data) => {
	console.log(token);
	const res = await request.post('videos', {
		Headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		Body: {
			description: data.description,
			upload_file: data.file,
			thumbnail_time: 5,
			viewable: data.viewable,
			allows: data.allows,
		},
	});
	return res;
};
