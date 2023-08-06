//@ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

import logo from './../../images/logo.svg';

import styles from './../../styles/Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.logo}>
				<Link to="/">
					<img src={logo} alt="stuff_logo" />
				</Link>
			</div>

			<div className={styles.rights}>
				Developev by Maxim Zaika{' '}
				<a
					href="https://github.com/NewZaikaM/online-store.git"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</div>

			<div className={styles.socials}>
				<a href="https://instagram.com" target="_blank" rel="noreferrer">
					<svg>
						<use xlinkHref="sprite.svg#instagram" />
					</svg>
				</a>
				<a href="https://facebook.com" target="_blank" rel="noreferrer">
					<svg>
						<use xlinkHref="sprite.svg#facebook" />
					</svg>
				</a>
				<a href="https://youtube.com" target="_blank" rel="noreferrer">
					<svg>
						<use xlinkHref="sprite.svg#youtube" />
					</svg>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
