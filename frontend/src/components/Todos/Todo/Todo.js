import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import './Todo.css';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Snackbar from '../../UI/Snackbar/Snackbar';
import HttpService from '../../Services/http-services';
import InfoModal from '../../UI/Modal/InfoModal/InfoModal';

import { useDispatch } from 'react-redux';
import { refresh_todos } from '../../../store/todo';

const Todo = (props) => {
	const dispatch = useDispatch();
	const todo = {
		id: props.id,
		title: props.title,
		description: props.description,
		completed: props.completed,
	};

	const [confirmation, setConfirmation] = useState(false);
	const [message, setMessage] = useState({ type: null, message: null });
	const [isLoading, setIsLoading] = useState(false);

	const clearConfirmation = () => {
		setConfirmation(false);
	};

	const confirmDeleteHandler = () => {
		clearConfirmation();
		deleteTodo(props.id);
	};

	const deleteTodo = async (id) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.deleteTodo(id);
			console.log(res);
			setMessage({ type: 'sucess', message: res.data.message });
		} catch (err) {
			console.log(err);
			setMessage({ type: 'failure', message: err.message });
		}
		setIsLoading(false);
		setTimeout(() => {
			dispatch(refresh_todos());
		}, 4000);
	};
	const updateTodoStatus = async (id) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.updateTodoStatus(id);
			setMessage({ type: 'sucess', message: res.data.message });
		} catch (err) {
			console.log(err);
			setMessage({ type: 'failure', message: err.message });
		}
		setIsLoading(false);
		setTimeout(() => {
			dispatch(refresh_todos());
		}, 2000);
	};

	const editTodoHandler = () => {
		console.log(todo);
		props.onEditTodo(todo);
	};

	const deleteTodoHandler = () => {
		setConfirmation(true);
	};

	const date = new Date(props.createdAt);
	const createdAt =
		date.toLocaleDateString('en-US') +
		'\t' +
		date.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
		});

	return (
		<>
			{confirmation && (
				<InfoModal
					title='Warning!'
					message="Are you sure you want to delete todo?This can't be undone!"
					onConfirm={confirmDeleteHandler}
					onUndo={clearConfirmation}
				/>
			)}

			{message.message && (
				<Snackbar content={message.message} type={message.type} />
			)}
			<div className='todo' title='Todo'>
				{isLoading && (
					<div className='loading'>
						<LoadingSpinner size={'small'} />
					</div>
				)}
				{}
				<header className='todo__header'>
					<div className='todo__header--top'>
						<h3 className='todo__title' title='Todo title'>
							{props.title}
						</h3>
						<span className='todo__date'>{createdAt}</span>
					</div>

					<p
						className={`status__label ${
							props.completed
								? 'status__complete'
								: 'status__incomplete'
						}`}
						title='Status'>
						{props.completed ? 'completed' : 'incomplete'}
					</p>
				</header>
				<main>
					<p className='todo__description' title='Description'>
						{props.description}
					</p>
				</main>
				<footer className='todo__btnBox'>
					<div>
						<Button
							className='todo__btn'
							title={
								props.completed
									? 'Click to activate'
									: 'Click to finish'
							}
							onClick={updateTodoStatus.bind(null, props.id)}>
							{props.completed ? 'Activate' : 'Finish'}
						</Button>
					</div>
					<div>
						<Button
							className='todo__btn btn__tirtiary'
							title='Click to edit'
							onClick={editTodoHandler}>
							<i className='fas fa-edit btnIcon'></i>
						</Button>
						<Button
							className='todo__btn btn__danger'
							title='Click to delete'
							onClick={deleteTodoHandler}>
							<i className='far fa-trash-alt btnIcon'></i>
						</Button>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Todo;
