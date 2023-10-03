import { useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterContext } from '~/components/AuthModal/components/RegisterProvider';
import { registration } from '~/services/registerService';
import styles from './Email.module.scss';

const cx = classNames.bind(styles);

function Email() {
	const [data, setData] = useState({ email: '', password: '' });
	const [isSubmit, setIsSubmit] = useState(false);
	const register = useContext(RegisterContext);
	const submitButton = register === false ? 'Đăng nhập' : 'Tiếp';

	useEffect(() => {
		if (isSubmit && data.type === 'email') {
			const registrationFetch = async () => {
				try {
					const res = await registration(data);
					console.log('respone: ', res);
				} catch (err) {
					let errorMsg;
					if (err.response.status === 409) {
						errorMsg = 'Tài khoản này đã được đăng ký';
					} else if (err.response.status === 422) {
						const error = JSON.parse(err.response.request.responseText).errors;
						if (error.hasOwnProperty('password')) {
							errorMsg = 'Mật khẩu phải đủ 6 kí tự trở lên';
						} else {
							errorMsg = 'Email không họp lệ';
						}
					}
					toast(errorMsg, {
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
				}
			};
			setIsSubmit(false);
			registrationFetch();
		}
	}, [data, isSubmit]);
	function handleChange(e) {
		const key = e.target.id;
		const value = e.target.value;
		setData((prev) => ({ ...prev, [key]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (register && Object.values(data).every((data) => data !== '')) {
			setData((prev) => ({
				type: 'email',
				...prev,
			}));
			setIsSubmit(true);
		}
	}
	return (
		<div className={cx('wrapper')}>
			<div className={cx('login-container')}>
				<input
					value={data.email}
					onChange={(e) => handleChange(e)}
					id="email"
					placeholder="Email hoặc TikTok ID"
				/>
				<input
					value={data.password}
					onChange={(e) => handleChange(e)}
					id="password"
					placeholder="Mật khẩu"
				/>
			</div>
			<span className={cx('forgot-password')}>Quên mật khẩu?</span>
			<button
				className={cx('login', {
					active:
						Object.values(data).length >= 2 &&
						Object.values(data).every((data) => data !== ''),
				})}
				onClick={(e) => handleSubmit(e)}
			>
				{submitButton}
			</button>
			<ToastContainer />
		</div>
	);
}

export default Email;
