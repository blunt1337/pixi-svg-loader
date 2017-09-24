```
       _      _                            _                 _
 _ __ (_)_  _(_)      _____   ____ _      | | ___   __ _  __| | ___ _ __
| '_ \| \ \/ / |  _  / __\ \ / / _` |  _  | |/ _ \ / _` |/ _` |/ _ \ '__|
| |_) | |>  <| | (_) \__ \\ V / (_| | (_) | | (_) | (_| | (_| |  __/ |
| .__/|_/_/\_\_|     |___/ \_/ \__, |     |_|\___/ \__,_|\__,_|\___|_|
|_|                            |___/
```

# SVG for Pixi with webpack

Use your SVG graphic files with [Pixi](http://www.pixijs.com) and [webpack](https://webpack.github.io/docs/).

## Installation

`npm install --save pixi-svg-loader`

## Usage

The loader allows you to create a hierarchy tree, like native svg can do. For example, a car, with wheels.
Let's assume we have an svg with this structure:

```xml
<svg ..>
	<rect id="road" ../>
	<g id="#car">
		<path id="body" ../>
		<circle id="#front_wheel?origin=cc" ../>
		<circle id="#rear_wheel?origin=cc" ../>
	</g>
	<path id="tree" ../>
</svg>
```

Every id starting with a # will be accessible in javascript. Other ids are just ignored, so they can still be used for gradient, etc.
Extra parameter can be passed with a [query string](http://github.com/blunt1337/pixi-svg-loader/blob/master/README.md#id-query-strings). In this example, the wheels' origin is 'cc' (x: center, y: center).

```js
// Your pixi renderer
var renderer = PIXI.autoDetectRenderer(...)
document.body.appendChild(renderer.view)

// Convert to a container class and instanciate
var CarStage = require('pixi-svg!./car-stage.svg');
var stage = new CarStage();

// You can now move your car
stage.car.position.x += 0.05;

// And turn the wheels
stage.car.front_wheel.rotation += 0.005;
stage.car.rear_wheel.rotation += 0.005;

// Render loop
function gameLoop() {
    requestAnimationFrame(gameLoop)
    renderer.render(stage)
}
gameLoop()
```

## More samples

More samples are available in the *[samples](http://htmlpreview.github.io/?https://github.com/blunt1337/pixi-svg-loader/blob/master/samples/index.html)* folder.

## Why not use a simple svg converter?

- You can keep the svg's light weight filesize,
- you keep the nodes' hierarchy tree, not the pain of placing sprites in containers, etc,
- it will render as native svg as you designed it

# Preparing your SVG files

Your SVG files must not use groups with their own `translate`
attributes. i.e. all coordinates in paths etc. must be global.

In Inkscape, the [apply transforms](https://github.com/Klowner/inkscape-applytransforms)
plugin is useful to remove these.

## id query strings

You can add a query string to your node's ids like #my-id?key1=value1&key2=value2. Valid keys are for now:
#### origin (alias 'o')

Change the origin of the element, the center point.
The origin string can be composed of numeric pixels, percents, or special letters.
Those values can be separated by a coma for x,y.
Special letters are bounds of the paintbox. L: left, R: right, T: top, B: bottom, C or M: center/middle. e.g.:
- '10,10': 10px, 10px.
- 'tr': top right corner.
- 't': 0, top.
- 'r': right, 0.
- 'r - 2': right - 2px, 0.
- 'l + 5%, t + 5%': left + 5% of viewbox width, top + 5% of viewbox height

#### classname (alias 'c')

Set a classname on the node so you can re-use it multiple times. e.g.:
```xml
<circle id="#circle?classname=my-circle"/>
```
can be instanciate with
```js
var Svg = require('my.svg');
var circle = new Svg.MyCircle();
```

## Loader's options

#### default_origin (default: viewbox x and y)
Just like [origin](https://github.com/blunt1337/pixi-svg-loader#origin-alias-o) option, but as default.

#### resolution (default: "window.devicePixelRatio || 1")
Resolution of the generated texture, can be javascript code.

#### disable_packing
Disable the packing of multiple textures into one texture.

## Production

In production, just use the [svgo-loader](https://github.com/rpominov/svgo-loader) before pixi-svg-loader. ('pixi-svg!**svgo**!./car-stage.svg')

## TODO

- [x] Decode Illustrator IDs
- [x] Retina ready
- [x] Fix z order
- [x] Use a common module to create the textures
- [x] Make css/gradient/masks/etc working
- [x] To be able to put an origin on a node
- [x] Pack all parts into one svg then split the texture with new PIXI.Texture(base, new PIXI.Rectangle(x, y, w, h));
- [x] Option to disable the packing / or disable when packing fails
- [x] Option in the loader, to create a larger resolution
- [x] To be able to put a classname on a node
- [ ] Paintbox are not working outside of the viewbox
- [ ] Load images with the PIXI loader
- [ ] Onload/onerror event
- [ ] More tests

To suggest a feature, report a bug, or general discussion:
http://github.com/blunt1337/pixi-svg-loader/issues/