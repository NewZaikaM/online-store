import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleForm, toggleFormType } from '../../features/user/user-slice';

import styles from './../../styles/User.module.css';

import UserSignUpForm from './UserSignUpForm';
import UserLoginForm from './UserLoginForm';

const UserForm = () => {
	const { isShownForm, formType } = useSelector(({ user }) => user);
	const dispatch = useDispatch();

	const closeForm = () => {
		dispatch(toggleForm(false));
	};
  const toggleCurrentFormType = (type) => {
		dispatch(toggleFormType(type));
	};

	return isShownForm ? (
		<>
			<div className={styles.overlay} onClick={closeForm} />
			{formType === 'signup' && <UserSignUpForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType} />}
			{formType === 'login' && <UserLoginForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType} />}
		</>
	) : (
		<></>
	);
};

export default UserForm;
