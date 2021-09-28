const DOMAIN_URL = 'http://localhost:3004/user';

class HttpService {
	async getTodos() {
		try {
			const response = await fetch(`${DOMAIN_URL}/todos`, {
				credentials: 'include',
			});
			const data = await response.json();
			if (!response.ok) {
				throw data.error;
			}

			return data;
		} catch (err) {
			throw err;
		}
	}
	async updateTodoStatus({ id, completed }) {
		try {
			const response = await fetch(
				`${DOMAIN_URL}/todo?id=${id}&&completed=${completed}`,
				{
					credentials: 'include',
					method: 'PATCH',
				}
			);
			const data = await response.json();
			if (!response.ok) {
				throw data.error;
			}

			return data;
		} catch (err) {
			throw err;
		}
	}
	async addTodo(todo) {
		try {
			const response = await fetch(`${DOMAIN_URL}/todo/`, {
				method: 'POST',
				body: JSON.stringify(todo),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}
			return data;
		} catch (err) {
			throw err;
		}
	}

	async getTodo(todoId) {
		try {
			const response = await fetch(`${DOMAIN_URL}/todo/${todoId}`, {
				credentials: 'include',
			});
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}

			return data;
		} catch (err) {
			throw err;
		}
	}

	async deleteTodo(todoID) {
		try {
			const response = await fetch(`${DOMAIN_URL}/todo/${todoID}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}

			return data;
		} catch (err) {
			throw err;
		}
	}

	async updateTodo({ id, content }) {
		try {
			const response = await fetch(`${DOMAIN_URL}/todo/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(content),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			const data = await response.json();

			if (!response.ok) {
				throw data.error;
			}
			return data;
		} catch (err) {
			throw err;
		}
	}
}
export default HttpService;
