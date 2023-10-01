import { Language, Lightbulb, Question, Keyboard, Night, LeftArrow } from '~/Icons';
import languages from './languages';

const menuHeader = [
	{
		icon: Lightbulb,
		title: 'Trung tâm Nhà sáng tạo LIVE',
		href: 'https://www.tiktok.com/live/creators/vi-VN/?enter_from=more&lang=vi-VN&region=VN',
	},
	{
		icon: Language,
		title: 'Tiếng Việt',
		children: {
			isChildren: true,
			icon: LeftArrow,
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
		icon: Question,
		title: 'Phản hồi và trợ giúp',
		to: '/QA',
	},
	{
		icon: Keyboard,
		title: 'Phím tắt trên bàn phím',
		to: '/keyboard',
	},
	{
		icon: Night,
		title: 'Chế độ tối',
	},
];

export default menuHeader;
