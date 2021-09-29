import { createSlice, configureStore } from '@reduxjs/toolkit';
import HttpService from '../components/Services/http-services';

// if (action.type === 'SEND') {
// 	return {
// 		size: state.size,
// 		todos: state.todos,
// 		error: state.error,
// 		status: 'pending',
// 		update: state.update,
// 	};
// }
// if (action.type === 'SUCESS') {
// 	return {
// 		size: action.todos.length,
// 		todos: action.todos,
// 		error: state.error,
// 		status: 'sucess',
// 		update: state.update,
// 	};
// }

// if (action.type === 'FAILED') {
// 	return {
// 		size: state.todos.length,
// 		todos: state.todos,
// 		error: action.error,
// 		status: 'failure',
// 		update: state.update,
// 	};
// }

const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		size: 0,
		todos: [],
		error: { message: '' },
		status: null,
	},
	reducers: {
		setTodos(state, action) {
			state.todos = [...action.payload];
			state.size = state.todos.length;
		},
		setError(state, action) {
			state.error.message = action.payload.message;
		},
		setStatus(state, action) {
			state.status = action.payload;
		},
	},
});
export const todoActions = todoSlice.actions;
export const store = configureStore({ reducer: todoSlice.reducer });

const getTodos = () => {
	return async (dispatch) => {
		dispatch(todoActions.setStatus('pending'));
		try {
			console.log('updating');
			const httpSerive = new HttpService();
			const data = await httpSerive.getTodos();
			dispatch(todoActions.setStatus('sucess'));
			dispatch(todoActions.setTodos(data.data));
		} catch (error) {
			dispatch(todoActions.setStatus('failed'));
			dispatch(todoActions.setError({ ...error }));
		}
	};
};

export const addTodo = (todo) => {
	return async (dispatch) => {
		dispatch(todoActions.setStatus('pending'));

		try {
			console.log('updating');
			const httpService = new HttpService();
			const data = await httpService.addTodo(todo);
			dispatch(todoActions.setStatus('sucess'));
			dispatch(todoActions.setTodos(data.data));
		} catch (error) {
			dispatch(todoActions.setStatus('failed'));
			dispatch(todoActions.setError({ ...error }));
		}
	};
};
export const updateTodo = (todo) => {
	return async (dispatch) => {
		dispatch(todoActions.setStatus('pending'));

		try {
			console.log('updating');
			const httpService = new HttpService();
			const data = await httpService.addTodo(todo);
			dispatch(todoActions.setStatus('sucess'));
			dispatch(todoActions.setTodos(data.data));
		} catch (error) {
			dispatch(todoActions.setStatus('failed'));
			dispatch(todoActions.setError({ ...error }));
		}
	};
};
export default getTodos;
