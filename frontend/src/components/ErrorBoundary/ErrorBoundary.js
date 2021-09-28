import { Component } from 'react';

class ErrorBoundary extends Component {
	//Handling errors

	constructor() {
		super();
		this.state = { hasError: false, error: '' };
	}
	componentDidCatch(error) {
		console.log(error);
		this.setState({ hasError: false, error: error });
	}

	render() {
		if (this.state.hasError) {
			return <p>Something went wrong!</p>;
		}
		return this.props.children;
	}
}
export default ErrorBoundary;
