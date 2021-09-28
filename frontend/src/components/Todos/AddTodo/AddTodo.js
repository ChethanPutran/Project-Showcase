import { useHistory } from 'react-router-dom';
import HttpService from '../../Services/http-services';
import useHttp from '../../hooks/use-http';
import Snackbar from '../../UI/Snackbar/Snackbar';
import TodoForm from '../TodoForm/TodoForm';

const AddTodo = (props) => {
	const history = useHistory();
	const httpService = new HttpService();
	const { sendRequest, status, error } = useHttp(httpService.addTodo);

	if (status === 'sucess') {
		history.push('/todos');
	}

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
