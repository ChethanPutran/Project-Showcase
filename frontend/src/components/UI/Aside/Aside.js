import './Aside.css';
export default function Aside(params) {
	return (
		<aside className={'aside ' + params.className + ` ${params.position}`}>
			{params.children}
		</aside>
	);
}
