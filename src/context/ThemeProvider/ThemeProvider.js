import { useState, createContext, useEffect } from 'react';

let Theme = createContext();
function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(
		localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
	);

	const toggleTheme = () => {
		setTheme((cur) => (cur === 'light' ? 'dark' : 'light'));
	};
	const changeTheme = {
		theme,
		toggleTheme,
	};
	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);
	return <Theme.Provider value={changeTheme}>{children}</Theme.Provider>;
}

export { Theme, ThemeProvider };
