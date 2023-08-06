import React from 'react';
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import Sidebar from './../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';





const App = () => {
	return (
		<div className="app">
			<Header />
			<div className="container">
				<Sidebar />
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default App;
