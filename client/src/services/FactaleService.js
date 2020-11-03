import axios from "axios";

const url = "api/factales/";

class FactaleService {
	// Axios config JSON including JWT
	static axios_config(accessToken) {
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
	}

	// Get Factales
	static getFactales(searchQuery, accessToken) {
		let finalUrl = url;
		if (searchQuery) {
			finalUrl = `${url}?search=${searchQuery}`;
		}
		return new Promise((resolve, reject) => {
			axios
				.get(finalUrl, FactaleService.axios_config(accessToken))
				.then((res) => {
					const data = res.data;
					resolve(
						data.map((factale) => ({
							...factale,
							createdAt: new Date(factale.createdAt),
							updatedAt: new Date(factale.updatedAt),
						}))
					);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	// Get one single Factale
	static getSingleFactale(id, accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}${id}`, FactaleService.axios_config(accessToken))
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					// console.log("err", err);
					reject(err);
				});
		});
	}

	// Create new Factale
	static addFactale(newFactale, accessToken) {
		return axios.post(
			url,
			{
				title: newFactale.title,
				content: newFactale.content,
				image: newFactale.image,
			},
			FactaleService.axios_config(accessToken)
		);
	}

	// Update existing Factale
	static editFactale(id, updatedFactale, accessToken) {
		return axios.put(
			`${url}${id}`,
			{
				title: updatedFactale.title,
				content: updatedFactale.content,
				image: updatedFactale.image,
			},
			FactaleService.axios_config(accessToken)
		);
	}

	// Delete Factale
	static deleteFactale(id, accessToken) {
		return axios.delete(`${url}${id}`, FactaleService.axios_config(accessToken));
	}

	// Get Factales
	static getFactalesTotalCount(accessToken) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}total/count`, FactaleService.axios_config(accessToken))
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default FactaleService;
