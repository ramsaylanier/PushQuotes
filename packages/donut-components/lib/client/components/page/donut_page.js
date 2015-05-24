var options = {};
var data, page, animation;

Template.page.onCreated(function(){
	var instance = this;
	data = instance.data || 0;

	options = {
		easing: data.easing || 'easeOut',
		duration: data.duration || 500,
		delay: data.delay || 0,
		animateIn: data.animateIn || 'slideInFromRight',
		animateOut: data.animateOut || 'slideOutToLeft'
	}

	Session.set("pageOptions", options);
	Session.set('currentPageTitle', data.pageTitle || 'Page');
});

Template.page.onRendered(function(){
	page = this.$('.page');
	options = Session.get('pageOptions');
	animationType = options.animateIn || 'slideInFromRight';
	donutAnimation.findAnimation(options, animationType, page);
});

Template.page.events({
	'click .transition-link': function(e, template){
		e.preventDefault();
		var data = template.data;
		var url = $(e.currentTarget).attr('href');

		//close menu if it's open
		if (Session.get('shelfState') !== 'notActive'){
			donutStates.closeShelfState();
		}

		animationType = data.animateOut || 'slideOutToLeft';
		donutAnimation.findAnimation(options, animationType, page, url);
	},
	'click .modal-trigger': function(e){
		e.preventDefault();
		console.log(e);
		var modal = $(e.currentTarget).data('modal');
		var modalTemplate = Template[modal];
		Blaze.render(modalTemplate, $('.page').get(0));
	}
})