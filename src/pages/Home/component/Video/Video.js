import { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';

import { handleLike } from '~/services/likeService';
import { PageContext } from '../../context/PageContext';
import styles from './Video.module.scss';
import Img from '~/components/Img';
import Swal from 'sweetalert2';
import { UserContext } from '~/context/UserProvider';
import AuthModal from '~/components/AuthModal';
import { closeModalContext } from '~/context/CloseLoginModalProvider';
const cx = classNames.bind(styles);
function Video({ arrayList }) {
	const user = useContext(UserContext);
	const loginModalHandler = useContext(closeModalContext);
	const [login, setLogin] = useState(false);
	const [like, setLike] = useState();
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
			vidRef.current[currentVideo].play();
		} else {
			if (vidRef.current[currentVideo].currentTime !== 0) {
				vidRef.current[currentVideo].pause();
			}
		}
	}

	function handleLikeVideo(videoID) {
		const fetchLike = async () => {
			const result = await handleLike(videoID);
			setLike(result);
		};
		if (user.loggedIn) {
			fetchLike();
		} else {
			loginModalHandler.handleOpen();
		}
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
				{arrayList.map((item) => (
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
										<div className={cx('tiktok_id')}>{item.user.nickname}</div>
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
								<button className={cx('follow-button')}>Follow</button>
							</div>
							<div className={cx('content')}>
								<div className={cx('video')}>
									<video
										id={item.id}
										controls
										loop
										muted
										ref={(element) => (vidRef.current[item.id] = element)}
									>
										<source src={item.file_url} type="video/mp4" />
									</video>
								</div>
								<div className={cx('video-button')}>
									<div
										className={cx('button')}
										onClick={() => handleLikeVideo(item.id, item.is_liked)}
									>
										<FontAwesomeIcon
											icon={faHeart}
											className={cx('icon', {
												liked_color:
													like && like.id === item.id
														? like.is_liked
														: item.is_liked,
											})}
										/>
										<span className={cx('number')}>
											{like && like.id === item.id
												? like.likes_count
												: item.likes_count}
										</span>
									</div>

									<div className={cx('button')}>
										<FontAwesomeIcon
											icon={faCommentDots}
											className={cx('icon')}
										/>
										<span className={cx('number')}>{item.comments_count}</span>
									</div>
									<div className={cx('button')}>
										<FontAwesomeIcon icon={faShare} className={cx('icon')} />
										<span className={cx('number')}>{item.shares_count}</span>
									</div>
								</div>
							</div>
						</div>
					</InView>
				))}
			</InfiniteScroll>
		</>
	);
}

export default Video;
