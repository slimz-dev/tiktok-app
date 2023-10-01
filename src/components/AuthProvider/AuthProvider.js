import { createContext } from 'react';

export const AuthContext = createContext();

function AuthProvider({ value, children }) {
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
