import classNames from 'classnames/bind';
import styles from './Email.module.scss';

const cx = classNames.bind(styles);

function Email() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('login-container')}>
				<input placeholder="Email hoặc TikTok ID" />
				<input placeholder="Mật khẩu" />
			</div>
			<span className={cx('forgot-password')}>Quên mật khẩu?</span>
			<button className={cx('login')}>Đăng nhập</button>
		</div>
	);
}

export default Email;
