import { useState, useEffect, createContext } from 'react';

export const UserContext = createContext();
function UserProvider({ children }) {
	const [loggedIn, setLoggedIn] = useState(
		localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false
	);
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	);
	useEffect(() => {
		// Kiem tra expired
		// if (loggedIn) {
		// 	const fetchLogged = async () => {
		// 		const response = await logged();
		// 		if (response === false) {
		// 			setLoggedIn(false);
		// 		}
		// 	};
		// 	fetchLogged();
		// }

		//Save token and state
		localStorage.setItem('token', token);
		localStorage.setItem('user', loggedIn);
	}, [loggedIn, token]);
	const userState = {
		loggedIn,
		setLoggedIn,
		token,
		setToken,
	};
	return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
}

export default UserProvider;
