#### Warning: early stages, do not use yet

# Bike Geometry Builder

Creates and render a bike using geometry data. Initially it will render the bike using plain HTML Canvas, 
but more rendering options are plannedd.

## Usage

The bike geometry must be defined in the following format.

	geometry = {
		name : "My Bike",
		zoomFactor : 5,
		wheelSize : 27.5,
		wheelBase: 43.5,
		chainStay : 0,
		bbHeight : 12,
		seatTube : 19,
		standOverHeight : 0,
		seatAngle : 73,
		headAngle : 71,
		forkLength : 16,
		topTube: 0
	}

Using this object you can render the bike on any canvas object providing an ID, wether or not we render a grid and the geometry object.

  Bike.renderCanvas("bike-render", true, geometry);


## Demo

The included bike.html has a real time bike builder that can be used as an example for testing geometry.