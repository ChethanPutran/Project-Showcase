import './Hero.css';
import { useSelector } from 'react-redux';
const Hero = (props) => {
	const user = useSelector((state) => state.auth.user);
	const addTodoHandler = () => {
		props.onClickAddTodo();
	};
	const loginHandler = () => {
		props.onClickLogin();
	};
	return (
		<>
			<div className='hero'>
				<div className='hero__decription'>
					{user
						? `Hello ${user.name}, Welcome to Todo `
						: 'Welcome to Todo'}
				</div>
				<div className='hero__btnBox centered'>
					{user ? (
						<button
							className='btn btn__primary hero__btn'
							onClick={addTodoHandler}>
							Add Todo
						</button>
					) : (
						<button
							className='btn btn__primary hero__btn'
							onClick={loginHandler}>
							Login for more fun
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Hero;
