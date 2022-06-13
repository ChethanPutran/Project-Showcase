import Todo from './Todo';
import Button from '../../UI/Button/Button';
import React, { useState } from 'react';
import './Todos.css';
import Aside from '../../UI/Aside/Aside';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Snackbar from '../../UI/Snackbar/Snackbar';

const sortTodos = (todos, type) => {
	return todos.slice().sort((todoA, todoB) => {
		if (type) {
			return todoA._id > todoB._id ? 1 : -1;
		}
		return todoA._id < todoB._id ? 1 : -1;
	});
};
const Todos = (props) => {
	const error = useSelector((state) => state.todo.error);
	const size = useSelector((state) => state.todo.size);
	const status = useSelector((state) => state.todo.status);
	const message = useSelector((state) => state.todo.message);

	const todos_raw = useSelector((state) => state.todo.todos);

	const [sortType, setSortType] = useState(0);
	const [todos, setTodos] = useState(todos_raw);

	useEffect(() => {
		setTodos(todos_raw);
	}, [todos_raw]);

	const sortedTodos = sortTodos(todos, sortType);

	const searchChangeHandler = (event) => {
		const searchTerm = event.target.value.trim();
		if (!searchTerm) {
			setTodos(todos_raw);
			return;
		}
		setTodos((preTodos) => {
			return preTodos.filter((todo) => todo.title.includes(searchTerm));
		});
	};
	const todoList = () => {
		console.log('Refreshing!');
		return sortedTodos.map((todo) => (
			<li className='todos__list--item' key={todo._id} id={todo._id}>
				<Todo
					id={todo._id}
					title={todo.title}
					description={todo.description}
					completed={todo.completed}
					createdAt={todo.createdAt}
				/>
			</li>
		));
	};

	const sortHandler = () => {
		setSortType((preSortType) => {
			if (preSortType === 0) {
				return 1;
			}
			return 0;
		});
	};
	return (
		<>
			<Aside className={props.className} position={'right'}>
				{status === 'pending' && (
					<div className='loading'>
						<LoadingSpinner />
					</div>
				)}
				{status === 'failure' && error && (
					<Snackbar content={message} type={'failure'} />
				)}
				{status === 'sucess' && message && (
					<Snackbar content={error.message} type={'sucess'} />
				)}

				{size > 0 ? (
					<div className='todos__box'>
						<div className='todos__filter'>
							<div>
								<Button
									onClick={sortHandler}
									className='sortButton'>
									Sort
									{sortType === 1
										? 'Descending'
										: 'Ascending'}
								</Button>
							</div>
							<div className='todos__search'>
								<label
									htmlFor='search'
									className='search__label'>
									Filter
								</label>
								<input
									type='text'
									id='search'
									className='search__input'
									onChange={searchChangeHandler}
								/>
							</div>
						</div>
						<ul className='todos__list'>{todoList()}</ul>
					</div>
				) : (
					<p className='app__warning'>No todos found!!!</p>
				)}
			</Aside>
		</>
	);
};

export default Todos;
