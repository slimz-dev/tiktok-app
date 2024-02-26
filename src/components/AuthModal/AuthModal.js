import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './AuthModal.module.scss';
import { UserContext } from '~/context/UserProvider';

import RegisterProvider from '../../context/RegisterProvider';
import Login from './components/Login';
import Register from './components/Register';
import { Icon } from '~/Icons';

const cx = classNames.bind(styles);

function AuthModal() {
	const [register, setRegister] = useState(false);
	const transferTitle = register === false ? 'Bạn không có tài khoản?' : 'Bạn đã có tài khoản?';
	const buttonName = register === false ? 'Đăng ký' : 'Đăng nhập';
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);
	function handleChange(e) {
		e.preventDefault();
		setRegister((prev) => {
			if (prev === false) {
				return true;
			}
			return false;
		});
	}
	return (
		<div className={cx('wrapper')}>
			<RegisterProvider value={register}>
				<form className={cx('content')}>
					{register === false ? <Login /> : <Register />}
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
							{transferTitle}
							<button onClick={(e) => handleChange(e)}>{buttonName}</button>
						</div>
					</footer>
				</form>
			</RegisterProvider>
		</div>
	);
}

export default AuthModal;
