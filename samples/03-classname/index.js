// Renderer (compatible retina)
var width = 500, height = 200;
var renderer = PIXI.autoDetectRenderer(width, height, { antialias: false, resolution: window.devicePixelRatio });
renderer.backgroundColor = 0xFFFFFF;
renderer.view.style.width = width + 'px';
renderer.view.style.height = height + 'px';
document.getElementById('classname').appendChild(renderer.view)

// The SVG is now a PIXI Container
var MySvgScene = require('../../index.js!svgo-loader!./spider.svg');

// Instanciate
var scene = new MySvgScene();
scene.removeChild(scene.spider);

// Spider class defined in the svg with ?classname=spider
var Spider = MySvgScene.Spider;

// Time in frames until the spider is removed
var LIFETIME = 60 * 15;

// All spiders
var spiders = [];

// Add custom functions
Spider.prototype.init = function () {
	// Random colors
	this.body.tint = Math.random() * 0xFFFFFF;  
	this.ass.tint = Math.random() * 0xFFFFFF;
	
	// Random position
	this.toY = Math.random() * height;
	this.position.x = Math.random() * width;
	
	// Start position
	this.position.y = -this.height;
	
	// Time before delete
	this.lifetime = LIFETIME;
};
Spider.prototype.tick = function () {
	// Move + alpha
	this.position.y += (this.toY - this.position.y) / 5;
	
	// Dead
	if (--this.lifetime <= 0) {
		this.parent.removeChild(this);
		spiders.splice(spiders.indexOf(this), 1)
	}
};

// Render loop
var time_before_new_spider = 0;
function gameLoop() {
	requestAnimationFrame(gameLoop)
	renderer.render(scene)
	
	var i = spiders.length;
	while (i > 0) {
		spiders[--i].tick();
	}
	
	// Create 3 spiders per lifetime
	if (time_before_new_spider-- <= 0) {
		var spider = new Spider();
		spider.init();
		scene.addChild(spider);
		spiders.push(spider);
		
		time_before_new_spider = LIFETIME / 10;
	}
}
gameLoop()