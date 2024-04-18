import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import Img from '~/components/Img';
import useClassName from '~/hooks/useClassName';
import styles from './EditProfileModal.module.scss';
function EditProfile({ action, thisUser }) {
	console.log(thisUser);
	const cx = useClassName(styles);
	const id = useParams();
	function handleClose() {
		action.setIsEdit(false);
	}
	return (
		<div className={cx('wrapper')}>
			<div className={cx('modal-container')}>
				<div className={cx('modal-header')}>
					<span className={cx('header-name')}>Edit profile</span>
					<span className={cx('header-button')} onClick={handleClose}>
						<FontAwesomeIcon icon={faXmark} />
					</span>
				</div>
				<div className={cx('modal-content')}>
					<div className={cx('content-section')}>
						<span className={cx('section-name')}>Profile photo</span>
						<div className={cx('section-input')}>
							<span className={cx('img-wrapper')}>
								<Img src={thisUser.avatar} className={cx('img-sizing')} />
								<span className={cx('img-button')}>
									<svg
										width="16"
										data-e2e=""
										height="16"
										viewBox="0 0 48 48"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M26.5858 5.08579C27.3479 4.32371 28.5767 4.30253 29.3646 5.03789L36.8646 12.0379C37.2612 12.408 37.4904 12.9232 37.4997 13.4655C37.5091 14.0078 37.2977 14.5307 36.9142 14.9142L16.9142 34.9142C16.5391 35.2893 16.0304 35.5 15.5 35.5H8.5C7.39543 35.5 6.5 34.6046 6.5 33.5V26C6.5 25.4696 6.71071 24.9609 7.08579 24.5858L26.5858 5.08579ZM28.0479 9.2805L10.5 26.8284V31.5H14.6716L32.622 13.5496L28.0479 9.2805Z"
										></path>
										<path d="M7 41C7 40.4477 7.44772 40 8 40H41C41.5523 40 42 40.4477 42 41V43C42 43.5523 41.5523 44 41 44H8C7.44772 44 7 43.5523 7 43V41Z"></path>
									</svg>
								</span>
							</span>
							<input className={cx('file-input')} />
						</div>
					</div>
					<div className={cx('content-section')}>
						<span className={cx('section-name')}>Username</span>
						<div className={cx('section-input')}>
							<input
								className={cx('input', 'username-input')}
								value=""
								placeholder={thisUser.nickname}
							/>
							<span className={cx('section-description')}>
								<span>{`www.tiktok.com/${id.user}`}</span>
								<span>
									Usernames can only contain letters, numbers, underscores, and
									periods. This option is not activated.
								</span>
							</span>
						</div>
					</div>
					<div className={cx('content-section')}>
						<span className={cx('section-name')}>Name</span>
						<div className={cx('section-input')}>
							<input
								className={cx('input')}
								placeholder={`${thisUser.first_name} ${thisUser.last_name}`}
							/>
							<span className={cx('section-description')}>
								Your nickname can be changed multiple times
							</span>
						</div>
					</div>
					<div className={cx('content-section', 'bottom-section')}>
						<span className={cx('section-name')}>Bio</span>
						<div className={cx('section-input')}>
							<textarea
								className={cx('input')}
								style={{ height: '100px' }}
								placeholder={thisUser.bio}
							/>
							<span className={cx('section-description')}>0/80</span>
						</div>
					</div>
				</div>
				<div className={cx('modal-footer')}>
					<div className={cx('button-wrapper')}>
						<div className={cx('button')}>Cancel</div>
						<div className={cx('button')}>Save</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProfile;
