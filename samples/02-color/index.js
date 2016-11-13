// Renderer (compatible retina)
var width = 100, height = 100;
var renderer = PIXI.autoDetectRenderer(width, height, { antialias: false, resolution: window.devicePixelRatio });
renderer.backgroundColor = 0xFFFFFF;
renderer.view.style.width = width + 'px';
renderer.view.style.height = height + 'px';
document.body.appendChild(renderer.view)

// The SVG is now a PIXI Container
var Color = require('../../index.js!svgo-loader!./color.svg');

// Instanciate
var color = new Color();

// Transform it's color
color.stroke.tint = color.fill.tint = 0x108CA2;

// Render
renderer.render(color)