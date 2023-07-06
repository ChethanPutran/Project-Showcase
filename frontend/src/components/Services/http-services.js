const DOMAIN_URL = 'http://localhost:3004/user';

class HttpService {
	async getProjects() {
		try {
			const response = await fetch(`${DOMAIN_URL}/projects`, {
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
	async updateProjectStatus(id) {
		try {
			const response = await fetch(`${DOMAIN_URL}/project/status?id=${id}`, {
				credentials: 'include',
				method: 'PATCH',
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
	async addProject(project) {
		try {
			const response = await fetch(`${DOMAIN_URL}/project/`, {
				method: 'POST',
				body: JSON.stringify(project),
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

	async getProject(projectId) {
		try {
			const response = await fetch(`${DOMAIN_URL}/project/${projectId}`, {
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

	async deleteProject(projectID) {
		try {
			const response = await fetch(`${DOMAIN_URL}/project/${projectID}`, {
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

	async updateProject({ id, content }) {
		try {
			const response = await fetch(`${DOMAIN_URL}/project/${id}`, {
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
