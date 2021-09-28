import React, { useCallback, useEffect, useState } from 'react';

export const AuthContext = React.createContext({
	user: null,
	login: (token) => {},
	logout: () => {},
	error: null,
	isLoading: null,
});

const AuthContextProvider = (props) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const loginHandler = useCallback(async (user) => {
		setIsLoading(true);
		try {
			const res = await fetch('http://localhost:3004/user', {
				credentials: 'include',
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}
			setIsLoading(false);
			setUser(data.data);
		} catch (err) {
			setIsLoading(false);
			if (err instanceof TypeError) {
				return setError(
					'Could not connect to server!\nCheck your internet connection.'
				);
			}
		}
	}, []);

	const logoutHandler = () => {
		setUser(null);
		logout();
	};

	useEffect(() => {
		loginHandler();
	}, [loginHandler]);

	const logout = async () => {
		setIsLoading(true);
		try {
			const res = await fetch('http://localhost:3004/logout', {
				credentials: 'include',
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}
			setIsLoading(false);
			setUser(null);
		} catch (err) {
			setIsLoading(false);
			if (err instanceof TypeError) {
				return setError(
					'Could not connect to server!\nCheck your internet connection.'
				);
			}
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user: user,
				login: loginHandler,
				logout: logoutHandler,
				error: error,
				isLoading: isLoading,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthContextProvider;
