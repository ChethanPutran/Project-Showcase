import ProjectForm from '../ProjectForm/ProjectForm';
import Snackbar from '../../UI/Snackbar/Snackbar';
import HttpService from '../../Services/http-services';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { refresh_projects } from '../../../store/project';
import { useState } from 'react';
import Modal from '../../UI/Modal/Modal';

export default function EditProject(props) {
	const dispatch = useDispatch();
	const [isloading, setIsLoading] = useState(false);
	const [message, setMessage] = useState({ status: null, message: null });

	const updateProject = async (data, id) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.updateProject({ id, content: data });

			setMessage((pre) => {
				return {
					status: 'sucess',
					message: res.data.message,
				};
			});
		} catch (err) {
			console.log(err);
			setMessage((pre) => {
				return { status: 'error', message: err.message };
			});
		}

		setIsLoading(false);
		setTimeout(() => {
			props.closeModalHandler();
		}, 2000);
		setTimeout(() => {
			dispatch(refresh_projects());
		}, 2000);
	};

	return (
		<>
			<Modal
				className={props.className}
				backdropHandler={props.closeModalHandler}>
				{isloading && (
					<div className='loading'>
						<LoadingSpinner />
					</div>
				)}
				{message.status && (
					<Snackbar content={message.message} type={message.status} />
				)}
				<ProjectForm
					getData={updateProject}
					id={props.project.id}
					content={{
						title: props.project.title,
						description: props.project.description,
						completed: !!props.project.completed,
					}}
					isLoading={isloading}
					type='Update Project'
				/>
			</Modal>
		</>
	);
}
