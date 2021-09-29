import React, { useCallback, useState } from 'react';
import Button from '../../UI/Button/Button';
import './Todo.css';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Snackbar from '../../UI/Snackbar/Snackbar';
import HttpService from '../../Services/http-services';
import { useHistory } from 'react-router';
import InfoModal from '../../UI/Modal/InfoModal/InfoModal';
import { useDispatch } from 'react-redux';
import updateTodos from '../../../store/index';

const Todo = (props) => {
	const todo = {
		title: props.title,
		description: props.description,
		completed: props.completed,
	};

	const dispatch = useDispatch();
	const history = useHistory();
	const [confirmation, setConfirmation] = useState(false);
	const clearConfirmation = () => {
		setConfirmation(false);
	};

	const confirmDeleteHandler = () => {
		clearConfirmation();
		deleteTodo(props.id);
	};
	const httpService = new HttpService();

	const {
		sendRequest: deleteTodo,
		status: deleteStatus,
		error: deleteError,
	} = useHttp(httpService.deleteTodo);
	const {
		sendRequest: changeStatus,
		status,
		error,
	} = useHttp(httpService.updateTodoStatus);

	const editTodoHandler = (id) => {
		const search = `?id=${id}&&completed=${todo.completed}&&title=${todo.title}&&description=${todo.description}`;
		history.push({
			pathname: '/edit',
			search,
		});
	};

	const deleteTodoHandler = (id) => {
		setConfirmation(true);
	};
	const changeTodoStatusHandler = useCallback(
		({ id, completed }) => {
			changeStatus({ id, completed });
		},
		[changeStatus]
	);
	if (status === 'sucess' || deleteStatus === 'sucess') {
		dispatch(updateTodos());
	}
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
			{(deleteError || error) && <Snackbar />}
			<div className='todo' title='Todo'>
				{(deleteStatus === 'pending' || status === 'pending') && (
					<LoadingSpinner />
				)}
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
							onClick={changeTodoStatusHandler.bind(null, {
								id: props.id,
								completed: !props.completed,
							})}>
							{props.completed ? 'Activate' : 'Finish'}
						</Button>
					</div>
					<div>
						<Button
							className='todo__btn btn__tirtiary'
							title='Click to edit'
							onClick={editTodoHandler.bind(null, props.id)}>
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
