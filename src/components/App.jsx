import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout.jsx';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('../pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('../pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('../pages/TrackerPage/TrackerPage.jsx'));

function App() {
	return (
		<SharedLayout>
			<Routes>
				<Route
					path='/'
					element={<HomePage />}
				/>
				<Route
					path='/signin'
					element={<SignInPage />}
				/>
				<Route
					path='/signup'
					element={<SignUpPage />}
				/>
				<Route
					path='/tracker/:date'
					element={<TrackerPage />}
				/>
			</Routes>
		</SharedLayout>
	);
}

export default App;
