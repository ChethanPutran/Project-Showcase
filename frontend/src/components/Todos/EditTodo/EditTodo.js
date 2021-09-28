import { useHistory, useLocation } from 'react-router';
import TodoForm from '../TodoForm/TodoForm';
import Snackbar from '../../UI/Snackbar/Snackbar';
import HttpService from '../../Services/http-services';
import useHttp from '../../hooks/use-http';
import { useCallback } from 'react';

export default function EditTodo(props) {
	const location = useLocation();
	const history = useHistory();

	const httpService = new HttpService();
	const { sendRequest, status, error } = useHttp(httpService.updateTodo);

	const formDataHandler = useCallback(
		(data, id) => {
			sendRequest({ id, content: data });
		},
		[sendRequest]
	);
	let todo = {};
	let searchParams = new URLSearchParams(location.search);
	for (const [key, value] of searchParams) {
		todo[key] = value;
	}

	if (!todo.title || !todo.description) {
		history.replace('/addTodo');
	}

	if (status === 'sucess') {
		history.push('/todos');
	}

	return (
		<>
			{error && <Snackbar content={error.message} />}
			<TodoForm
				getData={formDataHandler}
				id={todo.id}
				content={{
					title: todo.title,
					description: todo.description,
					completed: !!todo.completed,
				}}
				isLoading={false}
				type='Update Todo'
			/>
		</>
	);
}
