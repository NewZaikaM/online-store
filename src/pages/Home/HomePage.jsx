//@ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { filterByPrice } from '../../features/products/products-slice';

import Poster from '../../components/Poster/Poster';
import Products from '../../components/Products/Products';
import Categories from '../../components/Categories/Categories';
import Banner from '../../components/Banner/Banner';

const HomePage = () => {
	const {
		products: { list, filtered },
		categories,
	} = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!list.length) return;

		dispatch(filterByPrice(100));
	}, [dispatch, list]);
	return (
		<>
			<Poster />
			<Products products={list} amount={5} title="Trending" />
			<Categories
				categories={categories.list}
				amount={5}
				title="Worth seeing"
			/>
			<Banner />
			<Products products={filtered} amount={5} title="Less than 100$" />
		</>
	);
};

export default HomePage;
