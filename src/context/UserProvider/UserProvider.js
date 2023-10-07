import { useState, useEffect, createContext } from 'react';

export const UserContext = createContext();
function UserProvider({ children }) {
	const [user, setUser] = useState(
		localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false
	);
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);
	const userState = {
		user,
		setUser,
	};
	return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
}

export default UserProvider;
