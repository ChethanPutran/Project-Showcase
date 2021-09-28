import './Login.css';
import Card from '../UI/Card/Card';
import googleLogo from '../../assets/google-logo.png';

export default function Login(props) {
	const login = (event) => {
		window.open('http://localhost:3004/users/auth/google', '_self');
	};

	return (
		<div className='centered margin__top--l'>
			<Card className='loginCard'>
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
			</Card>
		</div>
	);
}
