import React from 'react';

import Poster from '../../components/Poster/Poster';
import Products from '../../components/Products/Products';
import { useSelector } from 'react-redux';
import { selectors } from '../../features/store';

const HomePage = () => {
	const { list } = useSelector(selectors.selectProductsState);
	return (
		<>
			<Poster />
			<Products products={list} amount={5} title="Trending" />
		</>
	);
};

export default HomePage;
