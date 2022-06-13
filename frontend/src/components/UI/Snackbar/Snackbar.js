import './Snackbar.css';
export default function Snackbar(props) {
	let classes = props.className ? 'snackbar ' + props.className : 'snackbar';
	classes += ' ' + props.type;
	return <p className={classes}>{props.content}</p>;
}
