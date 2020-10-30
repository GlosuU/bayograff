import axios from "axios";

const url = "api/anecdaynotes/";

class AnecdaynoteService {
	// Axios config JSON including JWT
	static axios_config(accessToken) {
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
	}

	// Get Anecdaynotes
	static getAnecdaynotes(searchQuery, accessToken) {
		let finalUrl = url;
		if (searchQuery) {
			finalUrl = `${url}?search=${searchQuery}`;
		}
		return new Promise((resolve, reject) => {
			axios
				.get(finalUrl, AnecdaynoteService.axios_config(accessToken))
				.then((res) => {
					const data = res.data;
					resolve(
						data.map((anecdaynote) => ({
							...anecdaynote,
							date: new Date(anecdaynote.date),
							createdAt: new Date(anecdaynote.createdAt),
							updatedAt: new Date(anecdaynote.updatedAt),
						}))
					);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Get Anecdaynotes in Reporterm
	static getAnecdaynotesInReporterm(reporterm, accessToken) {
		let finalUrl = url;
		if (reporterm) {
			finalUrl = `${url}?startDate=${reporterm.startDate}&endDate=${reporterm.endDate}`;
		}
		return new Promise((resolve, reject) => {
			axios
				.get(finalUrl, AnecdaynoteService.axios_config(accessToken))
				.then((res) => {
					const data = res.data;
					resolve(
						data.map((anecdaynote) => ({
							...anecdaynote,
							date: new Date(anecdaynote.date),
							createdAt: new Date(anecdaynote.createdAt),
							updatedAt: new Date(anecdaynote.updatedAt),
						}))
					);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Get one single Anecdaynote
	static getSingleAnecdaynote(id, accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}${id}`, AnecdaynoteService.axios_config(accessToken))
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					console.log("err", err);
					reject(err);
				});
		});
	}

	// Create new Anecdaynote
	static addAnecdaynote(newAnecdaynote, accessToken) {
		return axios.post(
			url,
			{
				date: newAnecdaynote.date,
				title: newAnecdaynote.title,
				content: newAnecdaynote.content,
				image: newAnecdaynote.image,
			},
			AnecdaynoteService.axios_config(accessToken)
		);
	}

	// Update existing Anecdaynote
	static editAnecdaynote(id, updatedAnecdaynote, accessToken) {
		return axios.put(
			`${url}${id}`,
			{
				date: updatedAnecdaynote.date,
				title: updatedAnecdaynote.title,
				content: updatedAnecdaynote.content,
				image: updatedAnecdaynote.image,
			},
			AnecdaynoteService.axios_config(accessToken)
		);
	}

	// Delete Anecdaynote
	static deleteAnecdaynote(id, accessToken) {
		return axios.delete(`${url}${id}`, AnecdaynoteService.axios_config(accessToken));
	}

	// Get Anecdaynotes
	static getAnecdaynotesTotalCount(accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}total/count`, AnecdaynoteService.axios_config(accessToken))
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default AnecdaynoteService;
