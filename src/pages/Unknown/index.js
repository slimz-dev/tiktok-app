import { useState, useEffect, createRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Unknown.module.scss';
import config from '~/config';

import { PlayButton } from '~/Icons/Icons';
import { app } from './data';
import AppList from './Applist';
import PopUpQr from './PopUpQR';

const cx = classNames.bind(styles);

function Unknown() {
	const qrRef = createRef();
	useEffect(() => {
		function handleClickOutside(event) {
			if (qrRef.current && !qrRef.current.contains(event.target)) {
				setQrPopUp(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [qrRef]);
	const [qrPopUp, setQrPopUp] = useState(false);
	const handlePopUpQr = () => {
		setQrPopUp(true);
	};
	return (
		<div className={cx('wrapper')}>
			<div className={cx('content')}>
				<div className={cx('error-code')}>
					<div>4</div>
					<img
						src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/site/static/webapp-static-site/bbad6f99219877ac47f9.png"
						alt="smile face"
					/>
					<div>4</div>
				</div>
				<div className={cx('description')}>Không thể tìm thấy trang này</div>
				<div className={cx('other')}>
					<span>Xem những video thịnh hành khác trên TikTok</span>
					<Link
						to={
							Array.isArray(config.routes.Home)
								? config.routes.Home[0]
								: config.routes.Home
						}
					>
						<button>
							<PlayButton />
							Xem ngay
						</button>
					</Link>
				</div>
			</div>
			<div className={cx('footer')}>
				<div className={cx('app')}>
					<div className={cx('title')}>Tải về ngay</div>
					<div className={cx('app-list')}>
						<div className={cx('app-current', 'app-qr')} onClick={handlePopUpQr}>
							<img
								src="https://seeklogo.com/images/Q/qr-code-logo-27ADB92152-seeklogo.com.png"
								alt="qr code"
								className={cx('qr-img')}
							/>
							<span>QR CODE</span>
						</div>
						{qrPopUp && <PopUpQr ref={qrRef} />}
						<AppList data={app} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Unknown;
