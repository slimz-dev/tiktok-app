import { useState, createContext, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';

import FormUpload from './components/FormUpload';
import NewUpload from './components/NewUpload';

export const FileContext = createContext();
const cx = classNames.bind(styles);

function Upload() {
	const [isVid, setIsVid] = useState(false);
	const vidRef = useRef();
	function handleSetVideo() {
		setIsVid(true);
		if (isVid) {
			//For re-render Form
			setIsVid(Math.random());
		}
	}

	function handleCancel() {
		setIsVid(false);
	}
	useEffect(() => {
		//Refresh return page
		if (PerformanceNavigationTiming.type === PerformanceNavigationTiming.TYPE_RELOAD) {
			setIsVid(false);
		}
	}, []);
	const value = {
		handleSetVideo,
		vidRef,
		handleCancel,
	};
	return (
		<div className={cx('wrapper')}>
			<FileContext.Provider value={value}>
				<div className={cx('container')}>{isVid ? <FormUpload /> : <NewUpload />}</div>
			</FileContext.Provider>
		</div>
	);
}

export default Upload;
