import { useContext, useEffect, useState } from 'react';
import useClassName from '~/hooks/useClassName';
import { Link } from 'react-router-dom';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

//Component
import Img from '~/components/Img';
import AuthModal from '~/components/AuthModal';

//css
import styles from './InfoHeader.module.scss';

//api
import { handleFollow } from '~/services/Follow/followService';
import { handleLike } from '~/services/Likes/likeService';
import { logged } from '~/services/Auth/loggedService';
import { deleteVid } from '~/services/Videos/deleteVideoService';

//context
import { closeModalContext } from '~/context/CloseLoginModalProvider';
import { UserContext } from '~/context/UserProvider';

function InfoHeader({ thisInfo }) {
	const cx = useClassName(styles);
	const modalHandler = useContext(closeModalContext);
	const userLog = useContext(UserContext);
	const [isMe, setIsMe] = useState(false);
	const [isFollowed, setIsFollowed] = useState(thisInfo.user.is_followed);
	const [isLiked, setIsLiked] = useState(thisInfo.is_liked);
	const [likedNum, setLikedNum] = useState(thisInfo.likes_count);

	useEffect(() => {
		const getMe = async () => {
			if (userLog.loggedIn) {
				const result = await logged();
				if (result.data.id === thisInfo.user.id) {
					setIsMe(true);
				}
			} else {
				modalHandler.handleOpen();
			}
		};

		getMe();
	}, []);

	function handleDeleteVideo() {
		const deleteVideo = async () => {
			const result = await deleteVid(thisInfo.id);
			if (!result) {
				window.history.go(-1);
			}
		};
		deleteVideo();
	}
	function handleChangeFollow() {
		if (userLog.loggedIn) {
			const followHandler = async () => {
				await handleFollow(thisInfo.user.id, thisInfo.user.is_followed);
				await setIsFollowed(!isFollowed);
			};
			followHandler();
		} else {
			modalHandler.handleOpen();
		}
	}

	function handleLikeVid() {
		if (userLog.loggedIn) {
			const likeHandler = async () => {
				await handleLike(thisInfo.id);
				setIsLiked(!isLiked);
				if (isLiked) {
					setLikedNum(likedNum - 1);
				} else {
					setLikedNum(likedNum + 1);
				}
			};
			likeHandler();
		} else {
			modalHandler.handleOpen();
		}
	}
	return (
		<div className={cx('video-header')}>
			<div className={cx('video-header-wrapper')}>
				<div className={cx('video-header-top')}>
					<div className={cx('video-author-info')}>
						<div className={cx('video-author-avatar')}>
							<Img
								src={thisInfo.user.avatar}
								style={{
									width: '100%',
									height: '100%',
									borderRadius: '50%',
									objectFit: 'cover',
								}}
							/>
						</div>
						<div className={cx('video-author-name')}>
							<Link to={`/@${thisInfo.user.nickname}`}>
								<div className={cx('video-author-username')}>
									{thisInfo.user.nickname}
								</div>
							</Link>
							<div>
								{`${thisInfo.user.first_name} ${thisInfo.user.last_name}`}
								<span className={cx('video-date')}>
									{thisInfo.published_at.split(' ')[0]}
								</span>
							</div>
						</div>
					</div>
					{isMe ? (
						<div className={cx('follow-button')} onClick={handleDeleteVideo}>
							Delete Video
						</div>
					) : (
						<div
							className={cx('follow-button', {
								followed: isFollowed,
							})}
							onClick={handleChangeFollow}
						>
							{isFollowed ? 'Following' : 'Follow'}
						</div>
					)}
				</div>
				<div className={cx('video-description')}>{thisInfo.description}</div>
				<div className={cx('music')}>
					<FontAwesomeIcon icon={faMusic} />
					<span className={cx('music-content')}>{thisInfo.music}</span>
				</div>
			</div>
			<div className={cx('video-action')}>
				<div className={cx('action-container')}>
					<span className={cx('icon-wrapper')} onClick={handleLikeVid}>
						<FontAwesomeIcon
							icon={faHeart}
							className={cx('icon', 'like-icon', {
								liked: isLiked,
							})}
						/>
					</span>
					<span className={cx('num-wrapper')}>{likedNum}</span>
				</div>
				<div className={cx('action-container')}>
					<span className={cx('icon-wrapper')}>
						<FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
					</span>
					<span className={cx('num-wrapper')}>{thisInfo.comments_count}</span>
				</div>
				<div className={cx('action-container')}>
					<span className={cx('icon-wrapper')}>
						<FontAwesomeIcon icon={faBookmark} className={cx('icon')} />
					</span>
					<span className={cx('num-wrapper')}>{thisInfo.shares_count}</span>
				</div>
			</div>
			{modalHandler.isOpen ? <AuthModal /> : ''}
		</div>
	);
}

export default InfoHeader;
