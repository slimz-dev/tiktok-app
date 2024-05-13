import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import config from '~/config';
import useClassName from '~/hooks/useClassName';

//components
import Img from '~/components/Img';
import MyLikedVids from './components/MyLikedVids/MyLikedVids';
import MyVids from './components/MyVids/MyVids';
import EditProfileModal from './components/EditProfileModal';
import AuthModal from '~/components/AuthModal';

//api
import { getUser } from '~/services/Users/getAnUserService';
import { logged } from '~/services/Auth/loggedService';
import { handleFollow } from '~/services/Follow/followService';

//css
import styles from './Profile.module.scss';

//context
import { UserContext } from '~/context/UserProvider';
import { closeModalContext } from '~/context/CloseLoginModalProvider';
function Profile() {
	const modalHandler = useContext(closeModalContext);
	const userLog = useContext(UserContext);
	const navigate = useNavigate();
	const [linePosition, setLinePosition] = useState(0);
	const [view, setView] = useState(true);
	const viewRef = useRef([]);
	let viewIndex = 0;
	const lineRef = useRef();
	const cx = useClassName(styles);
	const id = useParams();
	const [user, setUser] = useState({});
	const [isMe, setIsMe] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isFollowed, setIsFollowed] = useState(false);
	const editValue = {
		isEdit,
		setIsEdit,
	};
	useEffect(() => {
		const fetchUser = async () => {
			const result = await getUser(id.user);
			let me = {};
			if (userLog.loggedIn) {
				me = await logged();
			}
			if (result !== null) {
				setUser(() => {
					if (userLog.loggedIn) {
						if (me.data.id === result.id) {
							setIsMe(true);
						} else {
							setIsMe(false);
						}
					}
					setIsFollowed(result.is_followed);
					return result;
				});
			} else {
				navigate(config.routes.Unknown);
			}
		};
		fetchUser();
	}, [id]);

	function handleFollowUser(userId, isFollowed) {
		const followUser = async () => {
			const result = await handleFollow(userId, isFollowed);
			if (result) {
				setIsFollowed((prev) => !prev);
			}
		};
		if (userLog.loggedIn) {
			followUser();
		} else {
			modalHandler.handleOpen();
		}
	}
	function handleChangeLine(e) {
		let thisElement = e.target;
		while (!thisElement.classList.contains('tab')) {
			thisElement = thisElement.parentNode;
		}
		const tempPosition = thisElement.offsetLeft - lineRef.current.offsetLeft;
		lineRef.current.animate([{ transform: `translateX(${tempPosition}px)` }], {
			duration: 500,
			fill: 'forwards',
		});
	}
	function handleRemoveAnimation(e) {
		let thisElement = e.target;
		while (!thisElement.classList.contains('tab')) {
			thisElement = thisElement.parentNode;
		}
		lineRef.current.animate([{ transform: `translateX(${linePosition}px)` }], {
			duration: 500,
			fill: 'forwards',
		});
	}
	function handleChangeView(e) {
		let thisElement = e.target;
		while (!thisElement.classList.contains('tab')) {
			thisElement = thisElement.parentNode;
		}
		const tempPosition = thisElement.offsetLeft - lineRef.current.offsetLeft;
		setLinePosition(tempPosition);
		setView(() => {
			if (thisElement.id === 'videos') {
				return true;
			} else {
				return false;
			}
		});
	}

	if (!id.user.startsWith('@')) return <Navigate to="/404" />;
	return (
		<div className={cx('wrapper')}>
			<div className={cx('info-container')}>
				<div className={cx('info-header')}>
					<span className={cx('user-avatar')}>
						<Img src={user.avatar} className={cx('img-sizing')} />
					</span>
					<div className={cx('basic-info')}>
						<h2 className={cx('user-username')}>{user.nickname}</h2>
						<h3
							className={cx('user-name')}
						>{`${user.first_name} ${user.last_name}`}</h3>
						{isMe ? (
							<div className={cx('edit-button')} onClick={() => setIsEdit(true)}>
								<span>
									<FontAwesomeIcon icon={faPenToSquare} />
								</span>
								<span className={cx('edit-content')}>Edit profile</span>
							</div>
						) : (
							<div
								className={cx('follow-button', {
									'is-followed': isFollowed,
								})}
								onClick={() => handleFollowUser(user.id, user.is_followed)}
							>
								{isFollowed ? 'Following' : 'Follow'}
							</div>
						)}
					</div>
				</div>
				<div className={cx('info-description')}>
					<div className={cx('info-influent')}>
						<div className={cx('influent-container')}>
							<span className={cx('influent-number')}>{user.followings_count}</span>
							<span className={cx('influent-type')}>Following</span>
						</div>
						<div className={cx('influent-container')}>
							<span className={cx('influent-number')}>{user.followers_count}</span>
							<span className={cx('influent-type')}>Followers</span>
						</div>
						<div className={cx('influent-container')}>
							<span className={cx('influent-number')}>{user.likes_count}</span>
							<span className={cx('influent-type')}>Likes</span>
						</div>
					</div>
					<div className={cx('user-description')}>{user.bio}</div>
				</div>
			</div>
			<div className={cx('view')}>
				<div className={cx('info-view')}>
					<div className={cx('view-container')}>
						<div
							id="videos"
							ref={(e) => (viewRef.current[viewIndex++] = e)}
							className={cx('tab', 'view-content', {
								active: view,
							})}
							onMouseEnter={(e) => handleChangeLine(e)}
							onMouseLeave={(e) => handleRemoveAnimation(e)}
							onClick={(e) => handleChangeView(e)}
						>
							<span>Videos</span>
						</div>
						<div
							id="liked"
							ref={(e) => (viewRef.current[viewIndex++] = e)}
							className={cx('tab', 'view-content', {
								active: !view,
							})}
							onMouseEnter={(e) => handleChangeLine(e)}
							onMouseLeave={(e) => handleRemoveAnimation(e)}
							onClick={(e) => handleChangeView(e)}
						>
							<span>
								<FontAwesomeIcon icon={faLock} />
								Liked
							</span>
						</div>
					</div>
					<div ref={lineRef} className={cx('view-line')}></div>
				</div>
				<div className={cx('videos-container')}>
					{view ? <MyVids vid={user.videos} /> : <MyLikedVids id={user.id} />}
				</div>
			</div>
			{isEdit ? <EditProfileModal action={editValue} thisUser={user} /> : ''}
			{modalHandler.isOpen ? <AuthModal /> : ''}
		</div>
	);
}

export default Profile;
