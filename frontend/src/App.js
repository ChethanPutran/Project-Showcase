import { Route } from 'react-router';
import './App.css';
import Hero from './components/Layout/Hero';
import Navigation from './components/Navigation/Navigation';
import { Redirect, Switch } from 'react-router';
import AddTodo from './components/Todos/AddTodo/AddTodo';
import Todos from './components/Todos/Todos';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import { useContext } from 'react';
import { AuthContext } from './store/auth-context';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import EditTodo from './components/Todos/EditTodo/EditTodo';

function App() {
	let sizeHandler;
	const authContext = useContext(AuthContext);

	const setTodosSizeHandler = (size) => {
		sizeHandler(size);
	};
	const onSizeChangeHandler = (setSize) => {
		sizeHandler = setSize;
	};

	return (
		<div className='App'>
			{authContext.isLoading && (
				<div className='loading dark'>
					<LoadingSpinner />
				</div>
			)}
			<Navigation onSizeChange={onSizeChangeHandler} />
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
							<Todos setTodosSize={setTodosSizeHandler} />
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
