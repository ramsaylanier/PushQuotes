var styles = {
	base: {
		backgroundColor: "white",
		height: HeaderHeight,
		position: "fixed",
		width: "100%",
		left: 0,
		top: 0,
		zIndex: 900
	},
	logo:{
		height: "100%",
		width: HeaderHeight,
		display: "inline-block",
	}
}

Header = ReactMeteor.createClass(Radium.wrap({
	getMeteorState: function(){
		return{
			loggedIn: Meteor.user()
		}
	},
	render: function(){
		var navs = getNavs();
		var isActive = this.props.active || false;
		return (
			<header 
				style = {[
					styles.base
				]}
			>
				<Wrapper>
					<Logo/>
					{navs.map(function(nav){
						if (nav.location == 'header'){
							return <NavList key={nav.name} navItems={nav.navItems} navType={nav.name} isActive={isActive}/>
						}
					})}
				</Wrapper>
			</header>
		)
	}
}));

Logo = ReactMeteor.createClass(Radium.wrap({
	render: function(){
		return (
			<a className="home-link transition-link" style={[styles.logo]} href="/">{LogoIcon}</a>
		)
	}
}))


Template.header.onRendered(function(){
	React.render(
		<Header />,
		$('#header').get(0)
	);
});

Template.header.events({
	'mouseenter .home-link':function(e){
		$('.logo').velocity('stop');
		$('.logo').velocity({
			scale: 1.1
		}, 1000, [300, 10]);

		$('.logo-quotebox').velocity({
			"fill": Colors.green
		}, 300, 'easeOut');
	},
	'mouseleave .home-link':function(e){
		$('.logo').velocity('stop');
		$('.logo').velocity({
			scale: 1
		}, 1000, [300, 10]);

		$('.logo-quotebox').velocity({
			"fill": Colors.primary
		}, 300, 'easeOut')
	}
})