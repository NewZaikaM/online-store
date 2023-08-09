const BASE = 'https://api.escuelajs.co/api/v1';
const FOR_CATEGORIES = `${BASE}/categories`;
const FOR_PRODUCTS = `${BASE}/products`;
const FOR_CREATING_USER = `${BASE}/users`;
const FOR_UPDATING_USER = (id) => `${BASE}/users/${id}`;
const FOR_LOGIN_USER = `${BASE}/auth/login`;
const FOR_ACCESS_USER = `${BASE}/auth/profile`;

export const ENDIPOINTS = {
	BASE,
	FOR_CATEGORIES,
	FOR_PRODUCTS,
	FOR_CREATING_USER,
	FOR_UPDATING_USER,
	FOR_LOGIN_USER,
	FOR_ACCESS_USER
};
