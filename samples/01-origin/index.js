// Renderer (compatible retina)
var width = 500, height = 500;
var renderer = PIXI.autoDetectRenderer(width, height, { antialias: false, resolution: window.devicePixelRatio });
renderer.backgroundColor = 0xFFFFFF;
renderer.view.style.width = width + 'px';
renderer.view.style.height = height + 'px';
document.getElementById('origin').appendChild(renderer.view)

// The SVG is now a PIXI Container, default origin of objects is 'cc' (center, center)
var Origin = require('../../index.js?default_origin=cc!svgo-loader!./origin.svg');

// Instanciate
var origin = new Origin();

// Render loop
function gameLoop() {
	requestAnimationFrame(gameLoop)
	renderer.render(origin)
	
	// Rotate planets
	origin.sun.rotation += 0.005;
	origin.sun.earth.rotation += 0.005;
	origin.sun.earth.moon.rotation += 0.005;
}
gameLoop()