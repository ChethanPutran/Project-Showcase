import TodoForm from '../TodoForm/TodoForm';
import Snackbar from '../../UI/Snackbar/Snackbar';
import HttpService from '../../Services/http-services';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { refresh_todos } from '../../../store/todo';
import { useState } from 'react';
import Modal from '../../UI/Modal/Modal';

export default function EditTodo(props) {
	const dispatch = useDispatch();
	const [isloading, setIsLoading] = useState(false);
	const [message, setMessage] = useState({ status: null, message: null });

	const updateTodo = async (data, id) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.updateTodo({ id, content: data });

			setMessage((pre) => {
				return {
					status: 'sucess',
					message: res.data.message,
				};
			});
		} catch (err) {
			console.log(err);
			setMessage((pre) => {
				return { status: 'error', message: err.message };
			});
		}

		setIsLoading(false);
		setTimeout(() => {
			props.closeModalHandler();
		}, 2000);
		setTimeout(() => {
			dispatch(refresh_todos());
		}, 2000);
	};

	return (
		<>
			<Modal
				className={props.className}
				backdropHandler={props.closeModalHandler}>
				{isloading && (
					<div className='loading'>
						<LoadingSpinner />
					</div>
				)}
				{message.status && (
					<Snackbar content={message.message} type={message.status} />
				)}
				<TodoForm
					getData={updateTodo}
					id={props.todo.id}
					content={{
						title: props.todo.title,
						description: props.todo.description,
						completed: !!props.todo.completed,
					}}
					isLoading={isloading}
					type='Update Todo'
				/>
			</Modal>
		</>
	);
}
