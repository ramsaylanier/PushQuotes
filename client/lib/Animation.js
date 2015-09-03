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

AnimateModalIn = function(){
	var modal = $('.modal');
	var page = $('.page');

	TweenMax.to(page, .4, {
		x: "-20%"
	});

	TweenMax.to(modal, .4, {
		x: 0,
		ease: Power2.easeOut
	});

	$('body').addClass('modal-active');
}

AnimateModalOut = function(){
	var self = this;
	var modal = $('.modal');
	var page = $('.page');

	TweenMax.to(page, .4, {
		x: "0%"
	});

	TweenMax.to(modal, .4, {
		x: "100%",
		ease: Power2.easeOut
	});

	Meteor.setTimeout(function(){
		React.unmountComponentAtNode(modal.get(0));
		modal.remove();
		$('body').removeClass('modal-active');
		$('body').css({
			top: 0
		});
		$(window).scrollTop(self.scrollTop);
	}, 500);
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