import { useState } from 'react';

function Img({ src, alt = 'picture', ...props }) {
	const [isError, setIsError] = useState(false);
	function handleError() {
		setIsError(true);
	}
	return (
		<img
			loading="lazy"
			src={
				isError
					? 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'
					: src
			}
			alt={alt}
			{...props}
			onError={handleError}
		/>
	);
}

export default Img;
