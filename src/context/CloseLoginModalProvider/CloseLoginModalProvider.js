import { createContext, useState } from 'react';

export const closeModalContext = createContext();

function CloseLoginModalProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	function handleOpen() {
		setIsOpen(true);
	}
	function handleClose() {
		setIsOpen(false);
	}
	const data = {
		isOpen,
		handleClose,
		handleOpen,
	};
	return <closeModalContext.Provider value={data}>{children}</closeModalContext.Provider>;
}

export default CloseLoginModalProvider;
