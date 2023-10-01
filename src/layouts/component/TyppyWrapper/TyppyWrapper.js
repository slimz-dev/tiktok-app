import classNames from 'classnames/bind';
import styles from './TyppyWrapper.module.scss';

const cx = classNames.bind(styles);
function TyppyWrapper({ children }) {
	return <div className={cx('wrapper')}>{children}</div>;
}

export default TyppyWrapper;
