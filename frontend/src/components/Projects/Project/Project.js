import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import './Project.css';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Snackbar from '../../UI/Snackbar/Snackbar';
import HttpService from '../../Services/http-services';
import InfoModal from '../../UI/Modal/InfoModal/InfoModal';

import { useDispatch } from 'react-redux';
import { refresh_projects } from '../../../store/project';

const Project = (props) => {
	const dispatch = useDispatch();
	const project = {
		id: props.id,
		title: props.title,
		description: props.description,
		completed: props.completed,
	};

	const [confirmation, setConfirmation] = useState(false);
	const [message, setMessage] = useState({ type: null, message: null });
	const [isLoading, setIsLoading] = useState(false);

	const clearConfirmation = () => {
		setConfirmation(false);
	};

	const confirmDeleteHandler = () => {
		clearConfirmation();
		deleteProject(props.id);
	};

	const deleteProject = async (id) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.deleteProject(id);
			console.log(res);
			setMessage({ type: 'sucess', message: res.data.message });
		} catch (err) {
			console.log(err);
			setMessage({ type: 'failure', message: err.message });
		}
		setIsLoading(false);
		setTimeout(() => {
			dispatch(refresh_projects());
		}, 4000);
	};
	const updateProjectStatus = async (id) => {
		setIsLoading(true);
		const httpService = new HttpService();
		try {
			const res = await httpService.updateProjectStatus(id);
			setMessage({ type: 'sucess', message: res.data.message });
		} catch (err) {
			console.log(err);
			setMessage({ type: 'failure', message: err.message });
		}
		setIsLoading(false);
		setTimeout(() => {
			dispatch(refresh_projects());
		}, 2000);
	};

	const editProjectHandler = () => {
		console.log(project);
		props.onEditProject(project);
	};

	const deleteProjectHandler = () => {
		setConfirmation(true);
	};

	const date = new Date(props.createdAt);
	const createdAt =
		date.toLocaleDateString('en-US') +
		'\t' +
		date.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
		});

	return (
		<>
			{confirmation && (
				<InfoModal
					title='Warning!'
					message="Are you sure you want to delete project?This can't be undone!"
					onConfirm={confirmDeleteHandler}
					onUndo={clearConfirmation}
				/>
			)}

			{message.message && (
				<Snackbar content={message.message} type={message.type} />
			)}
			<div className='project' title='Project'>
				{isLoading && (
					<div className='loading'>
						<LoadingSpinner size={'small'} />
					</div>
				)}
				{}
				<header className='project__header'>
					<div className='project__header--top'>
						<h3 className='project__title' title='Project title'>
							{props.title}
						</h3>
						<span className='project__date'>{createdAt}</span>
					</div>

					<p
						className={`status__label ${
							props.completed
								? 'status__complete'
								: 'status__incomplete'
						}`}
						title='Status'>
						{props.completed ? 'completed' : 'incomplete'}
					</p>
				</header>
				<main>
					<p className='project__description' title='Description'>
						{props.description}
					</p>
				</main>
				<footer className='project__btnBox'>
					<div>
						<Button
							className='project__btn'
							title={
								props.completed
									? 'Click to activate'
									: 'Click to finish'
							}
							onClick={updateProjectStatus.bind(null, props.id)}>
							{props.completed ? 'Activate' : 'Finish'}
						</Button>
					</div>
					<div>
						<Button
							className='project__btn btn__tirtiary'
							title='Click to edit'
							onClick={editProjectHandler}>
							<i className='fas fa-edit btnIcon'></i>
						</Button>
						<Button
							className='project__btn btn__danger'
							title='Click to delete'
							onClick={deleteProjectHandler}>
							<i className='far fa-trash-alt btnIcon'></i>
						</Button>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Project;
