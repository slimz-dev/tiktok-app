import classNames from 'classnames/bind';
import styles from './Phone.module.scss';

const cx = classNames.bind(styles);

function Phone() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('phone')}>
				<select defaultValue="vn">
					<option value="alba">Alabania +355</option>
					<option value="af">Afghanistan +93</option>
					<option value="al">Algeria +213</option>
					<option value="br">Brazil +55</option>
					<option value="me">Mexico +52</option>
					<option value="nep">Nepal +977</option>
					<option value="vn">VN +84</option>
					<option value="us">United State +1</option>
					<option value="uk">United Kingdom +44</option>
				</select>
				<input placeholder="Số điện thoại" />
			</div>
			<div className={cx('phone-code')}>
				<input placeholder="Nhập mã gồm 6 chữ số" />
				<button className={cx({ disabled: '2' })}>Gửi mã</button>
			</div>
			<span className={cx('change-to-password')}>Đăng nhập với mật khẩu</span>
			<button className={cx('login')}>Đăng nhập</button>
		</div>
	);
}

export default Phone;
