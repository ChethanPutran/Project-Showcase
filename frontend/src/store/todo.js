import { createSlice } from '@reduxjs/toolkit';
import HttpService from '../components/Services/http-services';

const initial_todo_state = {
	size: 0,
	todos: [],
	error: '',
	status: null,
	message: null,
};

const refresh_todos = () => {
	return async (dispatch) => {
		dispatch(todoActions.setStatus('pending'));
		try {
			const httpSerive = new HttpService();
			const data = await httpSerive.getTodos();
			dispatch(todoActions.setStatus('sucess'));
			dispatch(todoActions.setTodos(data.data));
			dispatch(todoActions.setError(null));
		} catch (error) {
			dispatch(todoActions.setStatus('failed'));
			dispatch(todoActions.setError(error));
			dispatch(todoActions.setTodos([]));
		}
	};
};

const todo_slice = createSlice({
	name: 'todo',
	initialState: initial_todo_state,
	reducers: {
		setTodos(state, action) {
			state.todos = [...action.payload];
			state.size = state.todos.length;
		},
		setError(state, action) {
			state.error = action.payload;
		},
		setStatus(state, action) {
			state.status = action.payload;
		},
		setMessage(state, action) {
			state.status = action.payload;
		},
	},
});
//Actions
const todoActions = todo_slice.actions;

export { refresh_todos, todoActions };
export default todo_slice;
