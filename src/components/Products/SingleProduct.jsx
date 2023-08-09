//@ts-nocheck
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductQuery } from '../../features/api/api-slice';

import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/products-slice';

const SingleProduct = () => {
	const { list, related } = useSelector(({ products }) => products);
	const dispatch = useDispatch();
	const { productId } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({
		productId,
	});

	useEffect(() => {
		if (!isLoading && !isFetching && !isSuccess) {
			navigate('/');
		}
	}, [isLoading, isFetching, isSuccess, navigate]);

	useEffect(() => {
		if (!data || !list.length) return;
		
		dispatch(getRelatedProducts(data.category.id));
		
	}, [data, dispatch, list.length]);

	return !isSuccess ? (
		<section className="preloader">Loading...</section>
	) : (
		<>
			<Product {...data} />
			<Products products={related} amount={5} title="Related" />
		</>
	);
};

export default SingleProduct;
