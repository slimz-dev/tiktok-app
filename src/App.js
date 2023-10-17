import { Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './router';
import { Suspense, useContext } from 'react';

import UserProvider from '~/context/UserProvider';
import { Theme } from './context/ThemeProvider';
function App() {
	const themeContext = useContext(Theme);
	return (
		<UserProvider>
			<div className="App" data-theme={themeContext.theme}>
				<Suspense fallback={<div>loading...</div>}>
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
				</Suspense>
			</div>
		</UserProvider>
	);
}

export default App;
