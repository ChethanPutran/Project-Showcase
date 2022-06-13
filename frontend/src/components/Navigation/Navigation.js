import './Navigation.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth';

const Navigation = (props) => {
	const dispatch = useDispatch();
	const size = useSelector((state) => state.todo.size);
	const logoutHandler = () => {
		dispatch(logout());
	};

	const todoHandler = () => {
		props.onClickTodos();
	};
	const addtodoHandler = () => {
		props.onClickAddTodo();
	};
	const loginHandler = () => {
		props.onClickLogin();
	};

	return (
		<>
			<nav className='nav' ref={props.cartBtn}>
				<h1 className='nav__logoName'>
					<span className='letter-left'>To</span>
					<span className='letter-right'>do</span>
				</h1>
				<ul className='nav__list'>
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
			</nav>
		</>
	);
};

export default Navigation;
