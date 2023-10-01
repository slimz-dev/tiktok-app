import React from 'react';
import Header from './Header';
import Footer from './Footer';

function HeaderFooterLayout({ children }) {
	return (
		<div search-size="min">
			<Header />
			<div>{children}</div>
			<Footer />
		</div>
	);
}

export default HeaderFooterLayout;
