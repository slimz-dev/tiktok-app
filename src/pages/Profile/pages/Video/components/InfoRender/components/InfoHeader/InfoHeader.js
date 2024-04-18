import { useState } from 'react';
import useClassName from '~/hooks/useClassName';
import { Link } from 'react-router-dom';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCommentDots, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

//Component
import Img from '~/components/Img';

//css
import styles from './InfoHeader.module.scss';

//api
import { handleFollow } from '~/services/Follow/followService';
import { handleLike } from '~/services/Likes/likeService';

function InfoHeader({ thisInfo }) {
	const cx = useClassName(styles);
	const [isFollowed, setIsFollowed] = useState(thisInfo.user.is_followed);
	const [isLiked, setIsLiked] = useState(thisInfo.is_liked);
	const [likedNum, setLikedNum] = useState(thisInfo.likes_count);

	function handleChangeFollow() {
		const followHandler = async () => {
			await handleFollow(thisInfo.user.id, thisInfo.user.is_followed);
			await setIsFollowed(!isFollowed);
		};
		followHandler();
	}

	function handleLikeVid() {
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
					<div
						className={cx('follow-button', {
							followed: isFollowed,
						})}
						onClick={handleChangeFollow}
					>
						{isFollowed ? 'Following' : 'Follow'}
					</div>
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
		</div>
	);
}

export default InfoHeader;
