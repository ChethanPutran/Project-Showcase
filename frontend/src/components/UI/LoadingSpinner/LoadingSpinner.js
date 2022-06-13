import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
	let classes = props.className ? `spinner ${props.className}` : 'spinner';
	classes += ' ' + props.size;
	return <div className={classes}></div>;
};

export default LoadingSpinner;
