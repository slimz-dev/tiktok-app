import TimeAgo from 'react-timeago';

import en from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
//css
import useClassName from '~/hooks/useClassName';
import styles from './CommentRender.module.scss';

//Component
import Img from '~/components/Img';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { likeComment } from '~/services/Comments/likeCommentService';

const formatter = buildFormatter(en);
function CommentRender({ data }) {
	const [commentState, setCommentState] = useState([]);
	const currentState = [];
	const cx = useClassName(styles);
	function handleLikeComment(id, state) {
		const likeHandler = async () => {
			await likeComment(id, state);
			if (commentState.length === 0) {
				const commentsList = currentState.map((thisComment) => {
					if (thisComment.commentId !== id) {
						return {
							commentId: thisComment.commentId,
							is_liked: thisComment.is_liked,
							liked_num: thisComment.likes_count,
						};
					} else {
						return {
							commentId: id,
							is_liked: !thisComment.is_liked,
							liked_num: state
								? thisComment.likes_count - 1
								: thisComment.likes_count + 1,
						};
					}
				});
				setCommentState(commentsList);
			} else {
				const commentsList = commentState.map((thisComment) => {
					if (thisComment.commentId !== id) {
						return {
							commentId: thisComment.commentId,
							is_liked: thisComment.is_liked,
							liked_num: thisComment.liked_num,
						};
					} else {
						return {
							commentId: id,
							is_liked: !thisComment.is_liked,
							liked_num: thisComment.is_liked
								? thisComment.liked_num - 1
								: thisComment.liked_num + 1,
						};
					}
				});
				setCommentState(commentsList);
			}
		};
		likeHandler();
	}
	return (
		<div className={cx('comment-wrapper')}>
			{data.length > 0
				? data.map((comment) => {
						const userName = `${comment.user.first_name} ${comment.user.last_name}`;
						const commentDetail = {
							commentId: comment.id,
							is_liked: comment.is_liked,
							likes_count: comment.likes_count,
						};
						currentState.push(commentDetail);
						return (
							<div className={cx('comment-container')} key={comment.id}>
								<div className={cx('comment-avatar')}>
									<Img
										src={comment.user.avatar}
										style={{
											width: '100%',
											height: '100%',
											borderRadius: '50%',
											objectFit: 'cover',
										}}
									/>
								</div>
								<div className={cx('comment-author')}>
									<Link to={`/@${comment.user.nickname}`}>
										<div className={cx('comment-user')}>
											{userName.length !== 1 ? userName : 'user_name'}
										</div>
									</Link>
									<div className={cx('comment-content')}>{comment.comment}</div>
									<span className={cx('comment-date')}>
										<TimeAgo date={comment.created_at} formatter={formatter} />
									</span>
								</div>
								<span className={cx('comment-like')}>
									<span
										onClick={() =>
											handleLikeComment(comment.id, comment.is_liked)
										}
										className={cx({
											liked:
												commentState.length !== 0
													? commentState.find((thisState) => {
															return (
																thisState.commentId === comment.id
															);
													  })?.is_liked
													: comment.is_liked,
										})}
									>
										<FontAwesomeIcon icon={faHeart} className={cx('icon')} />
									</span>
									<span>
										{commentState.length !== 0
											? commentState.find((thisState) => {
													return thisState.commentId === comment.id;
											  })?.liked_num
											: comment.likes_count}
									</span>
								</span>
							</div>
						);
				  })
				: ''}
		</div>
	);
}

export default CommentRender;
