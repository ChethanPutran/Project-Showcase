import React from 'react';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

import TodoList from './Todo/TodoList';
import Snackbar from '../UI/Snackbar/Snackbar';

const Todos = (props) => {
	if (props.status === 'pending') {
		return (
			<div className='loading'>
				<LoadingSpinner />
			</div>
		);
	}

	if (props.status === 'failed') {
		return (
			<>
				{props.error.message && (
					<Snackbar content={props.error.message} />
				)}

				<div className='centered vcenter'>
					<p className='app__warning'>{props.error.message}</p>
				</div>
			</>
		);
	}

	if (props.status === 'sucess' && props.todos.length > 0) {
		return (
			<div className='centered'>
				<TodoList todos={props.todos} />
			</div>
		);
	} else {
		return <p className='app__warning'>No todos found!!!</p>;
	}
};

export default Todos;
