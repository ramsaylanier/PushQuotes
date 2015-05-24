var fadeIn = function(element){
	return {"opacity": 1};
}

var fadeOut = function(element){
	return {"opacity": 0};
}

var swingIn = function(element){

	element.velocity({
		rotateX: '-90deg'
	}, 0)

	element.velocity({
		"rotateX": '0deg',
		opacity: 1
	}, {duration: 2000, easing: [500, 25],})
}

var twistIn = function(element){
	element.velocity({
		translateX: ["-50%", [250, 15], "-50%"],
		translateY: ["-50%", [250, 15], "-50%"],
		rotate: ["-45deg"]
	}, 0);

	var easing = [10, 5];

	element.velocity({
		top: ["50%", easing, "120vh"]
	}, {duration: 2000, queue: false});

	element.velocity({
		rotateZ: ["0deg", easing, "90deg"],
	}, {duration: 2000, queue: false});

	element.velocity({
		rotateY: "0deg"
	}, {duration: 2000, delay: 0, queue: false});

	element.velocity({
		rotateX: ["0deg", easing, "-0deg"],
		opacity: 1
	}, {duration: 2000, queue: false});

	// return {top: "50%", rotateZ: "0deg", rotateY:"0deg", rotateX:"0deg", translateX: "-50%", translateY: "-50%"}
}

var flipCard = function(flipper, card){

	var width = 400;
	var height = 400;

	if (width > window.innerWidth){
		width = window.innerWidth;
		height = window.innerWidth;
	}

	if (!flipper.hasClass('flipped')){
		flipper.velocity({
			rotateY: "0deg"
		}, 1000, [300, 25]);

		card.velocity({
			height: 200,
			width: 200
		}, 1000, [300, 25]);
	} else {
		flipper.velocity({
			rotateY: "180deg"
		}, 1000, [300, 25]);

		card.velocity({
			height: width,
			width: height
		}, 1000, [300, 25]);
	}
}

var flipItem = function(flipper){
	flipper.velocity({
		rotateX: "180deg"
	}, 1000, [300, 25]);
}

var blowUp = function(element, content){
	element.velocity({
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		translateX: 0,
		translateY: 0
	}, 500, [.8, .6, .8, 1]);

	if (content != null){
		content.velocity({
			rotateY: "0deg"
		}, 500, [.8, .6, .8, 1]);
	}
}

donutTransition['fadeIn'] = fadeIn;
donutTransition['fadeOut'] = fadeOut;
donutTransition['swingIn'] = swingIn;
donutTransition['twistIn'] = twistIn;
donutTransition['flipCard'] = flipCard;
donutTransition['flipItem'] = flipItem;
donutTransition['blowUp'] = blowUp;
