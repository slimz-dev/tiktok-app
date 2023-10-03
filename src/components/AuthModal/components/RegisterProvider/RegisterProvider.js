import { createContext } from 'react';

export const RegisterContext = createContext();
function RegisterProvider({ value, children }) {
	return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
}

export default RegisterProvider;
