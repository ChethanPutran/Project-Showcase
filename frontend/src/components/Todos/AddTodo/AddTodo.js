import { useHistory } from 'react-router-dom';
import Snackbar from '../../UI/Snackbar/Snackbar';
import TodoForm from '../TodoForm/TodoForm';
import { useDispatch, useSelector } from 'react-redux';
import updateTodos, { addTodo } from '../../../store/index';

const AddTodo = (props) => {
	const history = useHistory();
	const status = useSelector((state) => state.status);
	const error = useSelector((state) => state.error);
	const dispatch = useDispatch();

	if (status === 'sucess') {
		history.push('/todos');
		dispatch(updateTodos());
	}
	const sendRequest = (todo) => {
		dispatch(addTodo(todo));
	};

	return (
		<>
			{error && <Snackbar content={error.message} />}
			<TodoForm
				getData={sendRequest}
				isLoading={status === 'pending'}
				type='Add Todo'
			/>
		</>
	);
};

export default AddTodo;
