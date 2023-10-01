import React from 'react';
import Header from './Header';

function HeaderOnlyLayout({ children }) {
	return (
		<React.Fragment>
			<Header />
			<div>{children}</div>
		</React.Fragment>
	);
}

export default HeaderOnlyLayout;
