import Card from '../../UI/Card/Card';
import Todo from './Todo';
import { useHistory, useLocation } from 'react-router';
import Button from '../../UI/Button/Button';
import React, { useState } from 'react';
import './TodoList.css';

const sortTodos = (todos, type) => {
	return todos.sort((todoA, todoB) => {
		if (type) {
			return todoA.id > todoB.id ? 1 : -1;
		} else {
			return todoA.id < todoB.id ? 1 : -1;
		}
	});
};
const TodosList = (props) => {
	const history = useHistory();
	const location = useLocation();

	const [filteredTodos, setFilteredTodos] = useState(props.todos);

	const queryParams = new URLSearchParams(location.search);
	const sortType = +queryParams.get('sort') || 0;
	const sortedTodos = sortTodos(filteredTodos, sortType);

	const searchChangeHandler = (event) => {
		const searchTerm = event.target.value.trim();
		if (!searchTerm) {
			setFilteredTodos(props.todos);
			return;
		}
		setFilteredTodos((preTodos) => {
			return preTodos.filter((todo) => todo.title.includes(searchTerm));
		});
	};

	const todoList = () =>
		sortedTodos.map((todo) => (
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

	const sortHandler = () => {
		history.push({
			pathname: `${location.pathname}`,
			search: `?sort=${+!sortType}`,
		});
	};
	return (
		<section className='todos'>
			<Card className='todos__card'>
				<div className='todos__filter'>
					<div>
						<Button onClick={sortHandler} className='sortButton'>
							Sort {sortType === 1 ? 'Descending' : 'Ascending'}
						</Button>
					</div>
					<div className='todos__search'>
						<label htmlFor='search' className='search__label'>
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
			</Card>
		</section>
	);
};

export default TodosList;
