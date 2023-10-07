import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from '../../AuthModal.module.scss';

import { AuthContext } from '~/context/AuthProvider';
import { Icon } from '~/Icons';
import Phone from '../components/Phone';
import Email from '../components/Email';
import Qr from './Qr';

const cx = classNames.bind(styles);

function Login() {
	const [option, setOption] = useState({ select: 'phone' });
	const Auth = useContext(AuthContext);
	function handleChoose(e) {
		e.preventDefault();
		const selectedOption = e.target.id;
		setOption({ select: selectedOption });
	}

	function handleClose() {
		Auth.setAuth(false);
		document.body.style.overflow = 'auto';
	}
	return (
		<>
			<header className={cx('header')}>
				<span className={cx('title')}>Đăng nhập vào Tiktok</span>
				<span className={cx('clear-button')} onClick={handleClose}>
					<Icon.ClearButton width="32px" height="32px" />
				</span>
				<div className={cx('log-container')}>
					<button
						id="phone"
						className={cx('log-option', {
							active: option.select === 'phone',
						})}
						onClick={(e) => handleChoose(e)}
					>
						Điện thoại
					</button>
					<button
						id="email"
						className={cx('log-option', {
							active: option.select === 'email',
						})}
						onClick={(e) => handleChoose(e)}
					>
						Email / Tiktok ID
					</button>
					<button
						id="qr"
						className={cx('log-option', {
							active: option.select === 'qr',
						})}
						onClick={(e) => handleChoose(e)}
					>
						Mã QR
					</button>
				</div>
			</header>
			<div className={cx('input-field')}>
				{option.select === 'phone' ? (
					<Phone />
				) : option.select === 'email' ? (
					<Email />
				) : (
					<Qr />
				)}
			</div>
		</>
	);
}

export default Login;
