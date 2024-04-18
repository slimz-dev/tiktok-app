import useClassName from '~/hooks/useClassName';
import styles from './InfoContent.module.scss';
function InfoContent({ thisInfo, view }) {
	const cx = useClassName(styles);
	return (
		<div className={cx('content-header-wrapper')}>
			<div className={cx('content-header')}>
				<div className={cx('title')}>
					<span
						className={cx('title-name', {
							active: view,
						})}
					>
						Comments ({thisInfo.comments_count})
					</span>
					{view ? <span className={cx('line')}></span> : ''}
				</div>
				<div className={cx('title')}>
					<span
						className={cx('title-name', {
							active: !view,
						})}
					>
						Creator videos
					</span>
					{!view ? <span className={cx('line')}></span> : ''}
				</div>
			</div>
			<span className={cx('content-line')}></span>
		</div>
	);
}

export default InfoContent;
