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
	return new BaseTexture(img, PIXI.SCALE_MODES.LINEAR, ratio);
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