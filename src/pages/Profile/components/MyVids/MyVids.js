import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useClassName from '~/hooks/useClassName';
import styles from './MyVids.module.scss';
function MyVids({ vid }) {
	const vidRef = useRef([]);
	const [errorVids, setErrorVids] = useState([]);
	const cx = useClassName(styles);
	function handlePlayVideo(index) {
		if (!errorVids.includes(index)) {
			vidRef.current[index].play();
		}
	}
	function handlePauseVideo(index) {
		if (vidRef.current[index] !== null && !errorVids.includes(index)) {
			vidRef.current[index].pause();
		}
	}
	function handleError(index) {
		setErrorVids((prev) => [...prev, index]);
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
											onError={() => handleError(index)}
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

export default MyVids;
