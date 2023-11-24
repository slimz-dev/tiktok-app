/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import styles from './Header.module.scss';
import { menuHeader, menuHeaderUser } from '~/data';
import MenuItems from '~/layouts/component/Header/components/MenuItems';
import { logged } from '~/services/loggedService';
import AuthModal from '~/components/AuthModal';
import { UserContext } from '~/context/UserProvider';
import AuthProvider from '~/context/AuthProvider';
import TippyMessage from '~/components/TippyMessage';
import DownloadPopper from '~/layouts/component/Header/components/DownloadPopper';
import HeaderSearch from '~/layouts/component/Header/components/HeaderSearch';
import Img from '~/components/Img';
import { Icon } from '~/Icons';
const cx = classNames.bind(styles);

function Header() {
	const navigate = useNavigate();
	const [auth, setAuth] = useState(false);
	const userState = useContext(UserContext);
	const [avatar, setAvatar] = useState(null);
	useEffect(() => {
		const getAvatar = async () => {
			if (userState.loggedIn) {
				const result = await logged();
				console.log(result);
				if (result !== null) {
					setAvatar(result.data.avatar);
				}
			}
		};
		getAvatar();
	}, [userState.loggedIn]);

	function handleAuth() {
		setAuth(true);
	}
	function handleUpload() {
		if (userState.loggedIn) {
			navigate(config.routes.Upload);
		} else {
			handleAuth();
		}
	}

	const closeModal = {
		handleClose: () => {
			setAuth(false);
		},
	};

	return (
		<AuthProvider value={closeModal}>
			<header className={cx('wrapper')}>
				<div className={cx('wrapper-content')}>
					<Link to={config.routes.Home[0]} className={cx('header-logo')}>
						<span className={cx('logo')}>
							<Icon.Logo />
						</span>
					</Link>
					<HeaderSearch />
					<div className={cx('header-other')}>
						<button className={cx('upload-container')} onClick={handleUpload}>
							<FontAwesomeIcon icon={faPlus} className={cx('plus-icon')} />
							<span className={cx('plus')}>Tải lên</span>
						</button>
						{userState.loggedIn ? (
							<></>
						) : (
							<button className={cx('login-container')} onClick={handleAuth}>
								<span className={cx('login')}>Đăng nhập</span>
							</button>
						)}
						{userState.loggedIn ? (
							<>
								<Tippy
									offset={[-60, 22]}
									interactive
									render={(attrs) => <DownloadPopper />}
								>
									<span className={cx('download')}>
										<Icon.DownloadApp />
									</span>
								</Tippy>

								<Tippy
									interactive
									render={(attrs) => (
										<TippyMessage arrowPlacement="top">Tin nhắn</TippyMessage>
									)}
								>
									<span className={cx('message')}>
										<Icon.Message />
									</span>
								</Tippy>

								<Tippy
									interactive
									render={(attrs) => (
										<TippyMessage arrowPlacement="top">Hộp thư</TippyMessage>
									)}
								>
									<div className={cx('inbox-container')}>
										<span className={cx('inbox')}>
											<Icon.Inbox />
										</span>
										<sup className={cx('inbox-num')}>4</sup>
									</div>
								</Tippy>
								<Tippy
									hideOnClick="false"
									interactive
									placement="bottom-end"
									render={(attrs) => {
										return <MenuItems data={menuHeaderUser} />;
									}}
								>
									<div className={cx('user-avatar')}>
										<Img src={avatar} alt="avatar" />
									</div>
								</Tippy>
							</>
						) : (
							<Tippy
								hideOnClick="false"
								interactive
								placement="bottom-end"
								render={(attrs) => {
									return <MenuItems data={menuHeader} />;
								}}
							>
								<button className={cx('menu')}>
									<FontAwesomeIcon
										icon={faEllipsisVertical}
										className={cx('menu-icon')}
									/>
								</button>
							</Tippy>
						)}
					</div>
					{auth && <AuthModal />}
				</div>
			</header>
		</AuthProvider>
	);
}

export default Header;
