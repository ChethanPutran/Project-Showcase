import { Route } from 'react-router';
import './App.css';
import Hero from './components/Layout/Hero';
import Navigation from './components/Navigation/Navigation';
import { Redirect, Switch } from 'react-router';
import AddTodo from './components/Todos/AddTodo/AddTodo';
import Todos from './components/Todos/Todos';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import { useContext, useEffect } from 'react';
import { AuthContext } from './store/auth-context';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import EditTodo from './components/Todos/EditTodo/EditTodo';
import { useDispatch } from 'react-redux';
import getTodos from './store';
import { useSelector } from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const authContext = useContext(AuthContext);

	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	const data = useSelector((state) => state.todos);
	const error = useSelector((state) => state.error);
	const status = useSelector((state) => state.status);
	if (status === 'pending') {
		return (
			<div className='loading dark'>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className='App'>
			{authContext.isLoading && (
				<div className='loading dark'>
					<LoadingSpinner />
				</div>
			)}
			<Navigation />
			<Switch>
				<Route path='/' exact>
					<Redirect to='/home/' />
				</Route>
				<Route path='/home' exact>
					<Hero />
				</Route>

				{authContext.user && (
					<>
						<Route path='/todos' exact>
							<Todos
								todos={[...data]}
								error={error}
								status={status}
							/>
						</Route>
						<Route path='/addTodo'>
							<AddTodo />
						</Route>
						<Route path='/edit'>
							<EditTodo />
						</Route>
					</>
				)}
				{!authContext.user && (
					<>
						<Route path='/login' exact>
							<Login />
						</Route>
					</>
				)}

				<Route path='*'>
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
