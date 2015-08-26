PageHero = React.createClass({
	render(){

		var heroImage = this.props.heroImage || null; 

		var style = {
			backgroundImage: "url('" + heroImage + "')"
		}

		return (
			<div className={"page-hero " + this.props.classes}>
				<div className="wrapper">
					{this.props.heroImage && 
						<div className="hero-image" style={style}></div>
					}
					{this.props.children}
				</div>
			</div>
		)
	}
})