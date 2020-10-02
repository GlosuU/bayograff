import axios from "axios";

const url = "api/export";

class ExporterService {
	// Axios config JSON including JWT
	static axios_config(accessToken) {
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
	}

	// Export to PDF
	static export2pdf(accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}/pdf`, ExporterService.axios_config(accessToken))
				.then(() => {
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Export to Latex
	static export2tex(accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}/latex`, ExporterService.axios_config(accessToken))
				.then(() => {
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Export to Text
	static export2txt(accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}/txt`, ExporterService.axios_config(accessToken))
				.then(() => {
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default ExporterService;
