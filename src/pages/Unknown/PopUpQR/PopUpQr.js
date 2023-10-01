import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styles from './PopUpQr.module.scss';

const cx = classNames.bind(styles);

const PopUpQR = forwardRef((props, ref) => {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('include-clear-button')} onClick={(e) => e.stopPropagation()}>
				<button className={cx('clear')}>
					<FontAwesomeIcon icon={faX} />
				</button>
				<div className={cx('content')} ref={ref}>
					<div className={cx('title')}>
						Hướng máy ảnh của bạn về phía mã QR để tải về TikTok
					</div>
					<img
						src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/site/static/webapp-static-site/47624c235266dedd8e4d.png"
						alt="QR"
					/>
				</div>
			</div>
		</div>
	);
});

export default PopUpQR;
