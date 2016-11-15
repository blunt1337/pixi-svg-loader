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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {


		var common = __webpack_require__(0),
			svg2baseTexture = common.svg2baseTexture,
			inherits = common.inherits;
		var Container = PIXI.Container, Sprite = PIXI.Sprite, Texture = PIXI.Texture, Rect = PIXI.Rectangle;var atlas = svg2baseTexture("<style>.st0{fill:#fff}.st1,.st2{fill:none;stroke:#ddd;stroke-width:20;stroke-miterlimit:10}.st2{fill:#fff}</style><g transform=\"translate(0 0)\"><path id=\"_x23_stroke\" class=\"st1\" d=\"M10 10h80v80H10z\"/></g><g transform=\"translate(-10 0)\"><path id=\"_x23_both\" class=\"st2\" d=\"M120 10h80v80h-80z\"/></g><g transform=\"translate(-10 90)\"><path id=\"_x23_fill\" class=\"st0\" d=\"M10 10h80v80H10z\"/></g>", 200, 180);
var texture_0 = new Texture(atlas, new Rect(0, 100, 80, 80));
var texture_1 = new Texture(atlas, new Rect(0, 0, 100, 100));
var texture_2 = new Texture(atlas, new Rect(100, 0, 100, 100));
function UsersBluntProjectsNodejsPixiSvgLoaderSamples02ColorColorSvg() {
Container.call(this);
var child_0 = this.fill = new Sprite(texture_0); this.addChild(child_0);
var child_1 = this.stroke = new Sprite(texture_1); this.addChild(child_1);
var child_2 = this.both = new Sprite(texture_2); this.addChild(child_2);

					child_0.anchor.set(-0.13,-0.13);
child_2.anchor.set(-1.10,0.00);

					
				}
inherits(UsersBluntProjectsNodejsPixiSvgLoaderSamples02ColorColorSvg, Container);module.exports = UsersBluntProjectsNodejsPixiSvgLoaderSamples02ColorColorSvg;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

// Renderer (compatible retina)
var width = 210, height = 100;
var renderer = PIXI.autoDetectRenderer(width, height, { antialias: false, resolution: window.devicePixelRatio });
renderer.backgroundColor = 0xFFFFFF;
renderer.view.style.width = width + 'px';
renderer.view.style.height = height + 'px';
document.getElementById('color').appendChild(renderer.view)

// The SVG is now a PIXI Container
var Color = __webpack_require__(1);

// Instanciate
var color = new Color();

// Transform some colors
color.stroke.tint = 0xFF9D2A;
color.fill.tint = 0xC15858;
color.both.tint = 0x108CA2;

// Render
renderer.render(color)

/***/ }
/******/ ]);