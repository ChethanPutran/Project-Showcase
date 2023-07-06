import { configureStore } from '@reduxjs/toolkit';
import auth_slice from './auth';
import project_slice from './project';

//Creating reducer function
//Input -> old state,dispatched action
//Output -> new state object
//Should not have side effects
export const store = configureStore({
	reducer: {
		project: project_slice.reducer,
		auth: auth_slice.reducer,
	},
});
