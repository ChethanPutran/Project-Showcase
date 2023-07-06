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
	const size = useSelector((state) => state.todo.size);
	const logoutHandler = () => {
		dispatch(logout());
	};

	const todoHandler = () => {
		closeMenu();
		props.onClickTodos();
	};
	const addtodoHandler = () => {
		closeMenu();
		props.onClickAddTodo();
	};
	const loginHandler = () => {
		closeMenu();
		props.onClickLogin();
	};

	return (
		<>
			<nav className='nav' ref={props.cartBtn}>
				<h1 className='nav__logoName'>
					<span className='letter-left'>To</span>
					<span className='letter-right'>do</span>
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
									onClick={todoHandler}>
									Todos
									{size > 0 && (
										<span className='nav__todoBtn__itemNum'>
											{size}
										</span>
									)}
								</button>
							</li>
							<li className='nav__item'>
								<button
									className='nav__link'
									onClick={addtodoHandler}>
									Add Todo
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
