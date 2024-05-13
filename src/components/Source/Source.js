import { forwardRef, useState } from 'react';

const VideoRender = forwardRef(function VideoRender({ children, ...props }, ref) {
	const [err, setErr] = useState(false);
	function handleError() {
		setErr(true);
	}
	return (
		<>
			{err ? (
				<img
					src="https://cdn.tgdd.vn/hoi-dap/826943/Thumbnail/5-cach-sua-loi-this-video-file-cannot-be-played-error-code-thumb-1.jpg"
					style={{ height: 'maxContent !important' }}
				/>
			) : (
				<video {...props} ref={ref} onError={handleError}>
					{children}
				</video>
			)}
		</>
	);
});

export default VideoRender;
