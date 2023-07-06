import './App.css';
import Navigation from '../components/Navigation/Navigation';
import AddProject from '../components/Projects/AddProject/AddProject';
import Projects from '../components/Projects/Project/Projects';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import EditProject from '../components/Projects/EditProject/EditProject';
import { check_auth } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { refresh_projects } from '../store/project';
import Snackbar from '../components/UI/Snackbar/Snackbar';
import Hero from '../components/Layout/Hero';
import Login from '../components/Login/Login';

function App() {
	const dispatch = useDispatch();
	const is_authenticated = useSelector(
		(state) => state.auth.is_authenticated
	);
	const error = useSelector((state) => state.project.error);
	const message = useSelector((state) => state.project.message);
	const status = useSelector((state) => state.project.status);
	const [project, setProject] = useState(null);
	const [isOpenProject, setIsOpenProject] = useState(false);
	const [isOpenAddProject, setIsOpenAddProject] = useState(false);
	const [isOpenEditProject, setIsOpenEditProject] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		dispatch(check_auth());
		dispatch(refresh_projects());
	}, [dispatch]);

	const projectHandler = () => {
		setIsOpenProject((preState) => !preState);
	};
	const addProjectHandler = () => {
		setIsOpenAddProject((preState) => !preState);
	};
	const editProjectHandler = (data) => {
		setProject(data);
		console.log(data);
		setIsOpenEditProject((preState) => !preState);
	};
	const closeEditModal = () => {
		setIsOpenEditProject(false);
	};
	const closeAddProjectModal = () => {
		setIsOpenAddProject(false);
	};
	const openLogin = () => {
		setIsOpen(true);
	};
	const closeLogin = () => {
		setIsOpen(false);
	};
	const projectCloseHandler = () => {
		setIsOpenProject(false);
	};

	if (status === 'pending') {
		return (
			<div className='loading dark'>
				<LoadingSpinner />
			</div>
		);
	}
	return (
		<ErrorBoundary>
			<div className='App'>
				{status === 'failed' && error && (
					<Snackbar content={error.message} type={'failure'} />
				)}
				{message && <Snackbar content={message} type={'sucess'} />}
				<Navigation
					is_authenticated={is_authenticated}
					onClickProjects={projectHandler}
					onClickAddProject={addProjectHandler}
					onClickLogin={openLogin}
				/>
				{isOpen && <Login onClickBackdrop={closeLogin} />}
				<Hero
					onClickAddProject={addProjectHandler}
					onClickLogin={openLogin}
				/>

				{is_authenticated && (
					<>
						<Projects
							className={isOpenProject ? 'show' : 'hide'}
							onEditProject={editProjectHandler}
							closeProjects={projectCloseHandler}
						/>
						<AddProject
							className={isOpenAddProject ? 'show' : 'hide'}
							closeAddProject={closeAddProjectModal}
						/>
						{isOpenEditProject && (
							<EditProject
								className={isOpenEditProject ? 'show' : 'hide'}
								project={project}
								closeModalHandler={closeEditModal}
							/>
						)}
					</>
				)}
			</div>
		</ErrorBoundary>
	);
}

export default App;
