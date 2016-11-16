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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

var BaseTexture = PIXI.BaseTexture;

/**
 * Create base texture from svg content
 * @param	{String}	svg_element_content		Content of the svg
 * @param	{int}		ratio					Resolution
 * @param	{int}		w						Width
 * @param	{int}		h						Height
 * @param	{int?}		x						Position x, default 0
 * @param	{int?}		y						Position y, default 0
 * @return	{BaseTexture}
 */
function svg2baseTexture(svg_element_content, ratio, w, h, x, y) {
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
		var Container = PIXI.Container, Sprite = PIXI.Sprite, Texture = PIXI.Texture, Rect = PIXI.Rectangle;var atlas = svg2baseTexture("<style>.st0{fill:none;stroke:#e6e6e6;stroke-miterlimit:10}.st1,.st2,.st3,.st4,.st5{fill:#f7931e;stroke:#f15a24;stroke-width:12;stroke-miterlimit:10}.st2,.st3,.st4,.st5{fill:#736357;stroke:#534741;stroke-width:5}.st3,.st4,.st5{fill:none;stroke:#39b54a;stroke-width:4}.st4,.st5{fill:#8cc63f}.st5{fill:#b3b3b3;stroke:gray;stroke-width:5}</style><g transform=\"translate(-114 -114)\"><circle id=\"sun\" class=\"st0\" cx=\"250\" cy=\"250\" r=\"135\"/><path id=\"earth_path\" class=\"st1\" d=\"M239.9 268l-10.1-17.5 10.1-17.5h20.2l10.1 17.5-10.1 17.5z\"/></g><g transform=\"translate(225 -183)\"><path id=\"earth\" class=\"st2\" d=\"M101.8 272.5L88.7 250l13.1-22.5h26.4l13.1 22.5-13.1 22.5z\"/><path id=\"tronc\" class=\"st3\" d=\"M115 219v8\"/><path id=\"tree\" class=\"st4\" d=\"M109.5 221l-5.2-9.5 5.2-9.5H120l5.2 9.5-5.2 9.5z\"/><circle id=\"moon_path\" class=\"st0\" cx=\"115\" cy=\"250\" r=\"66.2\"/></g><g transform=\"translate(174 -167)\"><path id=\"#moon\" class=\"st5\" d=\"M108.5 327.5l-6.6-11.5 6.6-11.5h13.1l6.6 11.5-6.6 11.5z\"/></g>", window.devicePixelRatio || 1, 408, 273);
var texture_1 = new Texture(atlas, new Rect(0, 0, 272, 272));
var texture_3 = new Texture(atlas, new Rect(273, 0, 134, 134));
var texture_4 = new Texture(atlas, new Rect(273, 135, 33, 28));
function UsersBluntProjectsNodejsPixiSvgLoaderSamples01OriginOriginSvg() {
Container.call(this);
var child_0 = this.sun = new Container(); this.addChild(child_0);
var child_1 = new Sprite(texture_1); child_0.addChild(child_1);
var child_2 = child_0.earth = new Container(); child_0.addChild(child_2);
var child_3 = new Sprite(texture_3); child_2.addChild(child_3);
var child_4 = child_2.moon = new Sprite(texture_4); child_2.addChild(child_4);

					child_1.anchor.set(0.50,0.50);
child_3.anchor.set(0.50,0.50);
child_4.anchor.set(0.50,0.50);

					child_0.position.set(250.00,250.00);
child_2.position.set(-135.00,0.00);
child_4.position.set(0.50,66.00);

				}
inherits(UsersBluntProjectsNodejsPixiSvgLoaderSamples01OriginOriginSvg, Container);module.exports = UsersBluntProjectsNodejsPixiSvgLoaderSamples01OriginOriginSvg;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

// Renderer (compatible retina)
var width = 500, height = 500;
var renderer = PIXI.autoDetectRenderer(width, height, { antialias: false, resolution: window.devicePixelRatio });
renderer.backgroundColor = 0xFFFFFF;
renderer.view.style.width = width + 'px';
renderer.view.style.height = height + 'px';
document.getElementById('origin').appendChild(renderer.view)

// The SVG is now a PIXI Container, default origin of objects is 'cc' (center, center)
var Origin = __webpack_require__(2);

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

/***/ }
/******/ ]);