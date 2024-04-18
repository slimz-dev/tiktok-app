import regInstance from '~/utils/registerInstance';
import { toast } from 'react-toastify';
export const userRegistration = async (data) => {
	const res = await regInstance.post('auth/register', data);
	return res.data;
};

regInstance.interceptors.response.use(async (res) => {
	toast('Đăng ký thành công', {
		icon: '🚀',
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: 'dark',
	});
	return res;
});
