Header = React.createClass({
	getMeteorState: function(){
		return{
			loggedIn: Meteor.user()
		}
	},
	render: function(){
		var navs = getNavs();

		return (
			<Wrapper>
				<Logo/>
				{navs.map(function(nav){
					if (nav.location == 'header'){
						return <NavList key={nav.name} navItems={nav.navItems} navType={nav.name}/>
					}
				})}
			</Wrapper>
		)
	}
});

Logo = React.createClass({
	render: function(){

		var href = Meteor.user() ? "/" + Meteor.user().username : '/;'

		return (
			<a className="logo home-link transition-link" href={href}>{LogoIcon}</a>
		)
	}
});

Template.header.helpers({
	Header: function(){
		return Header;
	}
})

Template.header.events({
	'mouseenter .home-link':function(e){
		$('.logo').velocity('stop');
		$('.logo').velocity({
			scale: 1.1
		}, 1000, [300, 10]);

		$('.logo-quotebox').velocity({
			"fill": Colors.dark
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