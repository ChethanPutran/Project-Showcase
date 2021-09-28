import './Button.css';

const Button = (props) => {
	const data = { ...props };
	data.className = 'btn btn__primary ' + props.className;

	return <button {...data}></button>;
};

export default Button;
