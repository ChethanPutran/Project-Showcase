import './Hero.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';

const Hero = (props) => {
	const authContext = useContext(AuthContext);
	return (
		<>
			<div className='hero'>
				<div className='hero__decription'>
					{authContext.user && `Welcome ${authContext.user.name}`}
					{!authContext.user && 'Welcome to Todo'}
				</div>
				<div className='hero__btnBox centered'>
					{authContext.user ? (
						<Link
							className='btn btn__primary hero__btn'
							to='/addTodo'>
							Add Todo
						</Link>
					) : (
						<Link
							className='btn btn__primary hero__btn'
							to='/login'>
							Login for more fun
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default Hero;
