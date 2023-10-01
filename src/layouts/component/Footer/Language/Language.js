import classNames from 'classnames/bind';
import styles from './Language.module.scss';

const cx = classNames.bind(styles);

const Language = ({ data }) => {
	return (
		<select className={cx('language')} defaultValue="vi-VN">
			{data.map((language) => (
				<option key={language.code} value={language.code}>
					{language.title}
				</option>
			))}
		</select>
	);
};

export default Language;
