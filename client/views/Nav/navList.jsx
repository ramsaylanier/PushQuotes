NavList = React.createClass(Radium.wrap({
	render: function(){
		var navItems = this.props.navItems;
		var isActive = this.props.isActive;
		var styles = {
			base: {
				height: "100%",
			},
			primary: {
				float: 'right'
			},
			mobile: {
				height: HeaderHeight
			}
		}

		return (
			<nav className={this.props.navType + "-nav"}

				style={[
					styles.base,
					styles[this.props.navType]
				]} 

			>
				<ul className="nav-list">
					{navItems.map(function(item){
						return (
							<NavItem {...item} isActive={isActive} />
						)	
					})}
				</ul>
			</nav>
		)
	}
}));

SubNavList = React.createClass(Radium.wrap({
	render: function(){
		var navItems = this.props.navItems;
		var isActive = this.props.isActive;
		var styles = {
			base: {
				position: "absolute",
				transform: "rotateX(100deg)",
				transformOrigin: "top center",
				top: HeaderHeight,
				right: 0,
				transition: "transform 0ms ease-out 500ms",
				perspective: 100
			},
			active:{
				transform: "rotateX(0deg)",
				transition: "transform 0ms ease-out 0ms",
			}
		}
		return (
			<ul className="sub-nav-list"
				style={[
					styles.base,
					isActive && styles.active
				]}
			>
				{navItems.map(function(item){
					return (
						<NavItem {...item} isActive={isActive} subNavItem={true} />
					)
				})}
			</ul>
		)
	}
}))

NavItem = React.createClass(Radium.wrap({
	render: function(){
		var isActive = this.props.isActive;
		var isSubNavItem = this.props.subNavItem;


		var styles = {
			base: {
				position: "relative",
				display: "inline-block",
				backgroundColor: "white",
				height: "100%",
				display: "flex",
				alignItems: "center",
				padding: "0rem",
			},
			navLink: {
				color: Colors.primary,
				display: "block",
				height: "100%",
				width: "100%",
				padding: ".5rem"
			},
			subNavItem:{
				backgroundColor: Colors.primary,
				display: 'block',
				transform: "rotateX(-180deg)",
				transition: "transform 150ms ease-out",
				transformOrigin: "top center",
				backfaceVisibility: "hidden",
				transitionDelay: (5 * 50) - (50 * this.props.id) + 'ms',
			},
			subNavLink:{
				color: "white",
				padding: ".5rem",
				transition: "background-color 200ms ease-out",
				':hover': {
					backgroundColor: Color(Colors.primary).darken(0.3).hexString()
				}
			},
			active: {
				transform: "rotateX(0deg)",
				opacity: 1,
				transitionDelay: 50 * this.props.id + 'ms'
			}
		}

		return (
			<li 
				className={"nav-item " + this.props.className + '-nav-item'} 
				style={[
					styles.base,
					isSubNavItem && styles.subNavItem,
					isActive && styles.active
				]}

			    onMouseEnter={this.props.mouseEnter} onMouseLeave={this.props.mouseLeave}
			>
				<a 
					className={"nav-link " + this.props.className} 
					style={[
						styles.navLink,
						isSubNavItem && styles.subNavLink
					]}
					href={this.props.url} onClick={this.props.clickFunction}>{this.props.icon? this.props.icon : this.props.name}</a>
				{ this.props.subnav ? <SubNavList {...this.props.subnav} isActive={isActive} />: null}
			</li>
		)
	}
}));