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
					? 'https://g.fp.ps.netease.com/market/file/60c96c4f143cfa876d229d29rZtiWmum03?fop=imageView/2/w/32/h/32'
					: src
			}
			alt={alt}
			{...props}
			onError={handleError}
		/>
	);
}

export default Img;
