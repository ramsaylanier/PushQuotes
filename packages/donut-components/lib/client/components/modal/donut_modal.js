Template.donutModal.onCreated(function(){
	var instance = this;
	data = instance.data || 0;

	options = {
		easing: data.easing || 'easeOut',
		duration: data.duration || 500,
		delay: data.delay || 0,
		animateIn: data.animateIn || 'zoomIn',
		animateOut: data.animateOut || 'zoomOut'
	}

	Session.set("modalOptions", options);
	Session.set("modalState", 'active');
});

Template.donutModal.onRendered(function(){
	modal = this.$('.modal');
	options = Session.get('modalOptions');
	animationType = options.animateIn || 'zoomIn';
	donutAnimation.findAnimation(options, animationType, modal);
})

Template.donutModal.onDestroyed(function(){
	Session.set("modalState", 'notActive');
})

Template.donutModal.events({
	'click .close-modal-btn': function(){
		modal = $('.modal');
		options = Session.get('modalOptions');
		animationType = options.animateOut || 'zoomOut';
		donutAnimation.findAnimation(options, animationType, modal);

		Meteor.setTimeout(function(){
			modal.remove();
		}, options.duration)
	}
})