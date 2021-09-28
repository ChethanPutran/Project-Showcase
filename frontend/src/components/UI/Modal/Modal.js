import Backdrop from '../Backdrop/Backdrop';
import ReactDOM from 'react-dom';
import Card from '../Card/Card';
import { Fragment } from 'react';
import './Modal.css';

const CreateModal = (props) => {
	return <Card className='modal'>{props.content.children}</Card>;
};

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.backdropHandler} />,
				document.getElementById('backdrop')
			)}
			{ReactDOM.createPortal(
				<CreateModal content={props} />,
				document.getElementById('modal')
			)}
		</Fragment>
	);
};

export default Modal;
