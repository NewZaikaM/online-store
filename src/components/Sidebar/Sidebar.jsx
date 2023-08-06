import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectors } from '../../features/store';

import styles from './../../styles/Sidebar.module.css';

const Sidebar = () => {
	const allCategories = useSelector(selectors.selectCategoriesList);
	return (
		<aside className={styles.sidebar}>
			<div className={styles.title}>CATEGORIES</div>
			<nav> 
				<ul className={styles.menu}>
					{allCategories.map((category) => (
						<li key={category.id}>
							<NavLink
								className={({ isActive }) =>
									`${styles.link}	${isActive ? styles.active : ''}`
								}
								to={`/categories/${category.id}`}
							>
								{category.name}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.footer}>
				<a href="/help" target="_blank" className={styles.link}>
					Help
				</a>
				<a
					href="/terms"
					target="_blank"
					className={styles.link}
					style={{ textDecoration: 'underline' }}
				>
					Terms & Conditions
				</a>
			</div>
		</aside>
	);
};

export default Sidebar;
