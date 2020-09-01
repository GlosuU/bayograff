import axios from "axios";

const url = "http://localhost:3000/api/reporterms/";

class ReportermService {
	// Get all Reporterms
	static getReporterms() {
		return new Promise((resolve, reject) => {
			axios
				.get(url)
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
	static getSingleReporterm(id) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}${id}`)
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
	static addReporterm(newReporterm) {
		return axios.post(url, {
			startDate: newReporterm.startDate,
			endDate: newReporterm.endDate,
			title: newReporterm.title,
			content: newReporterm.content,
		});
	}

	// Update existing Reporterm
	static editReporterm(id, updatedReporterm) {
		return axios.put(`${url}${id}`, {
			startDate: updatedReporterm.startDate,
			endDate: updatedReporterm.endDate,
			title: updatedReporterm.title,
			content: updatedReporterm.content,
		});
	}

	// Delete Reporterm
	static deleteReporterm(id) {
		return axios.delete(`${url}${id}`);
	}
}

export default ReportermService;
