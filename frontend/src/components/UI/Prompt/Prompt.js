import './Prompt.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';

export default function Prompt(props) {
	const [showPrompt, setShowPrompt] = useState(false);

	const CreatePrompt = (props) => {
		const promptOkHandler = () => {
			setShowPrompt(false);
		};
		const promptCancelHandler = () => {
			setShowPrompt(false);
		};
		return (
			<>
				<div className='backdrop'></div>
				<div className='prompt'>
					<h2 className='prompt-title'>{props.content.title}</h2>
					<p className='prompt-message'>{props.content.message}</p>
					<div className='prompt-btns'>
						<button
							className='btn prompt-btn--yes'
							onClick={promptOkHandler}>
							Yes
						</button>
						<button
							className='btn prompt-btn--no'
							onClick={promptCancelHandler}>
							No
						</button>
					</div>
				</div>
			</>
		);
	};
	const Prompt = () => {
		return ReactDOM.createPortal(
			<CreatePrompt content={props} />,
			document.getElementById('prompt')
		);
	};
	return (
		<>
			{showPrompt && (
				<>
					<Prompt />
				</>
			)}
		</>
	);
}
