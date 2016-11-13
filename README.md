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
```js
// Just require your svg, MySvg is now a class extending PIXI.Container
var MySvg = require('pixi-svg!./my-svg.svg');

// You can instanciate it and add it to your stage
stage.addChild(new MySvg());
```

## Advanced usage

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
// Convert and instanciate the svg
var CarStage = require('pixi-svg!./car-stage.svg');
var stage = new CarStage();

// You can now move your car
stage.car.position.x += 0.05;

// And turn the wheels
stage.car.front_wheel.rotation += 0.005;
stage.car.rear_wheel.rotation += 0.005;
```

## More samples

More samples are available in the *[samples](http://github.com/blunt1337/pixi-svg-loader/tree/master/samples)* folder.

## Why not use a simple svg converter?

If you convert it to png, you loose the svg light file size, and you won't have this great hierarchy system. Placing your Sprite can be a pain without it.
It is also a pain to convert it to PIXI.Graphics because Graphics is for simple primitive, for example it doesn't handle holes as easily as in svg.
The svg is kept inside the result js file, and converted to PIXI.Texture at runtime with the browser's native svg renderer.

## id query strings

You can add a query string to your node's ids like #my-id?key1=value1&key2=value2. Valid keyes are for now:
#### origin (alias 'o')
Change the origin of the element, the center point.
The origin string can be composed of numeric pixels, percents, or special letters.
Those values can be separated by a coma for x,y.
Special letters are bounds of the paintbox. L: left, R: right, T: top, B: bottom, C or M: center/middle. i.g.:
- '10,10': 10px, 10px.
- 'tr': top right corner.
- 't': 0, top.
- 'r': right, 0.
- 'r - 2': right - 2px, 0.
- 'l + 5%, t + 5%': left + 5% of viewbox width, top + 5% of viewbox height

## Production

In production, just use the svgo-loader before pixi-svg-loader. ('pixi-svg!**svgo**!./car-stage.svg')

## TODO

- [x] Decode Illustrator IDs
- [x] Retina ready
- [x] Fix z order
- [x] Use a common module to create the textures
- [x] Make css/gradient/masks/etc working
- [x] To be able to put an origin on a node
- [x] Pack all parts into one svg then split the texture with new PIXI.Texture(base, new PIXI.Rectangle(x, y, w, h));
- [x] Option to disable the packing / or disable when packing fails
- [ ] Onload/onerror event
- [ ] Option in the loader, to create a larger resolution
- [ ] To be able to put a classname on a node
- [ ] Option to make [Phaser](https://phaser.io) Sprite that is based on PIXI
- [ ] Option documentation
- [ ] More tests

To suggest a feature, report a bug, or general discussion:
http://github.com/blunt1337/pixi-svg-loader/issues/