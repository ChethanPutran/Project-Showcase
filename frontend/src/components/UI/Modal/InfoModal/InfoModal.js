import Modal from '../Modal';
import Button from '../../Button/Button';
import './InfoModal.css';

export default function InfoModal(props) {
	return (
		<Modal backdropHandler={props.onUndo}>
			<div className='infoModal'>
				<header className='infoModal__header'>
					<h3 className='infoModal__title'>{props.title}</h3>
				</header>
				<div className='infoModal__content'>
					<p className='infoModal__message'>{props.message}</p>
				</div>
				<footer className='infoModal__footer'>
					{props.onUndo && (
						<Button
							className='infoModal__button'
							onClick={props.onUndo}>
							Cancel
						</Button>
					)}
					<Button
						className='infoModal__button'
						onClick={props.onConfirm}>
						Ok
					</Button>
				</footer>
			</div>
		</Modal>
	);
}
