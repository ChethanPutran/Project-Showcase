import { createSlice } from '@reduxjs/toolkit';
import HttpService from '../components/Services/http-services';

const initial_Project_state = {
	size: 0,
	projects: [],
	error: '',
	status: null,
	message: null,
};

const refresh_projects = () => {
	return async (dispatch) => {
		dispatch(projectActions.setStatus('pending'));
		try {
			const httpSerive = new HttpService();
			const data = await httpSerive.getProjects();
			dispatch(projectActions.setStatus('sucess'));
			dispatch(projectActions.setProjects(data.data));
			dispatch(projectActions.setError(null));
		} catch (error) {
			dispatch(projectActions.setStatus('failed'));
			dispatch(projectActions.setError(error));
			dispatch(projectActions.setProjects([]));
		}
	};
};

const project_slice = createSlice({
	name: 'project',
	initialState: initial_Project_state,
	reducers: {
		setProjects(state, action) {
			state.projects = [...action.payload];
			state.size = state.projects.length;
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
const projectActions = project_slice.actions;

export { refresh_projects, projectActions };
export default project_slice;
