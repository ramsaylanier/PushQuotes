donutStates = {
	toggleShelfState:function(toggle, shelf){
		if (!toggle){
			var toggle = $('.donut-toggle');
		}

		if (!shelf){
			var shelf = $('.shelf');
		}

		if (shelf.hasClass('active')){
			Session.set('shelfState', 'notActive');
			$('.shelf').removeClass('active');
			$('.donut-toggle').removeClass('active');
			donutAnimation.shelfClose(shelf);
		} else {
			if (shelf.hasClass('left-shelf')){
				Session.set('shelfState', 'leftShelfActive');
			} else {
				Session.set('shelfState', 'rightShelfActive');
			}
			$('.shelf').removeClass('active');
			shelf.addClass('active');
			toggle.addClass('active');
			donutAnimation.shelfOpen(shelf);
		}
	},
	closeShelfState: function(){
		Session.set('shelfState', 'notActive');
		var shelfs = $('.shelf');
		$('.donut-toggle').removeClass('active');

		_.each(shelfs, function(shelf){
			if ($(shelf).hasClass('active')){
				donutAnimation.shelfClose($(shelf));
				$(shelf).removeClass('active');
			}
		});
	},
	checkModalState:function(){
		console.log('checkModalState');
		var modalState = Session.get('modalState');

		if (modalState == 'active' && $('.modal').length){
			this.switchModalState();
		}
	},
	switchModalState:function(){
		var modalState = Session.get('modalState');
		var modalOptions = Session.get('modalOptions');
		var modal = $('.modal');

		if (modalState == 'active'){
			Session.set('modalState', 'notActive');
			donutAnimation.animate(modal, modalOptions.animateOut, modalOptions);

			Meteor.setTimeout(function(){
				modal.remove();
			}, modalOptions.duration + modalOptions.delay);
			
		} else {
			Session.set('modalState', 'active');
			donutAnimation.animate(modal, modalOptions.animateIn, modalOptions);
		}
	},
	goBack: function(){
		var currentPage = $('.page');
		var currentPageOptions = Session.get('pageOptions');
		var animationType = currentPageOptions.animateOut;

		donutAnimation.findAnimation(currentPageOptions, animationType, currentPage);

		Meteor.setTimeout(function(){
			history.back();
		}, currentPageOptions.duration);
	}
}

