import { useState, useContext } from 'react';
import classNames from 'classnames/bind';

import { Icon } from '~/Icons';
import { AuthContext } from '~/context/AuthProvider';
import Phone from '../components/Phone';
import Email from '../components/Email';
import styles from '../../AuthModal.module.scss';
import { closeModalContext } from '~/context/CloseLoginModalProvider';

const cx = classNames.bind(styles);

function Logout() {
	const [option, setOption] = useState({ select: 'phone' });
	const modalHandler = useContext(closeModalContext);

	function handleChoose(e) {
		e.preventDefault();
		const selectedOption = e.target.id;
		setOption({ select: selectedOption });
	}

	return (
		<>
			<header className={cx('header')}>
				<span className={cx('title')}>Đăng ký TikTok</span>
				<span className={cx('clear-button')} onClick={modalHandler.handleClose}>
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
						Email
					</button>
				</div>
			</header>
			<div className={cx('input-field')}>
				{option.select === 'phone' ? <Phone /> : <Email />}
			</div>
		</>
	);
}

export default Logout;
