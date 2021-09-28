import React, { useCallback } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import HttpService from '../Services/http-services';
import useHttp from '../hooks/use-http';
import { useEffect } from 'react';
import TodoList from './Todo/TodoList';
import Snackbar from '../UI/Snackbar/Snackbar';

const Todos = (props) => {
	const httpService = new HttpService();
	const { sendRequest, status, error, data } = useHttp(
		httpService.getTodos,
		true
	);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	const updateTodos = useCallback(() => {
		sendRequest();
	}, [sendRequest]);

	if (status === 'pending') {
		return (
			<div className='loading'>
				<LoadingSpinner />
			</div>
		);
	}

	if (status === 'failed') {
		return (
			<>
				<Snackbar content={error.message} />

				<div className='centered vcenter'>
					<p className='app__warning'>{error.message}</p>
				</div>
			</>
		);
	}

	if (status === 'sucess' && data.length > 0) {
		props.setTodosSize(data.length);
		return (
			<div className='centered'>
				{error && <p className='snackbar'>{error}</p>}
				<TodoList todos={data} onChangeTodo={updateTodos} />
			</div>
		);
	} else {
		return <p className='app__warning'>No todos found!!!</p>;
	}
};

export default Todos;
