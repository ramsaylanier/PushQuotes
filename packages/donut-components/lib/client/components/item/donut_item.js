Template.donutItem.onCreated(function(){
	var instance = this;

	var itemData = instance.data || 0;

	instance.itemOptions = {
		easing: itemData.easing || 'easeOut',
		duration: itemData.duration || 500,
		delay: itemData.delay || 0,
		animateIn: itemData.animateIn || 'slideInFromRight',
		animateOut: itemData.animateOut || 'slideOutToLeft'
	}
});

Template.donutItem.onRendered(function(){
	var instance = this;
	var item = this.$('.item');
	var options = instance.itemOptions;
	var animationType = options.animateIn || 'slideInFromRight';
	donutAnimation.findAnimation(options, animationType, item);
});