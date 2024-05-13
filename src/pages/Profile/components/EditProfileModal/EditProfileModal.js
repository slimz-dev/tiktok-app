import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Img from '~/components/Img';
import useClassName from '~/hooks/useClassName';
import { updateUser } from '~/services/Users/updateUserService';
import styles from './EditProfileModal.module.scss';
function EditProfile({ action, thisUser }) {
	const [info, setInfo] = useState({});
	const imgRef = useRef('');
	const cx = useClassName(styles);
	const id = useParams();
	function handleClose() {
		action.setIsEdit(false);
	}
	function handleSetSrc() {
		imgRef.current.click();
	}
	console.log(info);
	function handleChange(e) {
		const thisElement = e.target;
		const avatar = imgRef.current.files[0];
		if (thisElement.id === 'avatar' && avatar) {
			const imgUrl = URL.createObjectURL(imgRef.current.files[0]);
			setInfo((prev) => {
				return {
					...prev,
					avatar,
					imgUrl,
				};
			});
		} else if (thisElement.id === 'name') {
			const firstName = thisElement.value.split(' ')[0];
			const lastName = thisElement.value.split(' ').slice(1).join(' ');
			setInfo((prev) => {
				return {
					...prev,
					first_name: firstName,
					last_name: lastName,
				};
			});
			console.log(firstName, lastName);
		} else {
			const bio = thisElement.value;
			setInfo((prev) => {
				return {
					...prev,
					bio,
				};
			});
		}
	}

	function handleUpdateInfo() {
		if (info.first_name || info.last_name || info.avatar) {
			const updateInfo = async () => {
				const result = await updateUser(info);
				toast.success('Update successfully !!', {
					position: 'top-center',
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			};
			updateInfo();
		} else {
			handleClose();
		}
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
							<span className={cx('img-wrapper')} onClick={handleSetSrc}>
								<Img
									src={info?.imgUrl ? info.imgUrl : thisUser.avatar}
									className={cx('img-sizing')}
								/>
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
											fillRule="evenodd"
											clipRule="evenodd"
											d="M26.5858 5.08579C27.3479 4.32371 28.5767 4.30253 29.3646 5.03789L36.8646 12.0379C37.2612 12.408 37.4904 12.9232 37.4997 13.4655C37.5091 14.0078 37.2977 14.5307 36.9142 14.9142L16.9142 34.9142C16.5391 35.2893 16.0304 35.5 15.5 35.5H8.5C7.39543 35.5 6.5 34.6046 6.5 33.5V26C6.5 25.4696 6.71071 24.9609 7.08579 24.5858L26.5858 5.08579ZM28.0479 9.2805L10.5 26.8284V31.5H14.6716L32.622 13.5496L28.0479 9.2805Z"
										></path>
										<path d="M7 41C7 40.4477 7.44772 40 8 40H41C41.5523 40 42 40.4477 42 41V43C42 43.5523 41.5523 44 41 44H8C7.44772 44 7 43.5523 7 43V41Z"></path>
									</svg>
								</span>
							</span>
							<input
								onChange={(e) => handleChange(e)}
								id="avatar"
								ref={imgRef}
								className={cx('file-input')}
								type="file"
								accept="image/png, image/jpeg"
							/>
						</div>
					</div>
					<div className={cx('content-section')}>
						<span className={cx('section-name')}>Username</span>
						<div className={cx('section-input')}>
							<input
								className={cx('input', 'username-input')}
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
								id="name"
								onChange={(e) => handleChange(e)}
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
								id="bio"
								onChange={(e) => handleChange(e)}
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
						<div className={cx('button')} onClick={handleClose}>
							Cancel
						</div>
						<div className={cx('button')} onClick={handleUpdateInfo}>
							Save
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default EditProfile;
