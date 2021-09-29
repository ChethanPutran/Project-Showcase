import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from '../../frontend/src/reportWebVitals';
import AuthContexProvider from './store/auth-context';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';

ReactDOM.render(
	<Provider store={store}>
		<AuthContexProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContexProvider>
	</Provider>,

	document.getElementById('root')
);

reportWebVitals();
