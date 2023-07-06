import './Navigation.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth';
import { useState } from 'react';

const Navigation = (props) => {
	const [showMenu, setShowMenu] = useState(false);

	const closeMenu = () => {
		setShowMenu(false);
	};
	const openMenu = () => {
		setShowMenu(true);
	};
	const dispatch = useDispatch();
	const size = useSelector((state) => state.project.size);
	const logoutHandler = () => {
		dispatch(logout());
	};

	const projectHandler = () => {
		closeMenu();
		props.onClickProjects();
	};
	const addprojectHandler = () => {
		closeMenu();
		props.onClickAddProject();
	};
	const loginHandler = () => {
		closeMenu();
		props.onClickLogin();
	};

	return (
		<>
			<nav className='nav' ref={props.cartBtn}>
				<h1 className='nav__logoName'>
					<span className='letter-left'>Project</span>
					<span className='letter-right'>Showcase</span>
				</h1>
				<ul className={showMenu ? 'nav__list show-meu' : 'nav__list'}>
					{!props.is_authenticated && (
						<li className='nav__item'>
							<button
								className='nav__link'
								onClick={loginHandler}>
								Login
							</button>
						</li>
					)}
					{props.is_authenticated && (
						<>
							<li className='nav__item'>
								<button
									className='nav__link'
									onClick={projectHandler}>
									Projects
									{size > 0 && (
										<span className='nav__projectBtn__itemNum'>
											{size}
										</span>
									)}
								</button>
							</li>
							<li className='nav__item'>
								<button
									className='nav__link'
									onClick={addprojectHandler}>
									Add Project
								</button>
							</li>
							<li className='nav__item'>
								<button
									className='nav__link'
									onClick={logoutHandler}>
									Logout
								</button>
							</li>
						</>
					)}
				</ul>

				<button
					className={
						showMenu ? 'btn-open-menu hide-btn' : 'btn-open-menu'
					}
					onClick={openMenu}>
					<ion-icon name='menu-outline' class='open-icon'></ion-icon>
				</button>
				<button
					className={
						showMenu ? 'btn-close-menu show-btn' : 'btn-close-menu'
					}>
					<ion-icon
						name='close-outline'
						class='close-icon'
						onClick={closeMenu}></ion-icon>
				</button>
			</nav>
		</>
	);
};

export default Navigation;
