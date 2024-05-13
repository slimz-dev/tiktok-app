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
	const [isError, setIsError] = useState(false);
	const cx = useClassName(styles);

	function handlePlay(e) {
		if (!isError) {
			console.log('not error');
			if (e.target.paused) {
				setIsPaused(false);
			} else {
				setIsPaused(true);
			}
		}
	}

	function handlePlayButton() {
		if (!isError) {
			console.log('not error from button');
			vidRef.current.play();
			setIsPaused(false);
		}
	}

	function handleBack() {
		window.history.go(-1);
	}

	function handleError() {
		setIsError(true);
	}
	return (
		<div className={cx('video-container')}>
			<video className={cx('video')}>
				<source src={file} />
			</video>
			<video
				onError={handleError}
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
