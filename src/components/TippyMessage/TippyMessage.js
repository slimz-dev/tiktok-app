import classNames from 'classnames/bind';
import styles from './TippyMessage.module.scss';

const cx = classNames.bind(styles);

function TippyMessage({ children, arrowPlacement }) {
	return (
		<div className={cx('typpy-css')} data-popper-placement={arrowPlacement}>
			{children}
			<div className={cx('arrow')} data-popper-arrow></div>
		</div>
	);
}

export default TippyMessage;
