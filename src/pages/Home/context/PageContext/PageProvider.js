import { createContext } from 'react';

export const PageContext = createContext();
function PageProvider({ children, value }) {
	return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export default PageProvider;
