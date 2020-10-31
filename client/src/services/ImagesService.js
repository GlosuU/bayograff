const images = {
	noImg: require("../../public/assets/img/default-red.png"),
	beach: require("../../public/assets/img/beach.jpg"),
	mountain: require("../../public/assets/img/mountain.jpg"),
	graduation: require("../../public/assets/img/graduation.jpg"),
	heart: require("../../public/assets/img/heart.jpg"),
	ball: require("../../public/assets/img/ball.jpg"),
	export2pdf: require("../../public/assets/img/export2pdf.png"),
	logo: require("../../public/assets/img/logo.png"),
};

class ImagesService {
	static isLocal(imgProperty) {
		return imgProperty in images;
	}

	static getImage(imgProperty) {
		if (imgProperty in images) {
			return images[imgProperty];
		} else {
			return imgProperty;
		}
	}

	static getAllImages() {
		return images;
	}
}

export default ImagesService;
