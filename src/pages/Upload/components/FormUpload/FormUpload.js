import { useRef, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './FormUpload.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FileContext } from '../../Upload';
import { uploadVid } from '~/services/uploadService';
import { UserContext } from '~/context/UserProvider';

const cx = classNames.bind(styles);
function FormUpload() {
	const userCookie = useContext(UserContext);
	const descriptionRef = useRef();
	const viewRef = useRef();
	const file = useContext(FileContext);
	let allow = [];
	const uploadVideo = file.vidRef.current.files[0];
	function handleAllow(e) {
		const checked = e.target.checked;
		const allowed = e.target.value;
		if (checked) {
			allow = [...allow, allowed];
		} else {
			if (allow.includes(allowed)) {
				const index = allow.indexOf(allowed);
				allow.splice(index, 1);
			}
		}
	}

	function handleCancel() {
		file.handleCancel();
	}

	function handleSubmit() {
		const fetchApi = async () => {
			const descriptionValue = descriptionRef.current.value;
			const viewableValue = viewRef.current.value;
			const videoSrc = uploadVideo;
			console.log(videoSrc);
			const data = {
				description: descriptionValue,
				file: videoSrc,
				viewable: viewableValue,
				allows: allow,
			};
			const result = await uploadVid(userCookie.token, data);
			console.log(result);
		};
		fetchApi();
	}
	return (
		<div className={cx('wrapper')}>
			<div className={cx('video-header')}>
				<h2 className={cx('video-heading')}>Tải video lên</h2>
				<h3 className={cx('video-sub-heading')}>Đăng video vào tài khoản của bạn</h3>
			</div>
			<div className={cx('video-container')}>
				<div className={cx('video-preview')}>
					<div className={cx('video-content')}>
						<video
							controls
							className={cx('video-render')}
							src={URL.createObjectURL(uploadVideo)}
						></video>
					</div>
					<input
						ref={file.vidRef}
						type="file"
						id="files"
						accept="video/mp4,video/x-m4v,video/*"
						className={cx('hidden', 'hi')}
						onChange={file.handleSetVideo}
					></input>
					<div className={cx('video-option')}>
						<div className={cx('video-verified')}>
							<FontAwesomeIcon icon={faCheckCircle} color="#050505"></FontAwesomeIcon>
							<span className={cx('video-name')}>{uploadVideo.name}</span>
						</div>
						<label className={cx('upload-button')} for="files">
							Chọn tập tin
						</label>
					</div>
				</div>
				<div className={cx('setting')}>
					<div className={cx('setting-option')}>
						<label className={cx('video-description-label')} for="title">
							Chú thích
						</label>
						<input
							ref={descriptionRef}
							id="title"
							className={cx('video-description')}
						></input>
					</div>
					<div className={cx('setting-option')}>
						<label className={cx('video-viewable')} for="view">
							Ai có thể xem video này
						</label>
						<select ref={viewRef} id="view" className={cx('select-viewable')}>
							<option value="public">Công khai</option>
							<option value="friends">Bạn bè</option>
							<option value="private">Riêng tư</option>
						</select>
					</div>
					<div className={cx('setting-option')}>
						<label className={cx('video-allow')}>Cho phép người dùng:</label>
						<div className={cx('allow-box')}>
							<div className={cx('allowed')}>
								<input
									className={cx('input-checkbox')}
									type="checkbox"
									id="comment"
									value="comment"
									name="allow"
									onChange={(e) => handleAllow(e)}
								></input>
								<label for="comment">Bình luận</label>
							</div>
							<div className={cx('allowed')}>
								<input
									className={cx('input-checkbox')}
									type="checkbox"
									id="duet"
									value="duet"
									name="allow"
									onChange={(e) => handleAllow(e)}
								></input>
								<label for="duet">Duet</label>
							</div>
							<div className={cx('allowed')}>
								<input
									className={cx('input-checkbox')}
									type="checkbox"
									id="stich"
									value="stich"
									name="allow"
									onChange={(e) => handleAllow(e)}
								></input>
								<label for="stich">Ghép nối</label>
							</div>
						</div>
					</div>
					<div className={cx('submit')}>
						<div className={cx('event-button', 'cancel-button')} onClick={handleCancel}>
							Huỷ bỏ
						</div>
						<div className={cx('event-button', 'submit-button')} onClick={handleSubmit}>
							Đăng
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormUpload;
