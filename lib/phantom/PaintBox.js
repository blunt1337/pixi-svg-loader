// /!\ Loaded in phantomjs, so es5

/**
 * Class to get real bounding boxes from svg, with their strokes.
 * Return an object with view_box: {x,y,width,height}, outerSVG: the <svg ...> content, and defs: <non_graphic> tags content
 * @class
 */
window.PaintBox = (function () {
	var non_graphic = ['defs', 'style', 'clippath', 'lineargradient', 'radialgradient', 'filter', 'font', 'glyph', 'marker', 'mask', 'pattern', 'symbol', 'view'];
	
	/**
	 * Create a new Bbox object with the real svg
	 * @param	{SVGElement}	svg
	 * @class
	 */
	function PaintBox(svg) {
		// Get the <svg> tag as text
		var div = document.createElement('div');
		div.appendChild(svg.cloneNode());
		this.outerSVG = div.innerHTML.replace(/<\/\s*svg\s*>$/i, '');
		
		// Parse the viewBox
		if (!svg.hasAttribute('viewBox')) throw new Error('Missing viewBox on the svg element');
		var box = svg.getAttribute('viewBox').match(/^\s*([0-9.-]+)\s*,?\s*([0-9.-]+)\s*,?\s*([0-9.]+)\s*,?\s*([0-9.]+)\s*$/);
		if (!box) throw new Error('Wrong viewBox attribute on the svg element');
		this.view_box = {
			x: parseFloat(box[1]), y: parseFloat(box[2]),
			width: parseFloat(box[3]), height: parseFloat(box[4])
		};
		
		// Extract all non graphic elements (querySelector working badly with phantomjs)
		div.innerHTML = '';
		function moveNodeIfNonGraphic(node) {
			for (var i = 0; i < node.childNodes.length; i++) {
				var child = node.childNodes[i];
				if (non_graphic.indexOf(child.nodeName.toLowerCase()) >= 0) {
					div.appendChild(child);
					i--;
				}
				if (child.childNodes) {
					moveNodeIfNonGraphic(child);
				}
			}
		}
		moveNodeIfNonGraphic(svg);
		this.defs = div.innerHTML;
	}
	
	/**
	 * Get the bounding box of the svg node
	 * @param	{String}	node_content
	 * @param	{Function}	callback			Callback called with a data object {x,y,width,height}, all integers
	 */
	PaintBox.prototype.get = function (node_content, callback) {
		// Canvas where to paint the svg
		var canvas = document.createElement('canvas');
		
		// Canvas' context
		var ctx = canvas.getContext('2d');	
		
		// Debug
		if (window.DEBUG) document.body.appendChild(canvas);
		
		var viewbox = this.view_box;
		var w = viewbox.width;
		var h = viewbox.height;
		
		// Build an image
		var img = new Image();
		img.onerror = function (err) {
			console.warn('Cannot parse to image', node_content);
			callback({x: 0, y: 0, width: 0, height: 0});
		};
		img.onload = function () {
			// Paint on the canvas
			canvas.width = w;
			canvas.height = h;
			ctx.drawImage(img, 0, 0, w, h);
			
			var data = ctx.getImageData(0, 0, w, h).data;
			var min_x = w,
			min_y = h,
			max_x = 0,
			max_y = 0;
			
			var index = 3;
			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
					if (data[index] != 0) {
						if (min_x > x) min_x = x;
						if (min_y > y) min_y = y;
						if (max_x < x+1) max_x = x+1;
						if (max_y < y+1) max_y = y+1;
					}
					index += 4;
				}
			}
			
			if (min_x > max_x) {
				return callback({x: 0, y: 0, width: 0, height: 0});
			}
			
			// Draw the bounds
			if (window.DEBUG) {
				ctx.strokeStyle = 'red';
				ctx.rect(min_x, min_y, max_x - min_x, max_y - min_y);
				ctx.stroke();
			}
			
			// Result scale with the viewBox
			var sx = viewbox.width / w;
			var sy = viewbox.height / h;
			callback({
				x: Math.floor(min_x * sx + viewbox.x),
				y: Math.floor(min_y * sy + viewbox.y),
				width: Math.ceil((max_x - min_x) * sx),
				height: Math.ceil((max_y - min_y) * sy)
			});
		};
		
		// Load
		img.width = viewbox.width;
		img.height = viewbox.height;
		img.src = 'data:image/svg+xml;utf8,'+this.outerSVG+this.defs+node_content+'</svg>';
	};
	
	return PaintBox;
})();