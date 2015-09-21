var existingAnimateModalOut = Animations.AnimateModalOut;

Animations.AnimateModalOut = function(){
	$('.page').removeClass('edit-mode');
	$('.card').removeClass('edit-mode');
	existingAnimateModalOut();
}

Animations.AnimateCardIn = function(card, itemCount){
	console.log('animate card in');
	console.log(itemCount);
	// TweenMax.fromTo(card, 1, {
	// 	opacity: 0,
	// 	y: 20
	// }, {
	// 	opacity: 1,
	// 	y: 0,
	// 	ease: Power4.easeOut,
	// 	delay: itemCount * .05
	// });

	TweenMax.to(card, 1, {
		opacity: 1,
		y: 0,
		ease: Power4.easeOut
	});
}

Animations.AnimateCardOut = function(card){
	console.log('animate card out');
	TweenMax.fromTo(card, 1, {
		opacity: 1,
		y: 0
	}, {
		opacity: 1,
		y: 20,
		ease: Power4.easeOut
	});
}

Animations.ResetCards = function(){
	var cards = $('.item');
	_.each(cards, function(card){
		TweenMax.to(card, .5, {
			opacity: 1,
			x: 0,
			scale: 1,
			rotation: 0,
			boxShadow: "0px 5px 5px -5px rgba(0,0,0,.3)"
		})
	})
}