import { faClose, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

//hooks
import useClassName from '~/hooks/useClassName';

//CSS
import styles from './VideoRender.module.scss';

function VideoRender({ file }) {
	const vidRef = useRef();
	const [isPaused, setIsPaused] = useState(true);
	const cx = useClassName(styles);

	function handlePlay(e) {
		if (e.target.paused) {
			console.log(e.target);
			setIsPaused(false);
		} else {
			setIsPaused(true);
		}
	}

	function handlePlayButton() {
		vidRef.current.play();
		setIsPaused(false);
	}

	function handleBack() {
		window.history.go(-1);
	}
	return (
		<div className={cx('video-container')}>
			<video className={cx('video')}>
				<source src={file} />
			</video>
			<video
				className={cx('video-play')}
				controls
				ref={vidRef}
				onClick={(e) => handlePlay(e)}
			>
				<source src={file} />
			</video>
			{isPaused ? (
				<span className={cx('button-play')} onClick={handlePlayButton}>
					<FontAwesomeIcon icon={faPlay} />
				</span>
			) : (
				''
			)}
			<span className={cx('exit-button')} onClick={handleBack}>
				<FontAwesomeIcon icon={faClose} />
			</span>
		</div>
	);
}

export default VideoRender;
