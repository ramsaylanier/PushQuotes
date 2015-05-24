Template.donutList.onRendered(function(){
	var instance = this;
	var data = instance.data || 0;
	var options = {
		duration: data.duration || 500,
		delay: data.delay || 50,
		easing: data.easing || 'easeOut'
	}

	Session.set('itemCount', 0);

	var items = instance.findAll('.item');

	_.each(items, function(item, index){
		Meteor.setTimeout(function(){
    		donutAnimation.animate($(item), data.itemAnimateIn, options);
    	}, options.delay * index);
	});

	if (data.animateItems){
		instance.find('.transition-wrapper')._uihooks = {
		    insertElement: function(node, next){		 
		    	var itemCount = Session.get('itemCount');
		    	itemCount ++;	
		    	Session.set('itemCount', itemCount);	    	

		    	$(node).insertBefore(next);

		    	setTimeout(function(){
		    		donutAnimation.animate($(node), data.itemAnimateIn, options);
		    	}, options.delay * itemCount);
		    },
		    removeElement: function(node, next){
	    		donutAnimation.animate($(node), data.itemAnimateOut, options);
	    		setTimeout(function(){
	    			$(node).remove();
	    		}, options.duration + options.delay)
		    },
		    moveElement: function(node,next){		
		    	var $node = $(node), $next = $(next);
				var oldTop = $node.offset().top;
				var height = $node.outerHeight(true);

				// find all the elements between next and node
				var $inBetween = $next.nextUntil(node);
				if ($inBetween.length === 0)
				$inBetween = $node.nextUntil(next);

				// now put node in place
				$node.insertBefore(next);

				// measure new top
				var newTop = $node.offset().top;

				// move node *back* to where it was before
				$node
				.removeClass('animate')
				.css('top', oldTop - newTop);

				// push every other element down (or up) to put them back
				$inBetween
				.removeClass('animate')
				.css('top', oldTop < newTop ? height : -1 * height)


				// force a redraw
				$node.offset();

				// reset everything to 0, animated
				$node.addClass('animate').css('top', 0);
				$inBetween.addClass('animate').css('top', 0);
		    }
		}
	}
});

Template.donutList.onDestroyed(function(){
	// var items = this.findAll('.item');
	// $.each(items, function(index, item){
	// 	$(item).remove();
	// })
	// console.log('list-destroyed');
})