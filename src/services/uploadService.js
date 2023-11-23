import requestUpload from '~/utils/requestUpload';
import { toast } from 'react-toastify';
export const uploadVid = async (data) => {
	try {
		const res = await requestUpload.post('videos', data);
		return res;
	} catch (err) {
		return err;
	}
};
requestUpload.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err.response.status === 422) {
			toast('Có lỗi khi nhập dữ liệu ..');
		} else if (err.response.status === 413) {
			toast('Dung lượng video quá lớn, xin hãy chọn video khác !');
		}
		return err;
	}
);

// requestUpload.interceptors.request.use(
// 	(res) => {
// 		console.log('request >>>', res);
// 	},
// 	(err) => {}
// );
