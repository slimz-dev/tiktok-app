import { Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './router';
import { useContext } from 'react';

import UserProvider from '~/components/UserContext';
import { Theme } from './components/ThemeProvider';
function App() {
	const themeContext = useContext(Theme);
	return (
		<UserProvider>
			<div className="App" data-theme={themeContext.theme}>
				<Routes>
					{PublicRoutes.map((route, index) => {
						const Page = route.component;
						const Layout = route.layout;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}
				</Routes>
			</div>
		</UserProvider>
	);
}

export default App;
