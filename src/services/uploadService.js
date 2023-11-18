import requestUpload from '~/utils/requestUpload';

export const uploadVid = async (token, data) => {
	console.log(data);
	const res = await requestUpload.post('videos', {
		body: {
			description: data.description,
			upload_file: data.file,
			thumbnail_time: 5,
			viewable: data.viewable,
			allows: 'comment',
		},
	});
	return res;
};
requestUpload.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err.response.status === 401) {
			console.log('error');
			console.log(err);
		}
		return err;
	}
);
