import React from 'react';
import { useState, useContext } from 'react';
import ReactSwitch from 'react-switch';
import classNames from 'classnames/bind';

import { Theme } from '~/components/ThemeProvider';
import { UserContext } from '~/components/UserContext';
import styles from './MenuItems.module.scss';
import TyppyWrapper from '~/layouts/component/TyppyWrapper';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon';

const cx = classNames.bind(styles);

function check(data) {
	if (!Array.isArray(data)) {
		return data.content;
	} else {
		return data;
	}
}

function MenuItems({ data }) {
	const themeContext = useContext(Theme);
	const userContext = useContext(UserContext);
	const [menu, setMenu] = useState([data]);
	const menuRender = menu[menu.length - 1];
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
										if (menu.title === 'Đăng xuất') {
											userContext.setUser(false);
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
