import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import { FileContext } from '../../Upload';
import classNames from 'classnames/bind';
import styles from '../../Upload.module.scss';

const cx = classNames.bind(styles);

function NewUpload() {
	const file = useContext(FileContext);
	return (
		<>
			<div className={cx('content')}>
				<div className={cx('icon')}>
					<FontAwesomeIcon icon={faCloudArrowUp} size="2xl" color="gray" />
				</div>
				<span className={cx('header')}>Chọn video để tải lên</span>
				<div className={cx('option')}>
					<span className={cx('description')}>Hoặc kéo và thả tập tin</span>
					<span className={cx('type')}>MP4 hoặc WebM</span>
				</div>
				<div className={cx('size')}>
					<span className={cx('resolution')}>Độ phân giải 720x1280 trở lên</span>
					<span className={cx('max-length')}>Tối đa 10 phút</span>
					<span className={cx('max-size')}>Nhỏ hơn 10 GB</span>
				</div>
				<input
					ref={file.vidRef}
					type="file"
					id="files"
					accept="video/mp4,video/x-m4v,video/*"
					className={cx('hidden', 'first')}
					onChange={file.handleSetVideo}
				/>
				<label className={cx('upload-button')} for="files">
					Chọn tập tin
				</label>
			</div>
		</>
	);
}

export default NewUpload;
