import classNames from 'classnames/bind';
import styles from './Qr.module.scss';

const cx = classNames.bind(styles);

function Qr() {
	return (
		<div className={cx('wrapper')}>
			<img
				src="https://seeklogo.com/images/Q/qr-code-logo-27ADB92152-seeklogo.com.png"
				alt="qr"
				height="170"
				width="170"
				style={{
					height: '170px',
					width: '170px',
					borderRadius: '11px',
					background: 'rgb(255, 255, 255)',
					padding: '12px',
				}}
			></img>
			<div className={cx('qr-step')}>
				<div className={cx('step')}>1. Quét bằng máy ảnh trên thiết bị di động của bạn</div>
				<div className={cx('step')}>2. Xác nhận đăng nhập hoặc đăng ký</div>
			</div>
		</div>
	);
}

export default Qr;
