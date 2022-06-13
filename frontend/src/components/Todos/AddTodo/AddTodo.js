import TodoForm from '../TodoForm/TodoForm';
import HttpService from '../../Services/http-services';
import Snackbar from '../../UI/Snackbar/Snackbar';
import Aside from '../../UI/Aside/Aside';
import { useDispatch } from 'react-redux';
import { refresh_todos } from '../../../store/todo';
import { useState } from 'react';
import Button from '../../UI/Button/Button';

const AddTodo = (props) => {
	const [isloading, setIsLoading] = useState(false);
	const [message, setMessage] = useState({ status: null, message: null });

	const dispatch = useDispatch();

	const addTodo = async (data) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.addTodo(data);
			console.log(res);

			setMessage((pre) => {
				return {
					status: 'sucess',
					message: res.data.message,
				};
			});
		} catch (err) {
			setMessage((pre) => {
				return { status: 'error', message: err.message };
			});
		}
		setIsLoading(false);
		setTimeout(() => {
			dispatch(refresh_todos());
		}, 2000);
	};

	return (
		<Aside position={'left'} className={props.className}>
			<Button className='btn-close' onClick={props.closeAddTodo}>
				<ion-icon
					name='close-outline'
					className='close-icon'></ion-icon>
			</Button>
			{message.message && (
				<Snackbar content={message.message} type={message.type} />
			)}
			<TodoForm getData={addTodo} isLoading={isloading} type='Add Todo' />
		</Aside>
	);
};

export default AddTodo;
