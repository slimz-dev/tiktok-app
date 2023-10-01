import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './AuthModal.module.scss';
import { AuthContext } from '~/components/AuthProvider';
import { Icon } from '~/Icons';
import Phone from './Phone';
import Email from './Email';
import Qr from './Qr';
const cx = classNames.bind(styles);

function AuthModal() {
	const Auth = useContext(AuthContext);
	const [option, setOption] = useState({ select: 'phone' });

	function handleChoose(e) {
		e.preventDefault();
		const selectedOption = e.target.id;
		setOption({ select: selectedOption });
	}

	function handleClose() {
		Auth.setAuth(false);
		document.body.style.overflow = 'scroll';
	}

	return (
		<div className={cx('wrapper')}>
			<form className={cx('content')}>
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
				<footer className={cx('footer')}>
					<div className={cx('method-title')}>
						<div className={cx('split-line')}></div>
						<span className={cx('des')}>Hoặc tiếp tục với</span>
						<div className={cx('split-line')}></div>
					</div>
					<div className={cx('method-wrapper')}>
						<button className={cx('method')}>
							<span className={cx('method-icon')}>
								<Icon.Facebook width="20px" height="20px" />
							</span>
							Tiếp tục với Facebook
						</button>
						<button className={cx('method')}>
							<span className={cx('method-icon')}>
								<Icon.Google width="20px" height="20px" />
							</span>
							Tiếp tục với Google
						</button>
					</div>
					<div className={cx('description')}>
						Bằng cách tiếp tục, bạn đồng ý với{' '}
						<a href="https://www.tiktok.com/legal/page/row/terms-of-service/vi">
							Điều khoản sử dụng
						</a>{' '}
						của Tiktok và xác nhận rằng bạn đã đọc hiểu{' '}
						<a href="https://www.tiktok.com/legal/page/row/privacy-policy/vi">
							Chính sách Quyền riêng tư
						</a>{' '}
						của TikTok.
					</div>
					<div className={cx('logout-transfer')}>
						Bạn không có tài khoản?
						<button>Đăng ký</button>
					</div>
				</footer>
			</form>
		</div>
	);
}

export default AuthModal;
