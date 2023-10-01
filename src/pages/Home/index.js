import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Home() {
	return (
		<div className={cx('wrapper')}>
			<ul>
				<li>Viken Arman - Walk With Nelson</li>
				<li>Viken Arman - Walk With Nelson</li>
				<li>Viken Arman - Walk With Nelson</li>
				<li>Viken Arman - Walk With Nelson</li>
				<li>Viken Arman - Walk With Nelson</li>
				<li>Viken Arman - Walk With Nelson</li>
			</ul>
		</div>
	);
}

export default Home;
