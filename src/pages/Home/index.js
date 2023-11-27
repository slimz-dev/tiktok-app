import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import PageProvider from './context/PageContext';
import { videoList } from '~/services/videoService';
import Video from './component/Video';

const cx = classNames.bind(styles);

function Home() {
	const [vid, setVid] = useState([]);
	const [page, setPage] = useState(1);
	const data = {
		page: {
			page,
			setPage,
		},
	};
	useEffect(() => {
		const fetchVideo = async () => {
			try {
				const result = await videoList(page);
				setVid((prev) => [...prev, ...result.data]);
			} catch (e) {
				console.log(e);
			}
		};
		fetchVideo();
	}, [page]);

	return (
		<div className={cx('wrapper')}>
			<PageProvider value={data}>
				<Video arrayList={vid} />
			</PageProvider>
		</div>
	);
}

export default Home;
