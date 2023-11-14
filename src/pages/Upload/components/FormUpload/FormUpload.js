import { useRef, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './FormUpload.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FileContext } from '../../Upload';

const cx = classNames.bind(styles);
function FormUpload() {
	const file = useContext(FileContext);
	const uploadVideo = file.vidRef.current.files[0];
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
							className={cx('video-render')}
							// src={URL.createObjectURL(uploadVideo)}
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
							<span className={cx('video-name')}>abc</span>
						</div>
						<label className={cx('upload-button')} for="files">
							Chọn tập tin
						</label>
					</div>
				</div>
				<div className={cx('setting')}>
					<div className={cx('setting-description')}>
						<label className={cx('video-description-label')} for="title">
							Chú thích
						</label>
						<input id="title" className={cx('video-description')}></input>
					</div>
					<div className={cx('setting-view')}>
						<label className={cx('video-viewable')} for="view">
							Ai có thể xem video này
						</label>
						<select id="view" className={cx('select-viewable')}>
							<option value="public">Công khai</option>
							<option value="friends">Bạn bè</option>
							<option value="private">Riêng tư</option>
						</select>
					</div>
					<div className={cx('setting-allow')}>
						<label className={cx('video-allow')}>Cho phép người dùng:</label>
						<div className={cx('allowed')}>
							<input
								type="checkbox"
								id="comment"
								value="comment"
								name="allow"
							></input>
							<label for="comment">Bình luận</label>
						</div>
						<div className={cx('allowed')}>
							<input type="checkbox" id="duet" value="duet" name="allow"></input>
							<label for="duet">Duet</label>
						</div>
						<div className={cx('allowed')}>
							<input type="checkbox" id="stich" value="stich" name="allow"></input>
							<label for="stich">Ghép nối</label>
						</div>
					</div>
					<div className={cx('submit')}>
						<div className={cx('cancel-button')}>Huỷ bỏ</div>
						<div className={cx('submit-button')}>Đăng</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormUpload;
