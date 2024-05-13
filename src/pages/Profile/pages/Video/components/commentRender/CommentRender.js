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
import { faEllipsis, faHeart, faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { likeComment } from '~/services/Comments/likeCommentService';
import Tippy from '@tippyjs/react/headless';
import { UserContext } from '~/context/UserProvider';
import { getUser } from '~/services/Users/getAnUserService';
import { logged } from '~/services/Auth/loggedService';
import { deleteComment } from '~/services/Comments/deleteCommentService';
import { postComment } from '~/services/Comments/postCommentService';
import { updateComment } from '~/services/Comments/updateCommentService';

const formatter = buildFormatter(en);
function CommentRender({ data, commentHandler }) {
	const userLog = useContext(UserContext);
	const editRef = useRef('');
	const [user, setUser] = useState({});
	const [edit, setEdit] = useState({
		editId: '',
		content: '',
	});
	const [commentState, setCommentState] = useState([]);
	const currentState = [];
	const cx = useClassName(styles);
	useEffect(() => {
		const getUser = async () => {
			const result = await logged();
			setUser(result.data);
		};
		if (userLog.loggedIn) {
			getUser();
		}
	}, []);
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
	function handleEditComment() {
		if (edit.isEdit && edit.content.length > 0) {
			const handleUpdateComment = async () => {
				const result = await updateComment(edit.editId, edit.content);
				commentHandler((prev) => {
					const newList = [];
					prev.forEach((comment) => {
						if (comment.id !== edit.editId) {
							newList.push(comment);
						} else {
							newList.push(result);
						}
					});
					setEdit({});
					return newList;
				});
			};
			handleUpdateComment();
		}
	}
	function toggleEdit(commentId, commentContent) {
		setEdit({ editId: commentId, content: commentContent });
	}

	function editComment() {
		setEdit((prev) => {
			return {
				...prev,
				content: editRef.current.value,
				isEdit: true,
			};
		});
	}

	function handleDeleteComment(commentId) {
		const deleteCmt = async () => {
			const result = await deleteComment(commentId);
			if (result === undefined) {
				const newList = [];
				data.forEach((comment) => {
					if (comment.id !== commentId) {
						newList.push(comment);
					}
				});
				commentHandler(newList);
			}
		};
		deleteCmt();
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
											width: '40px',
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
									{edit.editId && edit.editId === comment.id ? (
										<div className={cx('comment-edit-wrapper')}>
											<textarea
												ref={editRef}
												className={cx('comment-edit')}
												value={edit.content}
												onChange={editComment}
											/>
											<span onClick={handleEditComment}>
												<i
													data-visualcompletion="css-img"
													className={cx('css', {
														active: edit.isEdit,
													})}
												></i>
											</span>
										</div>
									) : (
										<div className={cx('comment-content')}>
											{comment.comment}
										</div>
									)}
									{edit.editId && edit.editId === comment.id ? (
										<div>
											<span className={cx('comment-edit-remove')}>
												Nhấn vào để{' '}
												<span
													onClick={() =>
														setEdit({ editId: '', content: '' })
													}
													style={{
														textDecoration: 'underline',
														cursor: 'pointer',
													}}
												>
													hủy
												</span>
											</span>
										</div>
									) : (
										<span className={cx('comment-date')}>
											<TimeAgo
												date={comment.created_at}
												formatter={formatter}
											/>
										</span>
									)}
								</div>
								{edit.editId && edit.editId === comment.id ? (
									<></>
								) : (
									<span className={cx('comment-like')}>
										{user.id ? (
											comment.user.id === user.id ? (
												<Tippy
													interactive
													placement="bottom"
													render={(attrs) => (
														<div className={cx('tippy-wrapper')}>
															<div
																className={cx('tippy-content')}
																onClick={() =>
																	toggleEdit(
																		comment.id,
																		comment.comment
																	)
																}
															>
																Edit
																<span className={cx('tippy-icon')}>
																	<FontAwesomeIcon
																		icon={faPencil}
																	/>
																</span>
															</div>
															<div
																className={cx('tippy-content')}
																onClick={() =>
																	handleDeleteComment(comment.id)
																}
															>
																Delete
																<span className={cx('tippy-icon')}>
																	<FontAwesomeIcon
																		icon={faTrash}
																	/>
																</span>
															</div>
														</div>
													)}
												>
													<span className={cx('comment-option')}>
														<FontAwesomeIcon icon={faEllipsis} />
													</span>
												</Tippy>
											) : (
												''
											)
										) : (
											''
										)}

										<span
											onClick={() =>
												handleLikeComment(comment.id, comment.is_liked)
											}
											className={cx({
												liked:
													commentState.length !== 0
														? commentState.find((thisState) => {
																return (
																	thisState.commentId ===
																	comment.id
																);
														  })?.is_liked
														: comment.is_liked,
											})}
										>
											<FontAwesomeIcon
												icon={faHeart}
												className={cx('icon')}
											/>
										</span>
										<span className={cx('likes-count')}>
											{commentState.length !== 0
												? commentState.find((thisState) => {
														return thisState.commentId === comment.id;
												  })?.liked_num
												: comment.likes_count}
										</span>
									</span>
								)}
							</div>
						);
				  })
				: ''}
		</div>
	);
}

export default CommentRender;
