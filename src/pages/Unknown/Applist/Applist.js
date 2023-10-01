import classNames from 'classnames/bind';
import styles from './Applist.module.scss';

const cx = classNames.bind(styles);

function AppList({ data }) {
	return (
		<div className={cx('app-list')}>
			{data.map((app) => (
				<a className={cx('app-current')} href={app.link} key={app.name}>
					<img
						src={app.img}
						alt={app.name}
						className={cx({
							google: app.name === 'googleplay app',
							microsoft: app.name === 'microsoft app',
						})}
					/>
				</a>
			))}
		</div>
	);
}

export default AppList;
