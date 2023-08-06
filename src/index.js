//@ts-nocheck
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';



import { store } from './features/store';

import './styles/index.css';

import App from './App/App';
import HomePage from './pages/Home/HomePage';
import ErrorPage from './pages/Error/ErrorPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/cart',
				element: <HomePage />,
			},
			{
				path: '/categories/:categoryId',
				element: <HomePage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
