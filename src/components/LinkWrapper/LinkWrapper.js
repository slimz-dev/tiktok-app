import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LinkWrapper.module.scss';
const cx = classNames.bind(styles);

function LinkWrapper({ children }) {
	return <div className={cx('link-container')}>{children}</div>;
}
LinkWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};
export default LinkWrapper;
