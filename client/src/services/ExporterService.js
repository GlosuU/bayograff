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
	static axiosPromise(full_url, title, accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${full_url}?title=${title}`, ExporterService.axios_config(accessToken))
				.then((res) => {
					resolve(window.open(res.data, "_blank"));
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Export to PDF
	static export2pdf(title, accessToken) {
		return ExporterService.axiosPromise(`${url}/pdf`, title, accessToken);
	}

	// Export to Latex
	static export2tex(title, accessToken) {
		return ExporterService.axiosPromise(`${url}/latex`, title, accessToken);
	}

	// Export to Text
	static export2txt(title, accessToken) {
		return ExporterService.axiosPromise(`${url}/txt`, title, accessToken);
	}
}

export default ExporterService;
