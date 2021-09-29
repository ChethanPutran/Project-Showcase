import './Navigation.css';
import { useContext, useRef } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';
import Snackbar from '../UI/Snackbar/Snackbar';
import { useSelector } from 'react-redux';

const Navigation = (props) => {
	const size = useSelector((state) => state.size);
	const authContext = useContext(AuthContext);
	const logoutBtn = useRef();
	const logoutHandler = () => {
		logoutBtn.current.className = 'nav__link nav__link__active';
		authContext.logout();
	};

	return (
		<>
			{authContext.error && <Snackbar content={authContext.error} />}

			<nav className='nav' ref={props.cartBtn}>
				<h1 className='nav__logoName'>Todo</h1>
				<ul className='nav__list'>
					<li className='nav__item'>
						<NavLink
							to='/home'
							className='nav__link'
							activeClassName='nav__link__active'>
							Home
						</NavLink>
					</li>

					{!authContext.user && (
						<li className='nav__item'>
							<NavLink
								to='/login'
								className='nav__link'
								activeClassName='nav__link__active'>
								Login
							</NavLink>
						</li>
					)}
					{authContext.user && (
						<>
							<li className='nav__item'>
								<NavLink
									to='/todos'
									className='nav__link'
									activeClassName='nav__link__active'>
									<span className='nav__todoBtn__content'>
										Todo's
									</span>
									<span className='nav__todoBtn__itemNum'>
										{size}
									</span>
								</NavLink>
							</li>
							<li className='nav__item'>
								<NavLink
									to='/addTodo'
									className='nav__link'
									activeClassName='nav__link__active'>
									Add Todo
								</NavLink>
							</li>
							{authContext.user && (
								<li className='nav__item'>
									<button
										className='nav__link'
										ref={logoutBtn}
										onClick={logoutHandler}>
										Logout
									</button>
								</li>
							)}
						</>
					)}
				</ul>
			</nav>
		</>
	);
};

export default Navigation;
