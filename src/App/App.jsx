//@ts-nocheck
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getCategories } from '../features/categories/categories-slice';
import { getProducts } from '../features/products/products-slice';

import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import Sidebar from './../components/Sidebar/Sidebar';
import UserForm from '../components/User/UserForm';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<div className="app">
			<Header />

			<UserForm />

			<div className="container">
				<Sidebar />
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default App;
