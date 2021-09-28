import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from '../../frontend/src/reportWebVitals';
import AuthContexProvider from './store/auth-context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<AuthContexProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthContexProvider>,

	document.getElementById('root')
);

reportWebVitals();
