Template.donutToggle.events({
	'click .donut-toggle': function(e){
		e.preventDefault();

		toggle = $(e.currentTarget);
		$('.donut-toggle').removeClass('active');

		var state = this.state || null;
		var target = $(this.target) || null;
		
		if (state){
			donutStates[state](toggle, target);
		} else{
			return false;
		}
	}
})