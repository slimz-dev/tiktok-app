import { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';

import { handleLike } from '~/services/Likes/likeService';
import { PageContext } from '../../context/PageContext';
import styles from './Video.module.scss';
import Img from '~/components/Img';
import Swal from 'sweetalert2';
import { UserContext } from '~/context/UserProvider';
import AuthModal from '~/components/AuthModal';
import { closeModalContext } from '~/context/CloseLoginModalProvider';
import { handleFollow } from '~/services/Follow/followService';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);
function Video({ arrayList }) {
	const [errorVid, setErrorVid] = useState([]);
	const user = useContext(UserContext);
	const loginModalHandler = useContext(closeModalContext);
	const vidRef = useRef([]);
	const vid = useContext(PageContext);
	function handleNext() {
		setTimeout(() => {
			vid.page.setPage((prev) => prev + 1);
		}, 1000);
	}
	useEffect(() => {
		Swal.fire({
			title: 'This page will auto play video with sound!',
			text: 'Do you want to continue',
			icon: 'question',
			confirmButtonText: 'Turn on the sound',
		}).then((res) => {
			if (res.isConfirmed) {
				vidRef.current.forEach((vid) => {
					vid.muted = false;
				});
			}
		});
	}, []);
	function handleAutoPlay(inView, entry) {
		const currentVideo = entry.target.firstChild.id;
		if (inView) {
			if (!errorVid.includes(vidRef.current[currentVideo].id)) {
				vidRef.current[currentVideo].play();
			}
		} else {
			vidRef.current[currentVideo].pause();
		}
	}

	function handleLikeVideo(videoID) {
		const fetchLike = async () => {
			const result = await handleLike(videoID);
			vid.action.setVid((prev) => {
				const arrayOfList = prev.slice();
				const indexOfVideo = arrayOfList.findIndex((video) => {
					return video.id === result.id;
				});
				arrayOfList.splice(indexOfVideo, 1, result);
				return arrayOfList;
			});
		};
		if (user.loggedIn) {
			fetchLike();
		} else {
			loginModalHandler.handleOpen();
		}
	}

	function handleFollowUser(userId, isFollowed) {
		const fetchFollow = async () => {
			const result = await handleFollow(userId, isFollowed);
			vid.action.setVid((prev) => {
				const arrayOfList = prev.map((video) => {
					if (video.user_id === userId) {
						return {
							...video,
							user: result,
						};
					}
					return video;
				});
				return arrayOfList;
			});
		};
		if (user.loggedIn) {
			fetchFollow();
		} else {
			loginModalHandler.handleOpen();
		}
	}
	function handleError(vid) {
		setErrorVid((prev) => [...prev, vid.toString()]);
	}

	return (
		<>
			{loginModalHandler.isOpen ? <AuthModal /> : ''}
			<InfiniteScroll
				dataLength={arrayList.length}
				next={handleNext}
				style={{ overflow: 'hidden' }}
				hasMore={true}
				loader={
					<div className={cx('loading')}>
						<div></div>
						<div></div>
					</div>
				}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				{arrayList.map((item) => {
					let path = `/@${item.user.nickname}`;
					return (
						<InView
							key={item.id}
							onChange={(inView, entry) => handleAutoPlay(inView, entry)}
							threshold={0.7}
						>
							<div className={cx('container')} id={item.id}>
								<div className={cx('header')}>
									<span className={cx('avatar')}>
										<Img src={item.user.avatar} alt="avatar" />
									</span>
									<div className={cx('description')}>
										<div className={cx('name')}>
											<Link to={path} className={cx('tiktok_id')}>
												{item.user.nickname}
											</Link>
											<div
												className={cx('username')}
											>{`${item.user.first_name} ${item.user.last_name}`}</div>
										</div>
										<div className={cx('title')}>{item.description}</div>
										{item.music && (
											<div className={cx('music')}>
												<FontAwesomeIcon icon={faSoundcloud} />
												<span>{item.music}</span>
											</div>
										)}
									</div>
									<button
										className={cx('follow-button', {
											followed: item.user.is_followed,
										})}
										onClick={() => {
											handleFollowUser(item.user_id, item.user.is_followed);
										}}
									>
										{item.user.is_followed ? 'Following' : 'Follow'}
									</button>
								</div>
								<div className={cx('content')}>
									<div className={cx('video')}>
										<Link to={`/@${item.user.nickname}/video/${item.id}`}>
											<video
												id={item.id}
												loop
												muted
												ref={(element) =>
													(vidRef.current[item.id] = element)
												}
												onError={() => handleError(item.id)}
											>
												<source src={item.file_url} type="video/mp4" />
											</video>
										</Link>
									</div>
									<div className={cx('video-button')}>
										<div
											className={cx('button')}
											onClick={() => handleLikeVideo(item.id, item.is_liked)}
										>
											<FontAwesomeIcon
												icon={faHeart}
												className={cx('icon', {
													liked_color: item.is_liked,
												})}
											/>
											<span className={cx('number')}>{item.likes_count}</span>
										</div>
										<div className={cx('button')}>
											<Link to={`/@${item.user.nickname}/video/${item.id}`}>
												<FontAwesomeIcon
													icon={faCommentDots}
													className={cx('icon')}
												/>
											</Link>
											<span className={cx('number')}>
												{item.comments_count}
											</span>
										</div>
										<div className={cx('button')}>
											<FontAwesomeIcon
												icon={faShare}
												className={cx('icon')}
											/>
											<span className={cx('number')}>
												{item.shares_count}
											</span>
										</div>
									</div>
								</div>
							</div>
						</InView>
					);
				})}
			</InfiniteScroll>
		</>
	);
}

export default Video;
