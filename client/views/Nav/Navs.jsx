PrimaryNavItems = function(){

	var navItems = [];

	return navItems;
}

MobileNavItems = function(){
	var navItems = [];
	if (Meteor.user()){
		navItems = [
			{
				url: '', 
				name: 'back', 
				icon: BackIcon, 
				className: 'back-toggle',
				clickFunction: function(){
					history.back();
				} 
			},
			{
				url: '',
				name: Meteor.user().username,
				className: 'nav-toggle',
				icon: MenuIcon,
				clickFunction: function(){
					var toggle = $('.nav-toggle');
					var isActive = false;
					toggle.toggleClass('active');

					if (toggle.hasClass('active')){
						isActive = true;
					}

					React.render(
						<Header active={isActive} />,
						$('#header').get(0)
					);
					
				},
				subnav: {
					navItems: [
						{
							id: 1,
							url: '/' + Meteor.user().username, 
							name: 'Dashboard',
							className: 'transition-link',
							clickFunction: function(){
								$('.nav-list').removeClass('active');
								$('.nav-toggle').removeClass('active');
							}
						},
						{
							id: 2,
							url: '/profile',
							name: 'Profile',
							className: 'transition-link',
							clickFunction: function(){
								$('.nav-list').removeClass('active');
								$('.nav-toggle').removeClass('active');
							}
						},
						{
							id: 3,
							url: '',
							name: 'New Deck',
							clickFunction: function(){
								var modal = document.createElement('div');
								$(modal).addClass('modal new-form-modal');
								document.body.appendChild(modal);

								$('.nav-list').removeClass('active');
								$('.nav-toggle').removeClass('active');

								React.render(
									<Modal>
										<Form attributes={newDeckForm} />
									</Modal>,
									modal
								)
							}
						},
						{
							id: 4,
							url: '', 
							name: 'logout',
							clickFunction: function(){ 
								Meteor.logout(function(error){
									if (!error){ 
										Router.go('/');
										Session.set('loggedIn', false); 
									}
								}); 
							} 
						}
					]
				}
			},
			{
				url: '/search',
				name: 'search',
				icon: SearchIcon,
				className: 'transition-link search-toggle'
			}
		]
	} else {
		navItems = [
			{url: '/login', name: 'login', className: 'transition-link'}
		]
	}

	return navItems;
} 

PrimaryNavItems = function(){
	var navItems = [];
	if (Meteor.user()){
		navItems = [
			{
				url: '/search',
				name: 'search',
				icon: SearchIcon,
				className: 'transition-link search-toggle'
			},
			{
				url: '',
				name: Meteor.user().username,
				mouseEnter: function(e){
					React.render(
						<Header active={true} />,
						$('#header').get(0)
					);
				},
				mouseLeave: function(e){
					React.render(
						<Header active={false} />,
						$('#header').get(0)
					);
				},
				subnav: {
					navItems: [
						{
							id: 1,
							url: '/' + Meteor.user().username, 
							name: 'Dashboard',
							className: 'transition-link'
						},
						{
							id: 2,
							url: '/profile',
							name: 'Profile',
							className: 'transition-link'
						},
						{
							id: 3,
							url: '',
							name: 'New Deck',
							clickFunction: function(){
								var modal = document.createElement('div');
								$(modal).addClass('modal new-form-modal');
								document.body.appendChild(modal);

								React.render(
									<Modal>
										<Form attributes={newDeckForm} />
									</Modal>,
									modal
								)
							}
						},
						{
							id: 4,
							url: '', 
							name: 'logout',
							clickFunction: function(){ 
								Meteor.logout(function(error){
									if (!error){ 
										Router.go('/');
										Session.set('loggedIn', false); 
									}
								}); 
							} 
						}
					]
				}
			}
		]
	} else {
		navItems = [
			{url: '/login', name: 'login', className: 'transition-link'}
		]
	}

	return navItems;
} 

AccountSubNavItems = {

}

getNavs = function(){
	var Navs = [
		{ name: 'mobile', location: 'header', navItems: MobileNavItems()},
		{ name: 'primary', location: 'header', navItems: PrimaryNavItems()}
	];

	return Navs;
}
