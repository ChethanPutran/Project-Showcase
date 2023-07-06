import ProjectForm from '../ProjectForm/ProjectForm';
import HttpService from '../../Services/http-services';
import Snackbar from '../../UI/Snackbar/Snackbar';
import Aside from '../../UI/Aside/Aside';
import { useDispatch } from 'react-redux';
import { refresh_projects } from '../../../store/project';
import { useState } from 'react';
import Button from '../../UI/Button/Button';

const AddProject = (props) => {
	const [isloading, setIsLoading] = useState(false);
	const [message, setMessage] = useState({ status: null, message: null });

	const dispatch = useDispatch();

	const addProject = async (data) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.addProject(data);
			console.log(res);

			setMessage((pre) => {
				return {
					status: 'sucess',
					message: res.data.message,
				};
			});
		} catch (err) {
			setMessage((pre) => {
				return { status: 'error', message: err.message };
			});
		}
		setIsLoading(false);
		setTimeout(() => {
			dispatch(refresh_projects());
		}, 2000);
	};

	return (
		<Aside position={'left'} className={props.className}>
			<Button className='btn-close' onClick={props.closeAddProject}>
				<ion-icon
					name='close-outline'
					className='close-icon'></ion-icon>
			</Button>
			{message.message && (
				<Snackbar content={message.message} type={message.type} />
			)}
			<ProjectForm getData={addProject} isLoading={isloading} type='Add Project' />
		</Aside>
	);
};

export default AddProject;
