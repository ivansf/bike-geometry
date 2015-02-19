var Bike = (function Bike() {

	// Initial Setup
	// -------------
	
	var name, wheelSize, forkLength, wheelBase, chainStay, bbHeight, seatTube, standOverHeight, seatAngle,
		headAngle, topTube, name;
	var leftSpace = 150;
	var ground = 350;

	// Checks for required numbers to be present.
	// ------------------------------------------
	var requiredParts = function() {

		var valid = false;
		name.length > 0 ? valid = true : valid = false;
		// console.log(wheelSize);
		wheelSize ? valid = true : valid = false;
		// this.seatAngle > 0 ? valid = true : valid = false;
		// this.separation > 0 ? valid = true : valid = false; 
		// this.separation = 100;

		//throw "Missing separation";
		return valid;
	}

	// Renders a guide grid
	// --------------------
	var	renderGridCanvas = function(ctx) { 
		ctx.beginPath();
		ctx.strokeStyle = "rgb(120,120,120)";
		ctx.lineWidth = 0.5;
		for (var i = 0; i <= 600; i+=10) {
			ctx.moveTo(i * this.zoomFactor,0);
			ctx.lineTo(i * this.zoomFactor, 410);
		};
    	ctx.stroke();

    	ctx.beginPath();
    	ctx.moveTo(0, ground);
    	ctx.lineTo(600, ground);
    	ctx.strokeStyle = "rgb(120,120,120)";
    	ctx.lineWidth = 0.5;
    	ctx.stroke();

    	return;
	}







	// ---------------------------------
	// Helpers and position calculations
	// ---------------------------------

	var bbPosition = function (ground) {
		// x should be calculated using the chainstay

		// TODO: Properly calculate BB position based on chainstay length using 1 point and an arc.
		return {
				x: leftSpace + wheelBase/2 * zoomFactor,
				y: (ground - (bbHeight * zoomFactor))
			}; // random number for now
	}


	// Public Methods
	// --------------
	// 	

	// setValues()
	// 		should be called if the geometry has to be passed before it gets
	// 		rendered. This can be helpful when we just need calculations.

	return {

		setValues : function(values) {
			name = values.name;
			zoomFactor = values.zoomFactor;
			wheelSize = values.wheelSize;
			wheelBase = values.wheelBase;
			chainStay = values.chainStay;
			bbHeight = values.bbHeight;
			seatTube = values.seatTube;
			standOverHe = values.standOverHeight;
			seatAngle = values.seatAngle;
			headAngle = values.headAngle;
			topTube = values.topTube;
			forkLength = values.forkLength;
		},

		/**
			Renders the bike using regular Canvas.
		*/
		renderCanvas : function(canvasElement, renderGrid) {
			canvas = document.getElementById(canvasElement);
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// console.log(ctx);
			if (!requiredParts())  {
				console.log('Missing parts');
				return;
			}

			// var base = 250;
			
			

			if (renderGrid)
				renderGridCanvas(ctx);


	  		// drawing wheels
			ctx.strokeStyle = "rgb(140,140,140)";
			ctx.lineWidth = 2 * zoomFactor;
			

			ctx.beginPath();
			ctx.arc(leftSpace, ground - (wheelSize * zoomFactor/2), wheelSize/2 * zoomFactor, 0 ,Math.PI*2, true);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(leftSpace + wheelBase * zoomFactor,  ground - (wheelSize * zoomFactor/2), wheelSize/2* zoomFactor, 0 ,Math.PI*2, true);
			ctx.stroke();

			ctx.strokeStyle = "rgb(50, 50, 50)";

			// inner wheels
			// ctx.lineWidth = 1;
			// ctx.beginPath();
			// ctx.arc(leftSpace + wheelBase * zoomFactor,  ground - (wheelSize * zoomFactor/2), (wheelSize/2 * 0.9) * zoomFactor, 0 ,Math.PI*2, true);
			// ctx.stroke();

			// ctx.lineWidth = 1;
			// ctx.beginPath();
			// ctx.arc(leftSpace,  ground - (wheelSize * zoomFactor/2), (wheelSize * 0.9) * zoomFactor/2, 0 ,Math.PI*2, true);
			// ctx.stroke();


			// bottom bracket
			ctx.lineWidth = zoomFactor;
			ctx.beginPath();
			ctx.arc(bbPosition(ground).x, bbPosition(ground).y, 1 * zoomFactor, 0 ,Math.PI*2, true);
			ctx.stroke();


			// seat tube
			angle = 270 - seatAngle;
			angle = angle * Math.PI / 180;
			endX = bbPosition(ground).x + (seatTube * zoomFactor) * Math.sin(angle);
			endY = bbPosition(ground).y + (seatTube * zoomFactor) * Math.cos(angle);
			ctx.lineWidth = 1 * zoomFactor;
			ctx.beginPath();
			ctx.moveTo(bbPosition(ground).x, bbPosition(ground).y);
			ctx.lineTo(endX, endY); 
			ctx.stroke();


			//chainstay
			ctx.beginPath();
			ctx.moveTo(bbPosition(ground).x, bbPosition(ground).y); // this should the center of the BB.
			ctx.lineTo(leftSpace, ground - (wheelSize * zoomFactor/2)); 
			ctx.stroke();

			// fork
			angle = 270 - headAngle;
			angle = angle * Math.PI / 180;
			forkTopX = leftSpace + wheelBase * zoomFactor + (forkLength * zoomFactor) * Math.sin(angle);
			forkTopY = ground - (wheelSize * zoomFactor/2) + (forkLength * zoomFactor) * Math.cos(angle);
			ctx.lineWidth = 1 * zoomFactor;
			ctx.beginPath();
			ctx.moveTo(leftSpace + wheelBase * zoomFactor, ground - (wheelSize * zoomFactor/2));
			ctx.lineTo(forkTopX, forkTopY);
			ctx.stroke();

			// Head Tube
			// Using the end of the fork (top coordinates)
			angle = 270 - headAngle;
			angle = angle * Math.PI / 180;
			endX = forkTopX + (5 * zoomFactor) * Math.sin(angle);
			endY = forkTopY + (5 * zoomFactor) * Math.cos(angle);
			ctx.lineWidth = 2 * zoomFactor;
			ctx.beginPath();
			ctx.moveTo(forkTopX, forkTopY);
			ctx.lineTo(endX, endY); 
			ctx.stroke();



		},

	}
})();