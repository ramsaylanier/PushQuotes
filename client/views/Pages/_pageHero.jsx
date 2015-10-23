PageHero = React.createClass({
	render(){

		var heroImage = this.props.heroImage || null;

		var style = {
			backgroundImage: "url('" + heroImage + "')"
		}

		return (
			<div className={"page-hero " + this.props.classes} style={style}>
				<div className="wrapper">
					<div className="hero-content">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
})
