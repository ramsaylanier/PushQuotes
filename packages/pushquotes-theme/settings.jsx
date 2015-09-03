MobileNav = new Nav();
MobileNav.name = "mobile";
MobileNav.location = "header";
MobileNav.navItems = function(){
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
				url: '/search',
				name: 'search',
				icon: SearchIcon,
				className: 'transition-link search-toggle'
			},
			{
				url: '',
				name: Meteor.user().username,
				className: 'nav-toggle',
				icon: MenuIcon,
				clickFunction: function(){
					var toggle = $('.nav-toggle');
					var nav = $('.mobile-nav');
					// var isActive = false;
					toggle.toggleClass('active');
					nav.toggleClass('active');

					// if (toggle.hasClass('active')){
					// 	isActive = true;
					// }

					// React.render(
					// 	<Header active={isActive} />,
					// 	$('#header').get(0)
					// );
					
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
							url: '/favorites',
							name: 'Favorites',
							className: 'transition-link',
							clickFunction: function(){
								$('.nav-list').removeClass('active');
								$('.nav-toggle').removeClass('active');
							}
						},
						{
							id: 5,
							url: '', 
							name: 'logout',
							clickFunction: function(){ 
								Meteor.logout(function(error){
									if (!error){ 
										FlowRouter.go('/');
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

ShelfNav = new Nav();
ShelfNav.name = 'shelf';
ShelfNav.location = 'shelf';
ShelfNav.navItems = function(){
	var navItems = [];

	if (Meteor.user()){
		navItems = [
			{
				url: '/' + Meteor.user().username,
				name: 'Dashboard',
				className: 'nav-toggle'
			},
			{
				url: '',
				name: 'logout',
				className: 'nav-toggle',
				clickFunction: function(){
					Meteor.logout(function(){
						FlowRouter.go('/');
					});	
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

PrimaryNav = new Nav();
PrimaryNav.name = "primary";
PrimaryNav.location = 'header';
PrimaryNav.navItems = function(){
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
							url: '/favorites',
							name: 'Favorites',
							className: 'transition-link'
						},
						{
							id: 5,
							url: '', 
							name: 'logout',
							clickFunction: function(){ 
								Meteor.logout(function(error){
									if (!error){ 
										FlowRouter.go('/');
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

Navs.push(PrimaryNav);
Navs.push(ShelfNav);
Navs.push(MobileNav);

Settings = {
	LogoIcon: LogoIcon
}