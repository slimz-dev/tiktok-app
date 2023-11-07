import { useState, createContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';

import FormUpload from './components/FormUpload';
import NewUpload from './components/NewUpload';

export const FileContext = createContext();
const cx = classNames.bind(styles);

function Upload() {
	const [vid, setVid] = useState(false);
	function handleChange() {
		setVid(true);
	}

	const value = {
		vid,
		handleChange,
	};
	return (
		<div className={cx('wrapper')}>
			<FileContext.Provider value={value}>
				<div className={cx('container')}>{vid ? <FormUpload /> : <NewUpload />}</div>
			</FileContext.Provider>
		</div>
	);
}

export default Upload;
