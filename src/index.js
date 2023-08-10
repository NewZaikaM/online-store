//@ts-nocheck
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';



import { store } from './features/store';

import './styles/index.css';

import App from './App/App';
import HomePage from './pages/Home/HomePage';
import SingleProduct from './components/Products/SingleProduct';
import ErrorPage from './pages/Error/ErrorPage';
import Profile from './components/Profile/Profile';
import SingleCategory from './components/Categories/SingleCategory';
import Cart from './components/Cart/Cart';

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
				element: <Cart />,
			},
			{
				path: '/favorites',
				element: <HomePage />,
			},
			{
				path: '/categories/:categoryId',
				element: <SingleCategory />,
			},
			{
				path: '/products/:productId',
				element: <SingleProduct />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
