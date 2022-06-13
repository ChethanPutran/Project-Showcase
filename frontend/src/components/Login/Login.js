import './Login.css';
import googleLogo from '../../assets/google-logo.png';
import Modal from '../UI/Modal/Modal';

export default function Login(props) {
	const login = (event) => {
		window.open('http://localhost:3004/users/auth/google', '_self');
	};
	const modalClickHandler = () => {
		props.onClickBackdrop();
	};

	return (
		<Modal backdropHandler={modalClickHandler}>
			<div className='loginBox' onClick={login}>
				<div className='loginBox__imageBox'>
					<img
						src={googleLogo}
						alt='google-icon.png'
						className='loginBox__image'
					/>
				</div>
				<div className='loginBox__textBox'>
					<p className='loginBox__text'>Login with Google</p>
				</div>
			</div>
		</Modal>
	);
}
