donutAnimation = {
	findAnimation: function(options, animationType, element, url){

		if (animationType !== 'none'){
			var transition = donutTransition[animationType](element);
			this.animate(element, transition, options)
		}

		if (url){
			Meteor.setTimeout(function(){
				Router.go(url);
			}, (options.delay + options.duration));
		}
	},
	shelfOpen: function(shelf){

		var page = $('.page');
		var header = $('.header');
		var nav = $('.nav');
		var amount = shelf.outerWidth();

		var transition;
		var options = {
			easing: [.3, 1, .4, 1]
		};

		if (shelf.hasClass('right-shelf')){
			transition = donutTransition.slideLeft(-amount);
		} else if (shelf.hasClass('left-shelf')){
			transition = donutTransition.slideRight(amount);
		}

		this.animate(page, transition, options);
		this.animate(shelf, transition, {duration: 1});

		if (header.length){
			this.animate(header, transition, options);
		}

		if (nav.length){
			this.animate(nav, transition, options);
		}
	},
	shelfClose: function(shelf){

		if (!shelf){
			var shelf = $('.shelf');
		}
		
		var header = $('.header');
		var nav = $('.nav');
		var page = $('.page');
		var transition;
		var options = {
			easing: [.3, 1, .4, 1]
		};

		transition = donutTransition.slideBack();
		this.animate(shelf, transition, {duration: 1, delay: 500});	
		this.animate(page, transition, options);

		if (header.length){
			this.animate(header, transition, options);
		}

		if (nav.length){
			this.animate(nav, transition, options);
		}

	},
	animate: function(element, transition, options){

		var options = options || {};
		var delay = options.delay || 0;
		var duration = options.duration || 500;
		var easing = options.easing || 'easeOut';

		if (typeof(transition) == 'string'){
			transition = donutTransition[transition](element);
		}

		element.velocity(transition, {duration: duration, easing: easing, delay: delay});
	}
}

donutTransition = {

	slideInFromRight: function(element){
		return {"translateX": [0, "100vw"], opacity: [1, 0]};
	},
	slideInFromRight_Short: function(element){
		return {"translateX": [0, "20px"], opacity: [1, 0]};
	},
	slideInFromTop: function(element){
		element.velocity({
			"translateY": "-100vh", 
		}, 0);

		return {"translateY": 0};
	},
	slideInFromTop_Short: function(element){
		return {"translateY": [0, "-20px"], opacity: [1, 0]};
	},
	slideInFromBottom: function(element){
		element.velocity({
			"translateY": "100vh", 
		}, 0);

		return {"translateY": 0};
	},
	slideInFromBottom_Short: function(element){
		return {"translateY": [0, "20px"], opacity: [1, 0]};
	},
	slideOutToBottom_Short: function(element){
		return {"translateY": ["20px", 0], opacity: [0, 1]};
	},
	slideOutToLeft: function(){
		return {"translateX": "-100vw"};
	},

	slideOutToTop: function(){
		return {"translateY": "-100vh"};
	},

	zoomIn: function(element){
		return {"scale": [1, 1.2], "opacity": [1, 0]};
	},
	zoomOut: function(){
		return {"scale": 1.2, "opacity": 0};
	},
	
	slideLeft: function(amount){
		return {"translateX": amount}
	},

	slideRight: function(amount){
		return {"translateX": amount}
	},

	slideBack: function(){
		return {"translateX": 0}
	}
}

addToTransitions = [];
