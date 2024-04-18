import React from 'react';

function ContentLayout({ children }) {
	return (
		<React.Fragment>
			<div>{children}</div>
		</React.Fragment>
	);
}

export default ContentLayout;
