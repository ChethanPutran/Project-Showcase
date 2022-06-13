import './App.css';
import Navigation from '../components/Navigation/Navigation';
import AddTodo from '../components/Todos/AddTodo/AddTodo';
import Todos from '../components/Todos/Todo/Todos';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import EditTodo from '../components/Todos/EditTodo/EditTodo';
import { check_auth } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { refresh_todos } from '../store/todo';
import Snackbar from '../components/UI/Snackbar/Snackbar';
import Hero from '../components/Layout/Hero';
import Login from '../components/Login/Login';

function App() {
	const dispatch = useDispatch();
	const is_authenticated = useSelector(
		(state) => state.auth.is_authenticated
	);
	const error = useSelector((state) => state.todo.error);
	const message = useSelector((state) => state.todo.message);
	const status = useSelector((state) => state.todo.status);

	const [isOpenTodo, setIsOpenTodo] = useState(false);
	const [isOpenAddTodo, setIsOpenAddTodo] = useState(false);
	const [isOpenEditTodo, setIsOpenEditTodo] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		dispatch(check_auth());
		dispatch(refresh_todos());
	}, [dispatch]);

	const todoHandler = () => {
		setIsOpenTodo((preState) => !preState);
	};
	const addTodoHandler = () => {
		setIsOpenAddTodo((preState) => !preState);
	};
	const openLogin = () => {
		setIsOpen(true);
	};
	const closeLogin = () => {
		setIsOpen(false);
	};

	if (status === 'pending') {
		return (
			<div className='loading dark'>
				<LoadingSpinner />
			</div>
		);
	}
	return (
		<ErrorBoundary>
			<div className='App'>
				{status === 'failed' && error && (
					<Snackbar content={error.message} type={'failure'} />
				)}
				{message && <Snackbar content={message} type={'sucess'} />}
				<Navigation
					is_authenticated={is_authenticated}
					onClickTodos={todoHandler}
					onClickAddTodo={addTodoHandler}
					onClickLogin={openLogin}
				/>
				{isOpen && <Login onClickBackdrop={closeLogin} />}
				<Hero
					onClickAddTodo={addTodoHandler}
					onClickLogin={openLogin}
				/>

				{is_authenticated && (
					<>
						<Todos className={isOpenTodo ? 'show' : 'hide'} />

						<AddTodo className={isOpenAddTodo ? 'show' : 'hide'} />

						<EditTodo
							className={isOpenEditTodo ? 'show' : 'hide'}
						/>
					</>
				)}
			</div>
		</ErrorBoundary>
	);
}

export default App;
