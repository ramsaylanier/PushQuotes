var options = {};
var data, page, animation;

Template.donutHeader.onCreated(function(){
	var instance = this;
	data = instance.data || 0;

	options = {
		easing: data.easing || 'easeOut',
		duration: data.duration || 500,
		delay: data.delay || 0,
		animateIn: data.animateIn || 'slideInFromRight',
		animateOut: data.animateOut || 'slideOutToLeft'
	}

	Session.set("headerOptions", options);
});

Template.donutHeader.onRendered(function(){
	header = this.$('.header');
	options = Session.get('headerOptions');
	animationType = options.animateIn || 'slideInFromRight';
	donutAnimation.findAnimation(options, animationType, header);
});


Template.donutHeader.events({
	'click .modal-trigger': function(e){
		e.preventDefault();
		var modal = $(e.currentTarget).data('modal');
		var modalTemplate = Template[modal];
		Blaze.render(modalTemplate, $('.page').get(0));
	}
})