NavList = React.createClass({
	render: function(){
		var navItems = this.props.navItems;

		return (
			<nav className={this.props.navType + "-nav"}>
				<ul className="nav-list">
					{navItems.map(function(item){
						return (
							<NavItem {...item}/>
						)	
					})}
				</ul>
			</nav>
		)
	}
});

SubNavList = React.createClass({
	render: function(){
		var navItems = this.props.navItems;

		return (
			<ul className="sub-nav-list">
				{navItems.map(function(item){
					return (
						<NavItem {...item} subNavItem={true} />
					)
				})}
			</ul>
		)
	}
});

NavItem = React.createClass({
	render: function(){
		var isSubNavItem = this.props.subNavItem;

		return (
			<li className={"nav-item " + this.props.className} >
				<a 
					className={"nav-link"} 
					href={this.props.url} onClick={this.props.clickFunction}>{this.props.icon? this.props.icon : this.props.name}
				</a>

				{ this.props.subnav ? <SubNavList {...this.props.subnav}/> : null}
			</li>
		)
	}
});

Nav = function(){
	this.name = '';
	this.location = '';
	this.navItems = function(){};
}

Navs = [];