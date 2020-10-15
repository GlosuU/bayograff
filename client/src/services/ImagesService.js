const images = {
	noImg: require("../../public/assets/img/default-img.jpg"),
	beach: require("../../public/assets/img/beach.jpg"),
	mountain: require("../../public/assets/img/mountain.jpg"),
	graduation: require("../../public/assets/img/graduation.jpg"),
	heart: require("../../public/assets/img/heart.jpg"),
	ball: require("../../public/assets/img/ball.jpg"),
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
