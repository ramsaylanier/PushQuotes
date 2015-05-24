Header = ReactMeteor.createClass({
	getMeteorState: function(){
		return{
			loggedIn: Meteor.user()
		}
	},
	render: function(){
		var navs = getNavs();
		return (
			<div className="wrapper">
			{navs.map(function(nav){
				if (nav.location == 'header'){
					return <NavList key={nav.name} navItems={nav.navItems} navType={nav.name}/>
				}
			})}
			</div>
		)
	}
});


Template.header.onRendered(function(){
	React.render(
		<Header />,
		$('#header').get(0)
	);
});