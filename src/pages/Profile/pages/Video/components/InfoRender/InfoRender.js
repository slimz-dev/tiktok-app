import { useContext, useEffect, useRef, useState } from 'react';

//css
import useClassName from '~/hooks/useClassName';
import styles from './InfoRender.module.scss';

//component
import CommentRender from '../commentRender';
import InfoHeader from './components/InfoHeader';
import InfoContent from './components/InfoContent';
import { postComment } from '~/services/Comments/postCommentService';
import { closeModalContext } from '~/context/CloseLoginModalProvider';
import AuthModal from '~/components/AuthModal';
import { UserContext } from '~/context/UserProvider';

// in your react component

function InfoRender({ thisInfo, thisComment }) {
	const [view, setView] = useState(true);
	const logged = useContext(UserContext);
	const modalHandler = useContext(closeModalContext);
	const [commentData, setCommentData] = useState([]);
	const inputRef = useRef();
	const cx = useClassName(styles);
	useEffect(() => {
		setCommentData(thisComment);
	}, [thisComment]);
	function handlePostComment() {
		const comment = inputRef.current.value;
		if (logged.loggedIn) {
			if (comment) {
				const postingComment = async () => {
					const result = await postComment(thisInfo.uuid, comment);
					setCommentData((prev) => {
						inputRef.current.value = '';
						return [result, ...thisComment];
					});
				};
				postingComment();
			}
		} else {
			modalHandler.handleOpen();
		}
	}

	return (
		<div className={cx('wrapper')}>
			<div className={cx('video-info')}>
				<InfoHeader thisInfo={thisInfo} />
				<div className={cx('content')}>
					<InfoContent thisInfo={thisInfo} view={view} />
					{view && thisComment ? (
						<CommentRender data={commentData} commentHandler={setCommentData} />
					) : (
						''
					)}
				</div>
			</div>
			<div className={cx('input-container')}>
				<input className={cx('input')} placeholder="Add comment..." ref={inputRef} />
				<div className={cx('post-button')} onClick={handlePostComment}>
					Post
				</div>
			</div>
			{modalHandler.isOpen ? <AuthModal /> : ''}
		</div>
	);
}

export default InfoRender;
