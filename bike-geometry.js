var Bike = (function Bike() {

	// Initial Setup
	// -------------
	
	var name, wheelSize, forkLength, wheelBase, chainStay, bbHeight, seatTube, standOverHeight, seatAngle,
		headAngle, topTube, name, leftSpace, groundLevel;

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
    	ctx.moveTo(0, groundLevel);
    	ctx.lineTo(600, groundLevel);
    	ctx.strokeStyle = "rgb(120,120,120)";
    	ctx.lineWidth = 0.5;
    	ctx.stroke();

    	return;
	}







	// ---------------------------------
	// Helpers and position calculations
	// ---------------------------------

	// Returns the BB position based on the Chainstay length
	var bbPosition = function () {
		bbToWheelCenter = wheelSize/2 - bbHeight;
		return {
				x: leftSpace + (bbX() * zoomFactor),
				y: groundLevel - (bbHeight * zoomFactor)
			};
	}

	// Return the BB x position based on the chainstay length
	var bbX = function() {
		var x = Math.sqrt(Math.abs(Math.pow(chainStay, 2) - Math.pow(bbToWheelCenter, 2)));
		console.log(x);
		return x;
	}


	// Renders the bike into the provided canvas context.
	var renderBike = function(ctx) {
  		// drawing wheels
		ctx.strokeStyle = "rgb(140,140,140)";
		ctx.lineWidth = 1;// * zoomFactor;
		
		ctx.beginPath();
		ctx.arc(leftSpace, groundLevel - (wheelSize * zoomFactor/2), wheelSize/2 * zoomFactor, 0 ,Math.PI*2, true);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(leftSpace + wheelBase * zoomFactor,  groundLevel - (wheelSize * zoomFactor/2), wheelSize/2* zoomFactor, 0 ,Math.PI*2, true);
		ctx.stroke();

		ctx.strokeStyle = "rgb(50, 50, 50)";

		// bottom bracket
		ctx.lineWidth = zoomFactor;
		ctx.beginPath();
		ctx.arc(bbPosition().x, bbPosition().y, 1 * zoomFactor, 0 ,Math.PI*2, true);
		ctx.stroke();


		// seat tube
		angle = 270 - seatAngle;
		angle = angle * Math.PI / 180;
		seatTubeTopX = bbPosition().x + (seatTube * zoomFactor) * Math.sin(angle);
		seatTubeTopY = bbPosition().y + (seatTube * zoomFactor) * Math.cos(angle);
		ctx.lineWidth = 1 * zoomFactor;
		ctx.beginPath();
		ctx.moveTo(bbPosition().x, bbPosition().y);
		ctx.lineTo(seatTubeTopX, seatTubeTopY); 
		ctx.stroke();


		//chainstay
		ctx.beginPath();
		ctx.moveTo(leftSpace, groundLevel - (wheelSize * zoomFactor/2)); 
		ctx.lineTo(bbPosition().x, bbPosition().y); // this should the center of the BB.
		
		ctx.stroke();

		// fork
		angle = 270 - headAngle;
		angle = angle * Math.PI / 180;
		forkTopX = leftSpace + wheelBase * zoomFactor + (forkLength * zoomFactor) * Math.sin(angle);
		forkTopY = groundLevel - (wheelSize * zoomFactor/2) + (forkLength * zoomFactor) * Math.cos(angle);
		ctx.lineWidth = 1 * zoomFactor;
		ctx.beginPath();
		ctx.moveTo(leftSpace + wheelBase * zoomFactor, groundLevel - (wheelSize * zoomFactor/2));
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

		// Rest of Frame
		// TODO: Have options.

		ctx.lineWidth = 1 * zoomFactor;
		ctx.beginPath();
		ctx.moveTo(bbPosition(groundLevel).x, bbPosition(groundLevel).y);
		ctx.lineTo(endX, endY);
		ctx.stroke();


		ctx.lineWidth = 1 * zoomFactor;
		ctx.beginPath();
		ctx.moveTo(endX, endY);
		ctx.lineTo(seatTubeTopX, seatTubeTopY);
		ctx.stroke();


		ctx.lineWidth = 1 * zoomFactor;
		ctx.beginPath();
		ctx.moveTo(leftSpace, groundLevel - (wheelSize * zoomFactor/2));
		ctx.lineTo(seatTubeTopX, seatTubeTopY);
		ctx.stroke();
	}

	//
	// Renders all Measurements.
	// 
	var renderMeasurements  = function(ctx) {
		ctx.strokeStyle = "rgb(250,0,0)";
		ctx.lineWidth = 2;// * zoomFactor;
		ctx.globalAlpha = 1;
		ctx.font = (2 * zoomFactor) + "px Arial";

		measurementSpacing = 2 * zoomFactor;

		// wheels
		renderMeasurement(ctx, leftSpace - wheelSize*zoomFactor/2, groundLevel + 1 * zoomFactor,
			leftSpace + wheelSize*zoomFactor/2, groundLevel + 1 * zoomFactor, wheelSize, measurementSpacing);

		renderMeasurement(ctx, leftSpace - (wheelSize)*zoomFactor/2 + wheelBase*zoomFactor,
			groundLevel + 1 * zoomFactor, leftSpace + (wheelSize)*zoomFactor/2 + wheelBase*zoomFactor, groundLevel + 1 * zoomFactor,
			wheelSize, measurementSpacing);

		// fork
		angle = 270 - headAngle;
		angle = angle * Math.PI / 180;
		forkTopX = measurementSpacing + leftSpace + wheelBase * zoomFactor + (forkLength * zoomFactor) * Math.sin(angle);
		forkTopY = groundLevel - (wheelSize * zoomFactor/2) + (forkLength * zoomFactor) * Math.cos(angle);

		renderMeasurement(
			ctx,
			measurementSpacing + leftSpace + wheelBase * zoomFactor,
			groundLevel - (wheelSize * zoomFactor/2),
			measurementSpacing + leftSpace + wheelBase * zoomFactor,
			forkTopY,
			forkLength,
			measurementSpacing
			);

		// BB height
		renderMeasurement(ctx, bbPosition().x + 9, groundLevel, bbPosition().x + 9, bbPosition().y, bbHeight, measurementSpacing);

		// chainstay
		renderMeasurement(ctx, leftSpace, bbPosition().y + 15, 
			bbPosition().x, bbPosition().y + 15, chainStay, measurementSpacing);
	}

	// renderMeasurement()
	// 		Renders a single measurement.
	//		spacing from the part must be provided.
	//		It doesn't use zoom factor
	var renderMeasurement = function(ctx, startX, startY, endX, endY, label, measurementSpacing) {

		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();

		if (startY == endY) {
			// it is horizontal
			ctx.beginPath();
			ctx.moveTo(startX, startY - measurementSpacing);
			ctx.lineTo(startX, startY);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(endX, endY - measurementSpacing);
			ctx.lineTo(endX, endY);
			ctx.stroke();

			ctx.save();
			ctx.fillStyle = "rgb(250,0,0)";
			ctx.translate(startX, startY);
			ctx.rotate(0);
			ctx.textAlign = "center";
			ctx.fillText(label + " in.", Math.abs(endX - startX) / 2, measurementSpacing);
			ctx.restore();


		} else if ( startX == endX) {

			// it is vertical
			ctx.beginPath();
			ctx.moveTo(startX - measurementSpacing, startY);
			ctx.lineTo(startX, startY);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(endX - measurementSpacing, endY);
			ctx.lineTo(endX, endY);
			ctx.stroke();

			ctx.save();
			ctx.fillStyle = "rgb(250,0,0)";
			ctx.translate(startX, startY);
			ctx.rotate(-Math.PI/2);
			ctx.textAlign = "center";
			ctx.fillText(label + " in.", Math.abs(endY - startY) / 2, measurementSpacing);
			ctx.restore();
		}


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
			leftSpace = parseFloat(values.leftSpace);
			groundLevel = parseFloat(values.groundLevel);
			zoomFactor = parseFloat(values.zoomFactor);
			wheelSize = parseFloat(values.wheelSize);
			wheelBase = parseFloat(values.wheelBase);
			chainStay = parseFloat(values.chainStay);
			bbHeight = parseFloat(values.bbHeight);
			seatTube = parseFloat(values.seatTube);
			standOverHe = parseFloat(values.standOverHeight);
			seatAngle = parseFloat(values.seatAngle);
			headAngle = parseFloat(values.headAngle);
			topTube = parseFloat(values.topTube);
			forkLength = parseFloat(values.forkLength);
		},

		/**
			Renders the bike using regular Canvas.
		*/
		renderCanvas : function(canvasElement, renderGrid, values, imgUrl) {

			this.setValues(values);

			canvas = document.getElementById(canvasElement);
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// console.log(ctx);
			if (!requiredParts())  {
				console.log('Missing parts');
				return;
			}

			// render image
			if (imgUrl) {
				var img = new Image;
				img.src = imgUrl;
				img.onload = function() {
					ctx.globalAlpha = 0.3;
					ctx.drawImage(img,0,0, 600, 600 * img.height / img.width);
					ctx.globalAlpha = 1;
					if (renderGrid)
						renderGridCanvas(ctx);
					renderBike(ctx);
					renderMeasurements(ctx);
				}
				

			} else  {
				if (renderGrid)
					renderGridCanvas(ctx);
				renderBike(ctx);
				renderMeasurements(ctx);
			}

		},

	}
})();