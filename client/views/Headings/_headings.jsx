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
	Headings[heading] = React.createClass({
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

      var Heading = heading;

			return (
				<Heading className={this.props.className}>
					{this.props.children}
				</Heading>
			)
		}
	});
});