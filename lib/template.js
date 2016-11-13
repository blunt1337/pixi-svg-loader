var Container = PIXI.Container, Sprite = PIXI.Sprite, Texture = PIXI.Texture, Rect = PIXI.Rectangle;

// Textures
@textures

// Class
function @classname() {
	Container.call(this);
	
	@children
	@anchors
	@positions
}
@classname.prototype = Object.create(PIXI.Container.prototype);
@classname.prototype.constructor = @classname;
module.exports = @classname;