import classNames from 'classnames/bind';
import styles from './FooterLink.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function FooterLink({ data }) {
	function check(data) {
		if (!Array.isArray(data)) {
			return data.content;
		} else {
			return data;
		}
	}

	return (
		<>
			{data.title ? <span className={cx('link-title')}>{data.title}</span> : ''}
			<ul className={cx('link-list')}>
				{check(data).map((link, index) => (
					<li className={cx('link-current')} key={index}>
						<a href={link.href}>{link.title}</a>
					</li>
				))}
			</ul>
		</>
	);
}
FooterLink.propTypes = {
	data: PropTypes.any.isRequired,
};
export default FooterLink;
