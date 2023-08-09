//@ts-nocheck
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './../../styles/Product.module.css';
import {
	addItemToCart,
	addItemToFavorites,
} from '../../features/user/user-slice';

const Product = (item) => {
	const { images, title, price, description } = item;

	const dispatch = useDispatch();

	const [currentImage, setCurrentImage] = useState();
	const [currentSize, setCurrentSize] = useState();

	useEffect(() => {
		if (!images.length) return;

		setCurrentImage(images[0]);
	}, [images]);

	const addToCart = () => {
		dispatch(addItemToCart(item));
	};
	const addToFavorites = () => {
		dispatch(addItemToFavorites(item));
	};

	return (
		<section className={styles.product}>
			<div className={styles.images}>
				<div
					className={styles.current}
					style={{ backgroundImage: `url(${currentImage})` }}
				/>

				<div className={styles['images-list']}>
					{images.map((image, i) => (
						<div
							className={styles.image}
							key={i}
							style={{ backgroundImage: `url(${image})` }}
							onClick={() => setCurrentImage(image)}
						/>
					))}
				</div>
			</div>

			<div className={styles.info}>
				<h1 className={styles.title}>{title}</h1>

				<div className={styles.price}>{price}$</div>

				<div className={styles.color}>
					<span>Color: </span> Green
				</div>

				<div className={styles.sizes}>
					<span>Size: </span>
					<div className={styles.list}>
						{['S', 'M', 'L', 'XL'].map((size) => (
							<div
								className={`${styles.size} ${
									currentSize === size ? styles.active : ''
								}`}
								onClick={() => setCurrentSize(size)}
								key={size}
							>
								{size}
							</div>
						))}
					</div>
				</div>

				<p className={styles.description}>{description}</p>

				<div className={styles.actions}>
					<button
						className={styles.add}
						disabled={!currentSize}
						onClick={addToCart}
					>
						Add to cart
					</button>
					<button className={styles.favorite} onClick={addToFavorites}>
						Add to favorites
					</button>
				</div>

				<div className={styles.bottom}>
					<div className={styles.purchase}>
						{Math.floor(Math.random() * 100 + 1)} people purchased
					</div>

					<Link to="/">Return to store</Link>
				</div>
			</div>
		</section>
	);
};

export default Product;
