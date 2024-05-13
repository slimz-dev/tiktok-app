import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//CSS
import useClassName from '~/hooks/useClassName';
import styles from './Video.module.scss';

//API
import { getVideo } from '~/services/Videos/getVideoService';
import { getComment } from '~/services/Comments/getCommentService';

//Components
import VideoRender from './components/VideoRender';
import InfoRender from './components/InfoRender';

function Video() {
	const cx = useClassName(styles);
	const id = useParams();
	const [video, setVideo] = useState({});
	const [commentList, setCommentList] = useState([]);
	useEffect(() => {
		const renderVideo = async () => {
			const videoId = id.videoId;
			const result = await getVideo(videoId);
			setVideo(result);
		};
		const renderComment = async () => {
			const videoId = id.videoId;
			const result = await getComment(videoId);
			setCommentList(result);
		};
		renderVideo();
		renderComment();
	}, []);
	function checkVideo(video) {
		if (Object.keys(video).length !== 0) {
			return true;
		} else {
			return false;
		}
	}
	return (
		<>
			{checkVideo(video) ? (
				<div className={cx('wrapper')}>
					<VideoRender file={video.file_url} />
					<InfoRender thisInfo={video} thisComment={commentList} />
				</div>
			) : (
				''
			)}
		</>
	);
}

export default Video;
