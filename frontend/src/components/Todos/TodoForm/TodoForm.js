import { useState } from 'react';
import { useReducer } from 'react';
import Card from '../../UI/Card/Card';
import InfoModal from '../../UI/Modal/InfoModal/InfoModal';
import Button from '../../UI/Button/Button';
import './TodoForm.css';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import React from 'react';
import Prompt from '../../UI/Prompt/Prompt';

const formErrorReducer = (state, action) => {
	if (action.type === 'TITLE_INPUT') {
		return {
			title: action.value,
			description: state.description,
			completed: state.completed,
			isValidTitle: action.value.length > 3,
			isValidDescription: state.isValidDescription,
		};
	} else if (action.type === 'DESC_INPUT') {
		return {
			title: state.title,
			description: action.value,
			completed: state.completed,
			isValidTitle: state.isValidTitle,
			isValidDescription: action.value.length > 20,
		};
	} else if (action.type === 'STATUS_INPUT') {
		return {
			title: state.title,
			description: state.description,
			completed: action.value,
			isValidTitle: state.isValidTitle,
			isValidDescription: state.isValidDescription,
		};
	}

	return {
		title: '',
		description: '',
		completed: false,
		isValidTitle: null,
		isValidDescription: null,
	};
};

function TodoForm(props) {
	const initialVal = props.content || {
		title: '',
		description: '',
		completed: false,
	};
	const [error, setError] = useState();
	const [formState, dispatchFormInput] = useReducer(formErrorReducer, {
		...initialVal,
		isValidTitle: true,
		isValidDescription: true,
	});

	const addTodoHandler = (event) => {
		event.preventDefault();
		const title = formState.title.trim();
		const description = formState.description.trim();
		const completed = formState.completed;
		if (!description || !title.length === 0) {
			setError({
				title: 'Invalid input!',
				message: 'Please enter a valid title and description.',
			});
			return;
		}
		if (title.length < 4) {
			setError({
				title: 'Invalid todoTitle!',
				message: 'Please enter a valid title.',
			});
			return;
		}
		if (description.length < 20) {
			setError({
				title: 'Invalid Description!',
				message: 'Description should be of atleast 20 letters.',
			});
			return;
		}
		props.getData({ title, description, completed }, props.id);
	};

	const clearError = () => {
		setError(null);
	};
	const setTitleHandler = (event) => {
		dispatchFormInput({
			type: 'TITLE_INPUT',
			value: event.target.value,
		});
	};

	const setDescriptionHandler = (event) => {
		dispatchFormInput({
			type: 'DESC_INPUT',
			value: event.target.value,
		});
	};
	const setCompletedHandler = (event) => {
		dispatchFormInput({
			type: 'STATUS_INPUT',
			value: event.target.value,
		});
	};

	return (
		<>
			{props.isLoading && (
				<div className='loading'>
					<LoadingSpinner />
				</div>
			)}
			<Prompt
				title={'Warning'}
				message={
					'Are you sure you want to exit? All provided data will be lost!'
				}
			/>

			{error && (
				<InfoModal
					title={error.title}
					message={error.message}
					onConfirm={clearError}
				/>
			)}
			<Card className='formCard'>
				<form onSubmit={addTodoHandler} className='form'>
					<label htmlFor='todoTitle' className='form__label'>
						Title
					</label>
					<input
						type='text'
						id='todoTitle'
						className={`form__input ${
							formState.isValidTitle === false ? 'inValid' : ''
						}`}
						value={formState.title}
						autoComplete='off'
						onChange={setTitleHandler}
					/>
					<label htmlFor='description' className='form__label'>
						Description
					</label>

					<textarea
						type='text'
						id='description'
						className={`form__input form__textarea ${
							formState.isValidDescription === false
								? 'inValid'
								: ''
						}`}
						value={formState.description}
						autoComplete='off'
						onChange={setDescriptionHandler}
					/>
					<div className='form__radio--box'>
						<span className='radio__title'>Completed?</span>

						<div className='radio__box'>
							<label
								htmlFor='completed__true'
								className='radio__label'>
								Yes
							</label>
							<input
								type='radio'
								id='completed__true'
								name='completed'
								className='form__radio'
								onChange={setCompletedHandler}
								value={true}
							/>
						</div>
						<div className='radio__box'>
							<label
								htmlFor='completed__false'
								className='radio__label'>
								No
							</label>
							<input
								type='radio'
								id='completed__false'
								name='completed'
								className='form__radio'
								onChange={setCompletedHandler}
								value={false}
							/>
						</div>
					</div>
					<div className='form__btnBox'>
						<Button className='form__button' type='submit'>
							{props.type}
						</Button>
					</div>
				</form>
			</Card>
		</>
	);
}
export default React.memo(TodoForm);
