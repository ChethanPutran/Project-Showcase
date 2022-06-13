import { configureStore } from '@reduxjs/toolkit';
import auth_slice from './auth';
import todo_slice from './todo';

//Creating reducer function
//Input -> old state,dispatched action
//Output -> new state object
//Should not have side effects
export const store = configureStore({
	reducer: {
		todo: todo_slice.reducer,
		auth: auth_slice.reducer,
	},
});
