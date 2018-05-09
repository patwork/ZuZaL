// main.js
/* global Game */

document.addEventListener('DOMContentLoaded', function() {

	const FOREVER = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) { return setTimeout(callback, 1000 / 60); };

	let elCanvasFront = document.getElementById('canvas');
	let elContextFront = elCanvasFront.getContext('2d');

	let elCanvasBack = document.createElement('canvas');
	let elContextBack = elCanvasBack.getContext('2d');

	let width = elCanvasFront.width;
	let height = elCanvasFront.height;

	elCanvasBack.width = width;
	elCanvasBack.height = height;

	let game = new Game(elContextBack, width, height);
	game.setup();

	function mainloop() {
		game.update();
		game.render();
		elContextFront.drawImage(elCanvasBack, 0, 0);
		FOREVER(mainloop);
	}

	mainloop();

});
