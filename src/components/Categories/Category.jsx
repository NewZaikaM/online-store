//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetProductsQuery } from '../../features/api/api-slice';

import styles from './../../styles/Category.module.css';
import Products from '../Products/Products';

const Category = () => {
	const { categoryId } = useParams();
	const { list } = useSelector(({ categories }) => categories);

	const defaultValues = {
		title: '',
		price_min: 0,
		price_max: 0,
	};
	const defaultParams = {
		...defaultValues,
		categoryId,
		limit: 5,
		offset: 0,
	};

	const [isEnd, setIsEnd] = useState(false);
	const [cat, setCat] = useState(null);
	const [items, setItems] = useState([]);
	const [values, setValues] = useState(defaultValues);
	const [params, setParams] = useState(defaultParams);

	const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

	useEffect(() => {
		if (!categoryId || !list.length) return;

		const category = list.find((item) => item.id === categoryId * 1);

		setCat(category);
	}, [categoryId, list.length]);

	useEffect(() => {
		if (isLoading) return;

		if (!data.length) return setIsEnd(true);

		setItems((_items) => [..._items, ...data]);
	}, [isLoading, data]);

	useEffect(() => {
		if (!categoryId) return;

    setItems([]);
		setIsEnd(false);
    setValues(defaultValues)
		setParams({ ...defaultParams, categoryId });
	}, [categoryId]);

	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		setItems([]);
		setIsEnd(false);
		setParams({ ...defaultParams, ...values });
	};

	const handleReset = () => {
		setValues(defaultValues);
		setParams(defaultParams);
		setIsEnd(false);
	
	}

	return (
		<section className={styles.wrapper}>
			<h2 className={styles.title}>{cat?.name}</h2>
			<form className={styles.filters} onSubmit={handleSubmit}>
				<div className={styles.filter}>
					<input
						type="text"
						name="title"
						placeholder="Product name"
						onChange={handleChange}
						value={values.title}
					/>
				</div>
				<div className={styles.filter}>
					<input
						type="number"
						name="price_min"
						placeholder="Min"
						onChange={handleChange}
						value={values.price_min}
					/>
					<span>Price from</span>
				</div>
				<div className={styles.filter}>
					<input
						type="number"
						name="price_max"
						placeholder="Max"
						onChange={handleChange}
						value={values.price_max}
					/>
					<span>Price to</span>
				</div>

				<button type="submit" hidden />
			</form>

			{isLoading ? (
				<div className="preloader">Loading...</div>
			) : !isSuccess || !items.length ? (
				<div className={styles.back}>
					<span>No results</span>
					<button onClick={handleReset}>Reset</button>
				</div>
			) : (
				<Products
					products={items}
					style={{ padding: 0 }}
					amount={items.length}
				/>
			)}

			{!isEnd && (
				<div className={styles.more}>
					<button
						onClick={() =>
							setParams({ ...params, offset: params.offset + params.limit })
						}
					>
						See more
					</button>
				</div>
			)}
		</section>
	);
};

export default Category;
