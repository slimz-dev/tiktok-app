import { Icon } from '~/Icons';
import menuHeader from './menuHeader';

const menuHeaderUser = [
	{
		icon: Icon.User,
		title: 'Xem hồ sơ',
		href: 'https://www.tiktok.com/live/creators/vi-VN/?enter_from=more&lang=vi-VN&region=VN',
	},
	{
		icon: Icon.Favorite,
		title: 'Yêu thích',
		href: 'https://www.tiktok.com/live/creators/vi-VN/?enter_from=more&lang=vi-VN&region=VN',
	},
	{
		icon: Icon.Coin,
		title: 'Nhận xu',
		to: '/coin',
	},
	{
		icon: Icon.Setting,
		title: 'Cài đặt',
		to: '/setting',
	},
	...menuHeader,
	{
		icon: Icon.Logout,
		title: 'Đăng xuất',
		onClick: true,
		separator: true,
	},
];

export default menuHeaderUser;
