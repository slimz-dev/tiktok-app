import { faLock, faStreetView } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Img from '~/components/Img';
import useClassName from '~/hooks/useClassName';
import { getUser } from '~/services/getAnUserService';
import styles from './Profile.module.scss';
function Profile() {
	const [linePosition, setLinePosition] = useState(0);
	const [view, setView] = useState(true);
	const viewRef = useRef([]);
	let viewIndex = 0;
	const lineRef = useRef();
	const cx = useClassName(styles);
	const id = useParams();
	const [user, setUser] = useState({});
	useEffect(() => {
		const fetchUser = async () => {
			const result = await getUser(id.user);
			setUser(result);
		};
		fetchUser();
	}, []);
	function handleChangeLine(e) {
		let thisElement = e.target;
		while (!thisElement.classList.contains('pick')) {
			thisElement = thisElement.parentNode;
		}

		const tempPosition = thisElement.offsetLeft - lineRef.current.offsetLeft;
		lineRef.current.animate([{ transform: `translateX(${tempPosition}px)` }], {
			duration: 200,
			fill: 'forwards',
		});
	}
	function handleRemoveAnimation(e) {
		let thisElement = e.target;
		while (!thisElement.classList.contains('pick')) {
			thisElement = thisElement.parentNode;
		}
		lineRef.current.animate([{ transform: `translateX(${linePosition}px)` }], {
			duration: 200,
			fill: 'forwards',
		});
	}
	function handleChangeView(e) {
		let thisElement = e.target;
		while (!thisElement.classList.contains('pick')) {
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
						<Img
							src={user.avatar}
							style={{ width: '100%', borderRadius: '50%', height: '100%' }}
						/>
					</span>
					<div className={cx('basic-info')}>
						<h2 className={cx('user-username')}>{user.nickname}</h2>
						<h3
							className={cx('user-name')}
						>{`${user.first_name} ${user.last_name}`}</h3>
						<div className={cx('follow-button')}>Follow</div>
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
							className={cx('pick', 'view-content', {
								active: view,
							})}
							onMouseOver={(e) => handleChangeLine(e)}
							onMouseOut={(e) => handleRemoveAnimation(e)}
							onClick={(e) => handleChangeView(e)}
						>
							<span>Videos</span>
						</div>
						<div
							id="liked"
							ref={(e) => (viewRef.current[viewIndex++] = e)}
							className={cx('pick', 'view-content', {
								active: !view,
							})}
							onMouseOver={(e) => handleChangeLine(e)}
							onMouseOut={(e) => handleRemoveAnimation(e)}
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
				<div className={cx('Videos-container')}></div>
			</div>
		</div>
	);
}

export default Profile;
