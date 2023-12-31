//@ts-nocheck
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from './../../images/logo.svg';
import avatar from './../../images/avatar.jpg';
import { toggleForm } from './../../features/user/user-slice';

import styles from './../../styles/Header.module.css';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../features/api/api-slice';

const Header = () => {
	const { currentUser, cart } = useSelector(({ user }) => user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [values, setValues] = useState({ name: 'Guest', avatar: avatar });
	const [searchValue, setSearchValue] = useState('');

	const { data, isLoading } = useGetProductsQuery({ title: searchValue });

	useEffect(() => {
		if (!currentUser) return;

		setValues({ name: currentUser.name, avatar: currentUser.avatar });
	}, [currentUser]);

	const handleClick = () => {
		if (!currentUser) {
			dispatch(toggleForm(true));
		} else {
			navigate('/profile');
		}
	};

	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value);
	};

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link to="/">
					<img src={logo} alt="stuff_logo" />
				</Link>
			</div>

			<div className={styles.info}>
				<div className={styles.user} onClick={handleClick}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${values.avatar})` }}
					/>
					<div className={styles.username}>{values.name}</div>
				</div>

				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className="icon">
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
						</svg>
					</div>
					<div className={styles.input}>
						<input
							type="search"
							name="search"
							placeholder="Search for anything..."
							autoComplete="off"
							onChange={handleSearch}
							value={searchValue}
						/>
					</div>
					{searchValue && (
						<div className={styles.box}>
							{isLoading
								? 'Loading...'
								: !data.length
								? 'No results'
								: data.map(({ title, images, id }) => (
										<Link key={id} onClick={() => setSearchValue('')} className={styles.item} to={`/products/${id}`}>
											<div
												className={styles.image}
												style={{ backgroundImage: `url(${images[0]})` }}
											/>
											<div className={styles.title}>{title}</div>
										</Link>
								  ))}
						</div>
					)}
				</form>
				{/*  */}
				<div className={styles.account}>
					<NavLink
						to="/favorites"
						className={({ isActive }) =>
							`${styles.favorites} ${isActive ? styles.active : ''}`
						}
					>
						<svg className={styles['icon-fav']}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
						</svg>
					</NavLink>
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							`${styles.cart} ${isActive ? styles.active : ''}`
						}
					>
						<svg className={styles['icon-cart']}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
						</svg>
						
						{!!cart.length && <span className={styles.count}>{cart.length}</span>}
					</NavLink>
				</div>
			</div>
		</header>
	);
};

export default Header;
