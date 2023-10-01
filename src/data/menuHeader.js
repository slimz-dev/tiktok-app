import { Icon } from '~/Icons';
import languages from './languages';

const menuHeader = [
	{
		icon: Icon.Lightbulb,
		title: 'Trung tâm Nhà sáng tạo LIVE',
		href: 'https://www.tiktok.com/live/creators/vi-VN/?enter_from=more&lang=vi-VN&region=VN',
	},
	{
		icon: Icon.Language,
		title: 'Tiếng Việt',
		children: {
			isChildren: true,
			icon: Icon.LeftArrow,
			title: 'Language',
			styles: {
				width: '223px',
				fontSize: '14px',
				maxHeight: '590px',
				overflow: 'auto',
			},
			content: [...languages],
		},
	},
	{
		icon: Icon.Question,
		title: 'Phản hồi và trợ giúp',
		to: '/QA',
	},
	{
		icon: Icon.Keyboard,
		title: 'Phím tắt trên bàn phím',
		to: '/keyboard',
	},
	{
		icon: Icon.Night,
		title: 'Chế độ tối',
	},
];

export default menuHeader;
