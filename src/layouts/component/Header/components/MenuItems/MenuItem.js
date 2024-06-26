import React from 'react';
import { useState, useContext, useEffect } from 'react';
import ReactSwitch from 'react-switch';
import classNames from 'classnames/bind';

import { Theme } from '~/context/ThemeProvider';
import { UserContext } from '~/context/UserProvider';
import { logOut } from '~/services/Auth/logoutService';
import styles from './MenuItems.module.scss';
import TyppyWrapper from '~/layouts/component/TyppyWrapper';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function check(data) {
	if (!Array.isArray(data)) {
		return data.content;
	} else {
		return data;
	}
}

function MenuItems({ thisUser, data }) {
	const navigate = useNavigate();
	const themeContext = useContext(Theme);
	const userContext = useContext(UserContext);
	const [isLogout, setIsLogout] = useState(false);
	const [menu, setMenu] = useState([data]);
	const menuRender = menu[menu.length - 1];
	useEffect(() => {
		if (isLogout === true) {
			const logOutApi = async () => {
				const response = await logOut();
				if (response === undefined) {
					userContext.setLoggedIn(false);
				}
				window.location.reload();
			};
			logOutApi();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogout]);

	return (
		<TyppyWrapper>
			<div className={cx('typpy-menu')}>
				<div
					className={cx('menu-wrapper', {
						'menu-children': menuRender.isChildren,
					})}
					onMouseLeave={() => {
						if (menuRender.isChildren) {
							setMenu([data]);
						}
					}}
				>
					{menuRender.isChildren ? (
						<div className={cx('menu-title')}>
							<span
								onClick={() => {
									setMenu((prev) => {
										const newArray = [...prev];
										return newArray.slice(0, newArray.length - 1);
									});
								}}
							>
								<Icon>{menuRender.icon}</Icon>
							</span>
							<span className={cx('title')}>{menuRender.title}</span>
						</div>
					) : (
						''
					)}
					<div className={cx('menu-content')} style={menuRender.styles}>
						{check(menuRender).map((menu, index) => (
							<Button key={index} to={menu.to} href={menu.href}>
								<div
									className={cx('menu-slot', {
										'separator-line': menu.separator,
									})}
									onClick={() => {
										if (menu.title === 'Xem hồ sơ') {
											navigate(`/@${thisUser}`);
										}
										if (menu.title === 'Đăng xuất') {
											setIsLogout(true);
										}
										if (menu.children) {
											setMenu((prev) => {
												return [...prev, menu.children];
											});
										}
									}}
								>
									{menu.icon ? (
										<Icon width="20px" height="20px">
											{menu.icon}
										</Icon>
									) : (
										''
									)}
									<span className={cx('menu-name')}>{menu.title}</span>
									{menu.title === 'Chế độ tối' ? (
										<ReactSwitch
											onChange={() => {
												themeContext.toggleTheme();
											}}
											checked={themeContext.theme === 'dark'}
											height={20}
											width={40}
											uncheckedIcon={false}
											checkedIcon={false}
											offColor="#808080"
										/>
									) : (
										''
									)}
								</div>
							</Button>
						))}
					</div>
				</div>
			</div>
		</TyppyWrapper>
	);
}

export default MenuItems;
