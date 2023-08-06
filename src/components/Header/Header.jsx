//@ts-nocheck
import { Link, NavLink } from 'react-router-dom';

import logo from './../../images/logo.svg';
import avatar from './../../images/avatar.jpg';

import styles from './../../styles/Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link to="/">
					<img src={logo} alt="stuff_logo" />
				</Link>
			</div>

			<div className={styles.info}>
				<div className={styles.user}>
					<div
						className={styles.avatar}
						style={{ backgroundImage: `url(${avatar})` }}
					/>
					<div className={styles.username}>Guest</div>
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
							onChange={() => {}}
							value={''}
						/>
					</div>
					{false && <div className={styles.box}></div>}
				</form>
				{/*  */}
				<div className={styles.account}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							`${styles.favourites} ${isActive ? styles.active : ''}`
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
						<span className={styles.count}>2</span>
					</NavLink>
				</div>
			</div>
		</header>
	);
};

export default Header;
