import { useReducer, useCallback } from 'react';

function httpReducer(state, action) {
	if (action.type === 'SEND') {
		return {
			data: null,
			error: null,
			status: 'pending',
		};
	}

	if (action.type === 'SUCCESS') {
		return {
			data: action.data,
			error: null,
			status: 'sucess',
		};
	}

	if (action.type === 'ERROR') {
		return {
			data: null,
			error: action.error,
			status: 'failed',
		};
	}

	return state;
}

function useHttp(requestFunction, startWithPending = false) {
	const [httpState, dispatch] = useReducer(httpReducer, {
		status: startWithPending ? 'pending' : null,
		data: null,
		error: null,
	});

	const sendRequest = useCallback(
		async function (requestData) {
			dispatch({ type: 'SEND' });
			try {
				const data = await requestFunction(requestData);

				dispatch({ type: 'SUCCESS', data: data.data });
			} catch (error) {
				dispatch({
					type: 'ERROR',
					error: { ...error },
				});
			}
		},
		[requestFunction]
	);

	return {
		sendRequest,
		...httpState,
	};
}

export default useHttp;
