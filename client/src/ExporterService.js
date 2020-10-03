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

	// Template for Axios Promise
	static axiosPromise(full_url, accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(full_url, ExporterService.axios_config(accessToken))
				.then((res) => {
					resolve(window.open(res.data, "_blank"));
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Export to PDF
	static export2pdf(accessToken) {
		return ExporterService.axiosPromise(`${url}/pdf`, accessToken);
	}

	// Export to Latex
	static export2tex(accessToken) {
		return ExporterService.axiosPromise(`${url}/latex`, accessToken);
	}

	// Export to Text
	static export2txt(accessToken) {
		return ExporterService.axiosPromise(`${url}/txt`, accessToken);
	}
}

export default ExporterService;
