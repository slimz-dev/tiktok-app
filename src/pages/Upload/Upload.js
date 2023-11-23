import { useState, createContext, useRef, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Theme } from '~/context/ThemeProvider';
import FormUpload from './components/FormUpload';
import NewUpload from './components/NewUpload';
import AuthModal from '~/components/AuthModal';
import { UserContext } from '~/context/UserProvider';
export const FileContext = createContext();
const cx = classNames.bind(styles);

function Upload() {
	const themeContext = useContext(Theme);
	const userState = useContext(UserContext);
	const [isVid, setIsVid] = useState(false);
	const vidRef = useRef();

	function toastHandle(errMsg) {
		toast(errMsg, {
			icon: '🚀',
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: themeContext.theme,
		});
	}
	function handleSetVideo() {
		setIsVid(true);
		if (isVid) {
			//For re-render Form
			setIsVid(Math.random());
		}
	}
	function handleCheckFile() {
		const fileName = vidRef.current.files[0].name;
		const ext = fileName.split('.');
		if (ext[ext.length - 1] === 'mp4') {
			handleSetVideo();
		} else {
			vidRef.current.value = '';
			toastHandle('Tập tin không được hỗ trợ. Hãy sử dụng định dạng MP4 hoặc WebM.');
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
		handleCheckFile,
		toastHandle,
	};
	return (
		<div className={cx('wrapper')}>
			<FileContext.Provider value={value}>
				<div className={cx('container')}>{isVid ? <FormUpload /> : <NewUpload />}</div>
			</FileContext.Provider>
			<ToastContainer />
			{!userState.loggedIn && <AuthModal />}
		</div>
	);
}

export default Upload;
