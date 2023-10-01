import { User, Favorite, Coin, Setting, Logout } from '~/Icons';
import menuHeader from './menuHeader';

const menuHeaderUser = [
	{
		icon: User,
		title: 'Xem hồ sơ',
		href: 'https://www.tiktok.com/live/creators/vi-VN/?enter_from=more&lang=vi-VN&region=VN',
	},
	{
		icon: Favorite,
		title: 'Yêu thích',
		href: 'https://www.tiktok.com/live/creators/vi-VN/?enter_from=more&lang=vi-VN&region=VN',
	},
	{
		icon: Coin,
		title: 'Nhận xu',
		to: '/coin',
	},
	{
		icon: Setting,
		title: 'Cài đặt',
		to: '/setting',
	},
	...menuHeader,
	{
		icon: Logout,
		title: 'Đăng xuất',
		onClick: true,
		separator: true,
	},
];

export default menuHeaderUser;
