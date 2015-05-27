Colors = {
	primary: "#F2C71F",
	blue: "#55acee",
	green: "rgb(111, 174, 42)"
};

Fonts = {
	serif: "'Lora', Helvetica, serif",
	sansSerif: "'Source Sans Pro', Helvetica, sans-serif"
};

Breakpoints = {
	mobile: "@media only screen and (max-width: 568px)",
	mobileLandscape: "@media only screen and (min-device-width: 320px) and (max-device-width: 640px) and (orientation: landscape)",
	tablet: "@media only screen and (min-width: 569px) and (max-width: 980px)",
	desktop: "@media only screen and (min-width: 981px) and (max-width: 1200px)",
	desktopXL: "@media only screen and (min-width: 1201px)",
};

var WRAPPER = 1000;
var GRID_UNIT = (WRAPPER / 12);
var GRID_COLUMNS = 6;
var GRID_UNIT_FLUID = 100 / GRID_COLUMNS;

Grid = {
	base:{
		float: "left"
	},
	container: {
		width: "100%"
	},
	one: {
		width: 1 * GRID_UNIT_FLUID + '%'
	},
	two: {
		width: 2 * GRID_UNIT_FLUID + '%'
	},
	three: {
		width: 3 * GRID_UNIT_FLUID + '%'
	},
	four: {
		width: 4 * GRID_UNIT_FLUID + '%'
	},

}