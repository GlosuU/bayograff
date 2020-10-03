import axios from "axios";

const url = "api/reporterms/";

class ReportermService {
	// Axios config JSON including JWT
	static axios_config(accessToken) {
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
	}

	// Get Reporterms
	static getReporterms(searchQuery, accessToken) {
		let finalUrl = url;
		if (searchQuery) {
			finalUrl = url + "?search=" + searchQuery;
		}
		return new Promise((resolve, reject) => {
			axios
				.get(finalUrl, ReportermService.axios_config(accessToken))
				.then((res) => {
					const data = res.data;
					resolve(
						data.map((reporterm) => ({
							...reporterm,
							startDate: new Date(reporterm.startDate),
							endDate: new Date(reporterm.endDate),
							createdAt: new Date(reporterm.createdAt),
							updatedAt: new Date(reporterm.updatedAt),
						}))
					);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Get one single Reporterm
	static getSingleReporterm(id, accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}${id}`, ReportermService.axios_config(accessToken))
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					console.log("err", err);
					reject(err);
				});
		});
	}

	// Create new Reporterm
	static addReporterm(newReporterm, accessToken) {
		return axios.post(
			url,
			{
				startDate: newReporterm.startDate,
				endDate: newReporterm.endDate,
				title: newReporterm.title,
				content: newReporterm.content,
			},
			ReportermService.axios_config(accessToken)
		);
	}

	// Update existing Reporterm
	static editReporterm(id, updatedReporterm, accessToken) {
		return axios.put(
			`${url}${id}`,
			{
				startDate: updatedReporterm.startDate,
				endDate: updatedReporterm.endDate,
				title: updatedReporterm.title,
				content: updatedReporterm.content,
			},
			ReportermService.axios_config(accessToken)
		);
	}

	// Delete Reporterm
	static deleteReporterm(id, accessToken) {
		return axios.delete(`${url}${id}`, ReportermService.axios_config(accessToken));
	}
}

export default ReportermService;
