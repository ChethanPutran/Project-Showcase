import Project from './Project';
import Button from '../../UI/Button/Button';
import React, { useState } from 'react';
import './Projects.css';
import Aside from '../../UI/Aside/Aside';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Snackbar from '../../UI/Snackbar/Snackbar';

const sortProjects = (projects, type) => {
	console.log(projects);
	return projects.slice().sort((projectA, projectB) => {
		if (type) {
			return projectA._id > projectB._id ? 1 : -1;
		}
		return projectA._id < projectB._id ? 1 : -1;
	});
};
const Projects = (props) => {
	const error = useSelector((state) => {
		console.log("State :",state)
		return state.project.error});
	const size = useSelector((state) => state.project.size);
	const status = useSelector((state) => state.project.status);
	const message = useSelector((state) => state.project.message);

	const projects_raw = useSelector((state) => state.project.projects);

	const [sortType, setSortType] = useState(0);
	const [projects, setProjects] = useState(projects_raw);

	useEffect(() => {
		setProjects(projects_raw);
	}, [projects_raw]);
	
	console.log(projects);
	const sortedProjects = sortProjects(projects, sortType);

	const searchChangeHandler = (event) => {
		const searchTerm = event.target.value.trim();
		if (!searchTerm) {
			setProjects(projects_raw);
			return;
		}
		setProjects((preProjects) => {
			return preProjects.filter((project) => project.title.includes(searchTerm));
		});
	};
	const projectList = () => {
		console.log('Refreshing!');
		return sortedProjects.map((project) => (
			<li className='projects__list--item' key={project._id} id={project._id}>
				<Project
					id={project._id}
					title={project.title}
					description={project.description}
					completed={project.completed}
					createdAt={project.createdAt}
					onEditProject={props.onEditProject}
				/>
			</li>
		));
	};

	const sortHandler = () => {
		setSortType((preSortType) => {
			if (preSortType === 0) {
				return 1;
			}
			return 0;
		});
	};
	return (
		<>
			<Aside className={props.className} position={'right'}>
				<Button className='btn-close' onClick={props.closeProjects}>
					<ion-icon
						name='close-outline'
						className='close-icon'></ion-icon>
				</Button>
				{status === 'pending' && (
					<div className='loading'>
						<LoadingSpinner />
					</div>
				)}
				{status === 'failure' && error && (
					<Snackbar content={message} type={'failure'} />
				)}
				{status === 'sucess' && message && (
					<Snackbar content={error.message} type={'sucess'} />
				)}

				{size > 0 ? (
					<div className='projects__box'>
						<div className='projects__filter'>
							<div>
								<Button
									onClick={sortHandler}
									className='sortButton'>
									Sort
									{sortType === 1
										? ' Descending'
										: ' Ascending'}
								</Button>
							</div>
							<div className='projects__search'>
								<label
									htmlFor='search'
									className='search__label'>
									Filter
								</label>
								<input
									type='text'
									id='search'
									className='search__input'
									onChange={searchChangeHandler}
								/>
							</div>
						</div>
						<ul className='projects__list'>{projectList()}</ul>
					</div>
				) : (
					<p className='app__warning'>No projects found!!!</p>
				)}
			</Aside>
		</>
	);
};

export default Projects;
