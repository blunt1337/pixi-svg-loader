/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

var BaseTexture = PIXI.BaseTexture;

/**
 * Create base texture from svg content
 * @param	{String}	svg_element_content
 * @param	{Number}	w
 * @param	{Number}	h
 * @return	{BaseTexture}
 */
function svg2baseTexture(svg_element_content, w, h, x, y) {
	var ratio = window.devicePixelRatio || 1;
	x = x || 0;
	y = y || 0;
	
	// Build an image
	var img = new Image();
	img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="'+x+'px" y="'+y+'px" width="'+(w*ratio)+'px" height="'+(h*ratio)+'px" viewBox="'+x+' '+y+' '+w+' '+h+'" xml:space="preserve">'+svg_element_content+'</svg>';
	
	// Return a texture
	return new BaseTexture(img, PIXI.SCALE_MODES.DEFAULT, ratio);
};

/**
 * Extends the prototype of a class by another one
 * @param	{Function}	subClass
 * @param	{Function}	superClass
 */
function inherits(subClass, superClass) {
	subClass.prototype = Object.create(superClass.prototype);
	subClass.prototype.constructor = subClass;
};

module.exports = {
	svg2baseTexture: svg2baseTexture,
	inherits: inherits
};

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {


		var common = __webpack_require__(0),
			svg2baseTexture = common.svg2baseTexture,
			inherits = common.inherits;
		var Container = PIXI.Container, Sprite = PIXI.Sprite, Texture = PIXI.Texture, Rect = PIXI.Rectangle;var atlas = svg2baseTexture("<style>.st0{fill:url(#XMLID_5_)}.st1{opacity:.3;fill:#fff}.st2{opacity:.31;fill:none;stroke:#fff;stroke-miterlimit:10}.st3{fill:#606060}.st4{fill:#fff}</style><radialGradient id=\"XMLID_5_\" cx=\"5.042\" cy=\"1.681\" r=\"443.858\" gradientTransform=\"matrix(1.1316 .4328 -.5299 .8792 1.514 -1.98)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#3862a0\"></stop><stop offset=\"1\" stop-color=\"#01073e\"></stop></radialGradient><g transform=\"translate(0 0)\"><g id=\"bg\"><path id=\"XMLID_2_\" class=\"st0\" d=\"M0 0h500v200H0z\"/><path id=\"XMLID_3_\" class=\"st1\" d=\"M0 0h500v200H0z\"/></g></g><g transform=\"translate(-101 200)\"><path id=\"XMLID_1_\" class=\"st2\" d=\"M101.5 175V-43\"/></g><g transform=\"translate(-80 36)\"><path id=\"_x23_body\" class=\"st3\" d=\"M81.9 180.6c4 2.8 8.6 4.2 12.2 4.9-2.9 1.4-6.3 3.8-9.2 8-.4.6-.3 1.5.3 2 .6.4 1.5.3 2-.3 2.9-4.1 6.1-6.2 8.8-7.4-1.6 2-3.4 5.2-4.9 10.3-.2.7.2 1.5.9 1.8.7.2 1.5-.2 1.8-.9 2.3-7.8 5.1-10.4 6.6-11.3.2.6.6 1 1 1.3 0 .2-.1.3-.1.5 0 .7.4 1.3.8 1.4l.2-1.6h.2l.2 1.6c.5-.2.8-.7.8-1.4 0-.2 0-.4-.1-.5.4-.3.8-.7 1-1.3 1.5.9 4.2 3.5 6.6 11.3.2.7 1 1.2 1.8.9.7-.2 1.2-1 .9-1.8-1.5-5-3.2-8.2-4.9-10.2 2.7 1.2 5.9 3.3 8.8 7.4.4.6 1.3.8 2 .3.6-.4.8-1.3.3-2-3-4.2-6.3-6.6-9.2-8 3.6-.7 8.2-2.1 12.2-4.9.6-.4.8-1.3.3-2-.3-.4-.7-.6-1.1-.6-.3 0-.6.1-.8.3-4 2.8-8.7 4.1-12.2 4.6 2.9-2.6 6.4-7.4 9.3-16.4.2-.7-.2-1.5-.9-1.8-.1 0-.3-.1-.4-.1-.6 0-1.1.4-1.3 1-2.6 8-5.5 12.3-7.9 14.6.2-.8.3-1.6.3-2.5 0-4.2-2.6-7.6-5.7-7.6s-5.7 3.4-5.7 7.6c0 .9.1 1.7.3 2.5-2.4-2.3-5.3-6.6-7.9-14.6-.2-.6-.7-1-1.3-1-.1 0-.3 0-.4.1-.7.2-1.1 1-.9 1.8 2.9 9.1 6.4 13.9 9.3 16.4-3.5-.6-8.2-1.8-12.2-4.6-.2-.2-.5-.3-.8-.3-.4 0-.9.2-1.1.6-.7.6-.5 1.5.1 1.9z\"/></g><g transform=\"translate(-51 34)\"><ellipse id=\"_x23_ass\" class=\"st4\" cx=\"102.4\" cy=\"174.6\" rx=\"6.6\" ry=\"7.7\"/></g>", 500, 375);
var texture_0 = new Texture(atlas, new Rect(0, 0, 500, 200));
var texture_2 = new Texture(atlas, new Rect(0, 200, 1, 175));
var texture_3 = new Texture(atlas, new Rect(1, 200, 43, 36));
var texture_4 = new Texture(atlas, new Rect(44, 200, 14, 17));
function UsersBluntProjectsNodejsPixiSvgLoaderSamples03ClassnameSpiderSvg() {
Container.call(this);
var child_0 = new Sprite(texture_0); this.addChild(child_0);
var child_1 = this.spider = new Spider(); this.addChild(child_1);

					
					child_1.position.set(102.50,200.00);

				}
inherits(UsersBluntProjectsNodejsPixiSvgLoaderSamples03ClassnameSpiderSvg, Container);function Spider() {
Container.call(this);
var child_2 = new Sprite(texture_2); this.addChild(child_2);
var child_3 = this.body = new Sprite(texture_3); this.addChild(child_3);
var child_4 = this.ass = new Sprite(texture_4); this.addChild(child_4);

					child_2.anchor.set(-101.00,0.00);
child_3.anchor.set(-1.88,-4.56);
child_4.anchor.set(-6.79,-9.76);

					child_2.position.set(-102.50,-200.00);
child_3.position.set(-102.50,-200.00);
child_4.position.set(-102.50,-200.00);

				}
inherits(Spider, Container);module.exports = UsersBluntProjectsNodejsPixiSvgLoaderSamples03ClassnameSpiderSvg;
module.exports.Spider = Spider;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

// Renderer (compatible retina)
var width = 500, height = 200;
var renderer = PIXI.autoDetectRenderer(width, height, { antialias: false, resolution: window.devicePixelRatio });
renderer.backgroundColor = 0xFFFFFF;
renderer.view.style.width = width + 'px';
renderer.view.style.height = height + 'px';
document.getElementById('classname').appendChild(renderer.view)

// The SVG is now a PIXI Container
var MySvgScene = __webpack_require__(2);

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

/***/ }
/******/ ]);