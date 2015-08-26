var DefaultDuration = .5;
var DefaultEasing = Power2.easeOut;
var DefaultInProperties = {
	opacity: 1,
	scale: 1,
	ease: DefaultEasing
}
var DefaultOutProperties = {
	opacity: 0,
	scale: 1.1,
	ease: DefaultEasing
}

DefaultPageAnimateIn = {
	duration: DefaultDuration,
	properties: DefaultInProperties
}

DefaultPageAnimateOut = {
	duration: DefaultDuration,
	properties: DefaultOutProperties
}

PageAnimationSequences = {
	loginPage: {
		page: {
			item: '.page',
			animationOut: DefaultPageAnimateOut,
			animationin: DefaultPageAnimateIn
		}
	},
	dashboardPage: {
		page: {
			item: '.page',
			animationOut: DefaultPageAnimateOut,
			animationin: DefaultPageAnimateIn
		}
	}
}

SlideShowContent = function(content, height){
	TweenMax.to(content, .3, {
		height: height,
		ease: Power2.easeOut
	});

	TweenMax.to(window, .6, {
		scrollTo: content.offset().top - 60,
		ease: Power2.easeOut
	});
}

SlideHideContent = function(content){
	TweenMax.to(content, .3, {
		height: 0,
		ease: Power2.easeOut
	});

	TweenMax.to(window, .6, {
		scrollTo: content.parent().offset().top - 60,
		ease: Power2.easeOut
	});

	Meteor.setTimeout(function(){
		React.unmountComponentAtNode(content);
	}, .6);
}

AnimatePageOut = function(page){
	var pageTitle = Session.get('currentPageTitle');
	var sequence = PageAnimationSequences[pageTitle];

	if (sequence){
		_.each(sequence, function(element){
			AnimateItem($(element.item), element.animationOut);
		});
	} else {
		AnimateItem($('.page'), DefaultPageAnimateOut);
	}

}

AnimateItem = function(item, animation){
	TweenMax.to(item, animation.duration, animation.properties)
	// item.velocity(animation.properties, animation.options);
}