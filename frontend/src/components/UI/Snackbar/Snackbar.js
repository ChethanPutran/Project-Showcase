import './Snackbar.css';
export default function Snackbar(props) {
	const classes = props.className
		? 'snackbar ' + props.className
		: 'snackbar';
	return <p className={classes}>{props.content}</p>;
}
