import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { Icon } from '~/Icons';
import config from '~/config';
const cx = classNames.bind(styles);
function Sidebar() {
	return (
		<nav className={cx('wrapper')}>
			<ul className={cx('nav-container')}>
				<NavLink
					to={config.routes.Home[0]}
					className={({ isActive }) =>
						cx('slot-container', {
							active: isActive,
						})
					}
				>
					<Icon.HomeIcon />
					<span className={cx('title')}>Dành cho bạn</span>
				</NavLink>
				<NavLink
					to={config.routes.Following}
					className={({ isActive }) =>
						cx('slot-container', {
							active: isActive,
						})
					}
				>
					<Icon.Contact />
					<span className={cx('title')}>Đang Follow</span>
				</NavLink>
				<NavLink
					to={config.routes.Unknown}
					className={({ isActive }) =>
						cx('slot-container', {
							active: isActive,
						})
					}
				>
					<Icon.Explore />
					<span className={cx('title')}>Khám phá</span>
				</NavLink>
				<NavLink
					to={config.routes.Unknown}
					className={({ isActive }) =>
						cx('slot-container', {
							active: isActive,
						})
					}
				>
					<Icon.Live />
					<span className={cx('title')}>LIVE</span>
				</NavLink>
			</ul>
			<div className={cx('login-box')}>
				<p className={cx('comment')}>
					Đăng nhập để follow các tác giả, thích video và xem bình luận.
				</p>
				<button className={cx('login')}>Đăng nhập</button>
				<div className={cx('placeholder')}></div>
			</div>
			<footer className={cx('footer')}>
				<div className={cx('footer-link')}>
					<a href="#a">Giới thiệu</a>
					<a href="a">Bảng tin</a>
					<a href="a">Liên hệ</a>
					<br />
					<a href="a">Sự nghiệp</a>
				</div>
				<div className={cx('footer-link')}>
					<a href="a">TikTok for Good</a>
					<a href="a">Quảng cáo</a>
					<a href="a">Developers</a>
					<a href="a">Minh bạch</a>
					<br />
					<a href="a">TikTok Rewards</a>
					<a href="a">TikTok Embeds</a>
				</div>
				<div className={cx('footer-link')}>
					<a href="a">Trợ giúp</a>
					<a href="a">An toàn</a>
					<a href="a">Điều khoản</a>
					<br />
					<a href="a">Quyền riêng tư</a>
					<br />
					<a href="a">Cổng thông tin tác giả</a>
					<br />
					<a href="a">Hướng dẫn cộng đồng</a>
				</div>
				<div className={cx('footer-link')}>
					<a href="a">Thêm</a>
				</div>
				<a href="a">© 2023 TikTok</a>
			</footer>
		</nav>
	);
}

export default Sidebar;
