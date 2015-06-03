// typl8-tera                    117 = 18 × 6.5
// typl8-giga                     90 = 18 × 5
// H1                    72 = 18 × 4
// H2                    60 = 18 × 3.3333
// H3                     48 = 18 × 2.6667
// H4                    36 = 18 × 2
// h5                   24 = 18 × 1.3333
// H6                 21 = 18 × 1.1667
// p                     18 = 18 × 1

const headingsArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

const headingsStyles = {
	base: {
		textRendering: "optimizeLegibility",
		lineHeight: 1,
		marginTop: 0,
		color: Colors.primary,
    fontWeight: 900,
		fontFamily: Fonts.serif,
	},
	h1: {
		fontSize: "4rem",
		marginBottom: (4/LineHeight) + 'rem'
	},
	h2: {
		fontSize: "3.333rem",
		marginBottom: (3.333/LineHeight) + 'rem'
	},
	h3: {
		fontSize: "2.6667rem",
		marginBottom: (2.6667/LineHeight) + 'rem'
	},
	h4: {
		fontSize: "2rem",
		marginBottom: (2/LineHeight) + 'rem'
	},
	h5: {
		fontSize: "1.333rem",
		marginBottom: (1.333/LineHeight) + 'rem'
	},
  p: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    fontFamily: Fonts.sansSerif
  }
}

Headings = {}

_.each(headingsArray, function(heading, index){
	Headings[heading] = React.createClass(Radium.wrap({
		render: function(){

			var styles = {
				base: headingsStyles.base,
        color: {
          color: this.props.color
        },
        fontWeight: {
          fontWeight: this.props.fontWeight
        }
			}

			console.log(headingsStyles[heading]);

      var Heading = heading;

			return (
				<Heading className={this.props.className}
					style={[
						headingsStyles[heading],
						styles.base,
						this.props.color && styles.color,
						this.props.weight && styles.fontWeight,
						styles.base.opacity = this.props.alpha,
						styles.base.textAlign = this.props.align
					]}
				>
					{this.props.children}
				</Heading>
			)
		}
	}));
});

// H1 = React.createClass(Radium.wrap({
// 	render: function(){
// 		var styles = {
// 			base: {
// 				fontSize: Headings.H1.size,
// 				marginBottom: Headings.H1.marginBottom,
// 			}
// 		}

// 		return (
// 			<h1 className={this.props.className}
// 				style={[
// 					Headings.style,
// 					styles.base,
// 					styles.base.color = this.props.color,
// 					styles.base.fontWeight = this.props.weight,
// 					styles.base.opacity = this.props.alpha,
// 					styles.base.textAlign = this.props.align
// 				]}
// 			>
// 				{this.props.children}
// 			</h1>
// 		)
// 	}
// }));

// H2 = React.createClass(Radium.wrap({
// 	render: function(){
// 		var styles = {
// 			base: {
// 				fontSize: Headings.H2.size,
// 				marginBottom: Headings.H2.marginBottom,
// 			}
// 		}

// 		return (
// 			<h2 className={this.props.className}
// 				style={[
// 					Headings.style,
// 					styles.base,
// 					styles.base.color = this.props.color,
// 					styles.base.fontWeight = this.props.weight,
// 					styles.base.opacity = this.props.alpha,
// 					styles.base.textAlign = this.props.align
// 				]}
// 			>
// 				{this.props.children}
// 			</h2>
// 		)
// 	}
// }));

// H3 = React.createClass(Radium.wrap({
// 	render: function(){
// 		var styles = {
// 			base: {
// 				fontSize: Headings.H3.size,
// 				marginBottom: Headings.H3.marginBottom,
// 			}
// 		}

// 		return (
// 			<h3 className={this.props.className}
// 				style={[
// 					Headings.style,
// 					styles.base,
// 					styles.base.color = this.props.color,
// 					styles.base.fontWeight = this.props.weight,
// 					styles.base.opacity = this.props.alpha,
// 					styles.base.textAlign = this.props.align
// 				]}
// 			>
// 				{this.props.children}
// 			</h3>
// 		)
// 	}
// }));

// H4 = React.createClass(Radium.wrap({
// 	render: function(){
// 		var styles = {
// 			base: {
// 				fontSize: Headings.H4.size,
// 				marginBottom: Headings.H4.marginBottom,
// 			}
// 		}

// 		return (
// 			<h4 className={this.props.className}
// 				style={[
// 					Headings.style,
// 					styles.base,
// 					styles.base.color = this.props.color,
// 					styles.base.fontWeight = this.props.weight,
// 					styles.base.opacity = this.props.alpha,
// 					styles.base.textAlign = this.props.align
// 				]}
// 			>
// 				{this.props.children}
// 			</h4>
// 		)
// 	}
// }));

// H5 = React.createClass(Radium.wrap({
// 	render: function(){
// 		var styles = {
// 			base: {
// 				fontSize: Headings.H5.size,
// 				marginBottom: Headings.H5.marginBottom,
// 			}
// 		}

// 		return (
// 			<h5 className={this.props.className}
// 				style={[
// 					Headings.style,
// 					styles.base,
// 					styles.base.color = this.props.color,
// 					styles.base.fontWeight = this.props.weight,
// 					styles.base.opacity = this.props.alpha,
// 					styles.base.textAlign = this.props.align
// 				]}
// 			>
// 				{this.props.children}
// 			</h5>
// 		)
// 	}
// }));