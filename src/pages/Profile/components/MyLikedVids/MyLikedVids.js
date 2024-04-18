import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useClassName from '~/hooks/useClassName';
import { getLikedVideo } from '~/services/Videos/getLikedVideoService';
import styles from './MyLikedVids.module.scss';
function MyLikedVids({ id }) {
	const [vid, setVid] = useState([]);
	useEffect(() => {
		const getLikedVids = async () => {
			const result = await getLikedVideo(id);
			setVid(result);
		};
		getLikedVids();
	}, [id]);
	const vidRef = useRef([]);
	const cx = useClassName(styles);
	function handlePlayVideo(index) {
		vidRef.current[index].play();
	}
	function handlePauseVideo(index) {
		if (vidRef.current[index] !== null) {
			vidRef.current[index].pause();
		}
	}
	return (
		<div className={cx('wrapper')}>
			<span className={cx('video-label')}>Videos</span>
			<div className={cx('video-container')}>
				{vid
					? vid.map((video, index) => {
							return (
								<Link
									to={`video/${video.id}`}
									className={cx('video-list')}
									key={video.id}
									onMouseEnter={() => handlePlayVideo(index)}
									onMouseLeave={() => handlePauseVideo(index)}
								>
									<div className={cx('video-content')}>
										<video
											className={cx('video')}
											ref={(e) => (vidRef.current[index] = e)}
											muted={true}
										>
											<source src={video.file_url} type="video/mp4" />
										</video>
										<div className={cx('video-likes')}>
											<FontAwesomeIcon icon={faThumbsUp} />
											<span className={cx('likes-count')}>
												{video.likes_count}
											</span>
										</div>
									</div>
									<span className={cx('video-description')}>
										{video.description}
									</span>
								</Link>
							);
					  })
					: ''}
			</div>
		</div>
	);
}

export default MyLikedVids;
