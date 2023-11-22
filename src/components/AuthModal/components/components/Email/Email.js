import { useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Theme } from '~/context/ThemeProvider';
import { AuthContext } from '~/context/AuthProvider';
import { UserContext } from '~/context/UserProvider';
import { RegisterContext } from '~/context/RegisterProvider';
import { userLogin } from '~/services/userService';
import { userRegistration } from '~/services/registerService';
import styles from './Email.module.scss';

const cx = classNames.bind(styles);

function Email() {
	const userCookie = useContext(UserContext);
	const Auth = useContext(AuthContext);
	const themeContext = useContext(Theme);
	const [data, setData] = useState({ email: '', password: '' });
	const [isSubmit, setIsSubmit] = useState(false);
	const register = useContext(RegisterContext);
	const submitButton = register === false ? 'Đăng nhập' : 'Tiếp';

	useEffect(() => {
		if (isSubmit && data.type === 'email') {
			const registrationFetch = async () => {
				try {
					const res = await userRegistration(data);
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
						theme: themeContext.theme,
					});
				}
			};
			registrationFetch();
		} else if (isSubmit) {
			const fetchUser = async () => {
				try {
					toast('Đăng nhập thành công', {
						icon: '🚀',
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
						theme: themeContext.theme,
					});
					const result = await userLogin(data);
					userCookie.setToken(result.token);
					userCookie.setLoggedIn(true);
				} catch (err) {
					let errMsg;
					if (err.response?.status === 401) {
						errMsg = 'Đăng nhập có lỗi !';
					} else if (err.response?.status === 422) {
						errMsg = 'Vui lòng nhập đúng email';
					} else {
						console.log(err);
					}
					toast(errMsg, {
						icon: '🚀',
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
						theme: themeContext.theme,
					});
				}
			};
			fetchUser();
		}
		setIsSubmit(false);
	}, [data, isSubmit, themeContext.theme, userCookie, Auth]);
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
		} else if (Object.values(data).every((data) => data !== '')) {
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
