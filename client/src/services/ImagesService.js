const images = {
	noImg: require("../../public/assets/img/default.png"),
	beach: require("../../public/assets/img/beach.jpg"),
	mountain: require("../../public/assets/img/mountain.jpg"),
	graduation: require("../../public/assets/img/graduation.jpg"),
	heart: require("../../public/assets/img/heart.jpg"),
	ball: require("../../public/assets/img/ball.jpg"),
	export2pdf: require("../../public/assets/img/export2pdf.png"),
	logo: require("../../public/assets/img/logo.png"),
};

const socialIcons = {
	gmail: require("../../public/assets/img/social/gmail-icon.png"),
	github: require("../../public/assets/img/social/github-icon.png"),
	twitter: require("../../public/assets/img/social/twitter-icon.png"),
};

const repsImages = {
	noImg: require("../../public/assets/img/reporterm/default-red.png"),
	family: require("../../public/assets/img/reporterm/family.png"),
	beach: require("../../public/assets/img/reporterm/beach.png"),
	mountain: require("../../public/assets/img/reporterm/mountain.png"),
	school: require("../../public/assets/img/reporterm/school.png"),
	clouds: require("../../public/assets/img/reporterm/clouds.png"),
};

const anecsImages = {
	noImg: require("../../public/assets/img/anecdaynote/default-blue.png"),
	graduation: require("../../public/assets/img/anecdaynote/graduation.png"),
	heart: require("../../public/assets/img/anecdaynote/heart.png"),
	trophy: require("../../public/assets/img/anecdaynote/trophy.png"),
	clock: require("../../public/assets/img/anecdaynote/clock.png"),
	fireworks: require("../../public/assets/img/anecdaynote/fireworks.png"),
};

const factsImages = {
	noImg: require("../../public/assets/img/factale/default-green.png"),
	food: require("../../public/assets/img/factale/food.png"),
	music: require("../../public/assets/img/factale/music.png"),
	car: require("../../public/assets/img/factale/car.png"),
	tv: require("../../public/assets/img/factale/tv.png"),
	newspaper: require("../../public/assets/img/factale/newspaper.png"),
};

class ImagesService {
	static isLocal(imgProperty, bayobject) {
		switch (bayobject) {
			case "reporterm":
				return imgProperty in repsImages;
			case "anecdaynote":
				return imgProperty in anecsImages;
			case "factale":
				return imgProperty in factsImages;
			default:
				return imgProperty in images;
		}
	}

	static getImage(imgProperty, bayobject) {
		switch (bayobject) {
			case "reporterm":
				if (imgProperty in repsImages) {
					return repsImages[imgProperty];
				}
				break;
			case "anecdaynote":
				if (imgProperty in anecsImages) {
					return anecsImages[imgProperty];
				}
				break;
			case "factale":
				if (imgProperty in factsImages) {
					return factsImages[imgProperty];
				}
				break;
			default:
				if (imgProperty in images) {
					return images[imgProperty];
				}
		}
		return imgProperty;
	}

	static getImages(bayobject) {
		switch (bayobject) {
			case "reporterm":
				return repsImages;
			case "anecdaynote":
				return anecsImages;
			case "factale":
				return factsImages;
			default:
				return images;
		}
	}

	static getSocialIcons() {
		return socialIcons;
	}
}

export default ImagesService;
