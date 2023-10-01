import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Authenticator.module.scss';
import Phone from './Phone';
import Email from './Email';
import Qr from './Qr';
const cx = classNames.bind(styles);

function Authenticator() {
	const [option, setOption] = useState({ select: 'phone' });

	function handleChoose(e) {
		e.preventDefault();
		const selectedOption = e.target.id;
		setOption({ select: selectedOption });
	}

	return (
		<form className={cx('wrapper')}>
			<div className={cx('content')}>
				<div className={cx('header')}>
					<span className={cx('title')}>Đăng nhập vào Tiktok</span>
					<span>X</span>
					<button
						id="phone"
						className={cx('log-option')}
						onClick={(e) => handleChoose(e)}
					>
						Điện thoại
					</button>
					<button
						id="email"
						className={cx('log-option')}
						onClick={(e) => handleChoose(e)}
					>
						Email / Tiktok ID
					</button>
					<button id="qr" className={cx('log-option')} onClick={(e) => handleChoose(e)}>
						Mã QR
					</button>
				</div>
				<div className={cx('input-field')}>
					{option.select === 'phone' ? (
						<Phone />
					) : option.select === 'email' ? (
						<Email />
					) : (
						<Qr />
					)}
				</div>
				<div className={cx('footer')}>
					<div className={cx('method-title')}>
						<div></div>
						<span>Hoặc tiếp tục với</span>
						<div></div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default Authenticator;
