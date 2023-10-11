import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Header from './Header/header';
import Sidebar from './Sidebar/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	const [visible, setVisible] = useState(false);
	function detectScroll() {
		if (window.scrollY !== 0) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', detectScroll);
		return () => {
			window.removeEventListener('scroll', detectScroll);
		};
	}, []);

	function handleScroll() {
		document.documentElement.scrollTop = 0;
	}
	return (
		<div className={cx('wrapper')}>
			<Header />
			<div className={cx('container')}>
				<Sidebar />
				<div className={cx('content')}>{children}</div>
			</div>
			{visible && (
				<span className={cx('scroll-to-top')} onClick={handleScroll}>
					<FontAwesomeIcon icon={faAnglesUp} className={cx('arrow')} />
				</span>
			)}
		</div>
	);
}

export default DefaultLayout;
