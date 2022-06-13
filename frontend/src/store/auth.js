import { createSlice } from '@reduxjs/toolkit';
import HttpService from '../components/Services/http-services';

//Creating reducer function
//Input -> old state,dispatched action
//Output -> new state object
//Should not have side effects

//Initial states
const initial_auth_state = {
	is_authenticated: false,
	user: null,
	error: null,
	is_loading: false,
};

//Slices
const auth_slice = createSlice({
	name: 'auth',
	initialState: initial_auth_state,
	reducers: {
		login(state, action) {
			state.is_authenticated = action.payload.is_authenticated;
			state.user = action.payload.user;
		},
		logout(state) {
			state.is_authenticated = false;
			state.user = null;
		},
		set_loading(state, action) {
			state.is_loading = action.payload;
		},
		set_error(state, action) {
			state.error = action.payload;
		},
	},
});

//Handler
const logout = () => {
	return async (dispatch) => {
		dispatch(auth_actions.set_loading(true));
		try {
			const res = await fetch('http://localhost:3004/logout', {
				credentials: 'include',
			});

			const data = await res.json();
			dispatch(auth_actions.logout());

			if (!res.ok) {
				throw new Error(data.error);
			}
		} catch (err) {
			if (err instanceof TypeError) {
				dispatch(
					auth_actions.set_error(
						'Could not connect to server!\nCheck your internet connection.'
					)
				);
			}
		}
		dispatch(auth_actions.set_loading(false));
	};
};
const check_auth = () => {
	return async (dispatch) => {
		try {
			dispatch(auth_actions.set_loading(true));
			const res = await fetch('http://localhost:3004/user', {
				credentials: 'include',
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}

			dispatch(
				auth_actions.login({ user: data.data, is_authenticated: true })
			);
		} catch (err) {
			if (err instanceof TypeError) {
				dispatch(
					auth_actions.set_error(
						'Could not connect to server!\nCheck your internet connection.'
					)
				);
			}
		}
		dispatch(auth_actions.set_loading(false));
	};
};

export const auth_actions = auth_slice.actions;
export default auth_slice;
export { logout, check_auth };
