import classNames from 'classnames/bind';
import styles from './DownloadPopper.module.scss';
import TyppyWrapper from '~/layouts/component/TyppyWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '~/Icons';
const cx = classNames.bind(styles);
function DownloadPopper() {
	return (
		<TyppyWrapper>
			<div className={cx('wrapper')}>
				<div className={cx('header')}>
					<span className={cx('header-icon')}>
						<Icon.TikTokApp />
					</span>
					<h3 className={cx('title')}>Ứng dụng Tiktok cho máy tính</h3>
				</div>
				<button className={cx('download')}>Tải về</button>
				<span className={cx('footer')}>
					Thay vào đó, tải ứng dụng di động về
					<FontAwesomeIcon icon={faChevronRight} className={cx('footer-icon')} />
				</span>
			</div>
		</TyppyWrapper>
	);
}

export default DownloadPopper;
