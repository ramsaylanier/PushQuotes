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
					console.log(this);

					var toggle = $('.nav-toggle');
					var list = toggle.parents('.nav-list');

					toggle.blur();
					toggle.toggleClass('active');
					list.toggleClass('active');
				},
				subnav: {
					navItems: [
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

PrimaryNavItems = function(){
	var navItems = [];
	if (Meteor.user()){
		navItems = [
			{
				url: '',
				name: Meteor.user().username,
				mouseEnter: function(e){
					$(e.target).parents('.nav-list').addClass('active');
				},
				mouseLeave: function(e){
					$(e.target).parents('.nav-list').removeClass('active');
				},
				subnav: {
					navItems: [
						{
							url: '/' + Meteor.user().username, 
							name: 'Dashboard',
							className: 'transition-link'
						},
						{
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
