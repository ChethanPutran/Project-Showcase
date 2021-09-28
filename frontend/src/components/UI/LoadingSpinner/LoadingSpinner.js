import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
	const classes = props.className ? `spinner ${props.className}` : 'spinner';
	return <div className={classes}></div>;
};

export default LoadingSpinner;
