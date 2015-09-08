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
				icon: Icons.BackIcon, 
				className: 'back-toggle',
				clickFunction: function(){
					history.back();
				} 
			},
			{
				url: '/' + Meteor.user().username,
				name: Meteor.user().username,
				className: 'home-toggle',
				icon: <UserAvatar image={Meteor.user().profile.avatar} />,
			},
			{
				url: '',
				name: Meteor.user().username,
				className: 'nav-toggle',
				icon: Icons.MenuIcon,
				clickFunction: function(){
					ToggleShelf();
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
				className: 'transition-link',
				clickFunction: function(){
					$('.nav-list').removeClass('active');
					$('.nav-toggle').removeClass('active');
				}
			},
			{
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
				url: '/favorites',
				name: 'Favorites',
				className: 'transition-link',
				clickFunction: function(){
					$('.nav-list').removeClass('active');
					$('.nav-toggle').removeClass('active');
				}
			},
			{
				url: '', 
				name: 'logout',
				clickFunction: function(){ 
					Meteor.logout(function(error){
						if (!error){ 
							FlowRouter.go('/');
						}
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
				icon: Icons.SearchIcon,
				className: 'transition-link search-toggle'
			},
			{
				url: '',
				name: Meteor.user().username,
				icon: <UserAvatar image={Meteor.user().profile.avatar} />
				,
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
								var modal = '<div class="modal new-form-modal"></div>';
								$('body').append(modal);

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
			
		]
	}

	return navItems;
}

Navs.push(PrimaryNav);
Navs.push(ShelfNav);
Navs.push(MobileNav);


Settings.LogoIcon = Icons.LogoIcon;