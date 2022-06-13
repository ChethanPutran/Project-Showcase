import TodoForm from '../TodoForm/TodoForm';
import Snackbar from '../../UI/Snackbar/Snackbar';
import HttpService from '../../Services/http-services';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { refresh_todos, todoActions } from '../../../store/todo';
import Aside from '../../UI/Aside/Aside';

export default function EditTodo(props) {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.todo.status);
	const error = useSelector((state) => state.todo.error);

	const updateTodo = async (data, id) => {
		const httpService = new HttpService();
		try {
			await httpService.updateTodo({ id, content: data });
			dispatch(todoActions.setStatus('sucess'));
			dispatch(refresh_todos());
		} catch (err) {
			dispatch(todoActions.setStatus('failed'));
			dispatch(todoActions.setError(error));
		}
	};

	const todo = {};
	const searchParams = [];

	for (const [key, value] of searchParams) {
		todo[key] = value;
	}

	if (!todo.title || !todo.description) {
	}

	if (status === 'pending') {
		return (
			<div className='loading'>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<>
			<Aside position={'bottom'} className={props.className}>
				{error && <Snackbar content={error.message} />}
				<TodoForm
					getData={updateTodo}
					id={todo.id}
					content={{
						title: todo.title,
						description: todo.description,
						completed: !!todo.completed,
					}}
					isLoading={status === 'pending'}
					type='Update Todo'
				/>
			</Aside>
		</>
	);
}
