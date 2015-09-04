Shelf = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return{
			loggedIn: Meteor.user()
		}
	},
	componentDidMount(){
		var shelf = React.findDOMNode(this.refs.shelf);
		var application = $('.application');
		var overlay = $('<div class="overlay"></div>');
		application.append(overlay);

		TweenMax.to(application, .5, {
			x: "-80%",
			ease: Power4.easeOut
		});

		TweenMax.to(overlay, .5, {
			opacity: .8,
			ease: Power4.easeOut
		});

		$('.shelf .nav-item').on('click', function(e){
			ToggleShelf();
		})
	},
	componentWillUnmount(){
		var overlay = $('.application .overlay');
		overlay.remove();
	},
	render(){
		return(
			<div ref="shelf" className="shelf">
				{Navs.map(function(nav){
					if (nav.location == 'shelf'){
						console.log(nav);
						console.log(nav.navItems());
						return <NavList key={nav.name} navItems={nav.navItems()} navType={nav.name}/>
					}
				})}
			</div>
		)
	}
});

ToggleShelf = function(){
	var toggle = $('.nav-toggle');
	var nav = $('.mobile-nav');
	toggle.toggleClass('active');
	nav.toggleClass('active');

	if (nav.hasClass('active')){
		var shelf = $('<div id="shelf-container"></div>');
		$('#react-root').append(shelf);

		React.render(
			<Shelf/>,
			shelf.get(0)
		)
	} else {
		var application = $('.application');
		var overlay = application.children('.overlay');

		TweenMax.to(application, .3, {
			x: "0%"
		});

		TweenMax.to(overlay, .3, {
			opacity: 0
		});

		Meteor.setTimeout(function(){
			React.unmountComponentAtNode($('#shelf-container').get(0));
			$('#shelf-container').remove();
			application.removeAttr('style');
		}, 350);
	}
}