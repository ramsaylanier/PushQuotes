NavList = React.createClass({
	render: function(){
		var navItems = this.props.navItems;
		return (
			<nav className={this.props.navType + "-nav"}>
				<ul className="nav-list">
					{navItems.map(function(item){
						return (
							<NavItem {...item} />
						)	
					})}
				</ul>
			</nav>
		)
	}
})

SubNavList = React.createClass({
	render: function(){
		var navItems = this.props.navItems;
		return (
			<ul className="sub-nav-list">
				{navItems.map(function(item){
					return (
						<NavItem {...item} />
					)
				})}
			</ul>
		)
	}
})

NavItem = React.createClass({
	render: function(){
		return (
			<li className={"nav-item " + this.props.className + '-nav-item'} onMouseEnter={this.props.mouseEnter} onMouseLeave={this.props.mouseLeave}>
				<a className={"nav-link " + this.props.className} href={this.props.url} onClick={this.props.clickFunction}>{this.props.icon? this.props.icon : this.props.name}</a>
				{ this.props.subnav ? <SubNavList {...this.props.subnav} />: null}
			</li>
		)
	}
})