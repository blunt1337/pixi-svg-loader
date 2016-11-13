// /!\ Loaded in phantomjs, so es5

/**
 * Create a render tree of textures.
 * Group multiple nodes into one texture, split when it has an id
 * @param	{SVGElement}	svg
 * @return	{Object}				The result an array of blocks,
 * 									a block is {value: the svg nodes the render in the texture,
 *												id: if the id starts with #, the id
 *												children: array of blocks children if any
 *												... + all parsed query from the id like origin}
 */
window.makeTree = (function() {
	var has_children = ['g', 'a', 'text'];
	
	// Wrapper to get node tag as string
	var div = document.createElement('div');
	function asText(node) {
		div.innerHTML = '';
		div.appendChild(node.cloneNode());
		return div.innerHTML.replace(new RegExp('><\\s*/\\s*'+node.nodeName+'\\s*>$', 'i'), '/>');
	}
	
	/**
	 * Parse the ID.
	 * Decode illustrator encoded ids, then parse extra query parameters
	 * @param	{String}	id
	 */
	function parseID(id) {
		// Illustrator id fix
		id = id.replace(/_x([0-9A-F]{2})_/g, function (_, code) {
		    return decodeURIComponent('%'+code);
		});
		
		var res = {id: id};
		
		// Parse query string
		var vars = id.split('?', 2);
		if (vars.length == 2) {
			res.id = vars[0];
			vars = vars[1].split('&');
			
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				res[pair[0]] = pair[1];
			}
		}
		
		// Alias
		if (res.o) {
			res.origin = res.o;
			delete res.o;
		}
		if (res.c) {
			res.classname = res.c;
			delete res.c;
		}
		
		return res;
	}
	
	/**
	 * Walk through the svg nodes recursively and build the render tree
	 */
	return function walk(node) {
		var res = [];
		var block = {value: ''};
		
		for (var i = 0; i < node.childNodes.length; i++) {
			var child = node.childNodes[i];
			var child_txt = asText(child);
			if (child.nodeName.charAt(0) == '#') continue;
			
			var id_data = parseID(child.id);
			var tag = child.nodeName.toLowerCase();
			if (has_children.indexOf(tag) >= 0) {
				// Default for direct children
				var g_start = child_txt.replace(/\/>$/, '>');
				var g_end = '</'+tag+'>';
				var children = res;
				
				var hasId = id_data.id && id_data.id.charAt(0) == '#';
				if (hasId && tag != 'text') {
					g_start = g_end = '';
					children = [];
					
					// Previous block end
					if (block.value) res.push(block);
					
					// First children
					block = {value: ''};
				}
				
				var blocks = walk(child);
				for (var j = 0; j < blocks.length; j++) {
					if (blocks[j].children) {
						// Previous block end
						if (block.value) children.push(block);
						
						// Children
						children.push(blocks[j]);
						
						// New future block
						block = {value: ''};
						continue;
					}
					
					var sub_value = g_start+blocks[j].value+g_end;
					if (blocks[j].id) {
						// Previous block end
						if (block.value) children.push(block);
						
						// Id block
						blocks[j].value = sub_value;
						children.push(blocks[j]);
						
						// New future block
						block = {value: ''};
					} else {
						// Append to current block
						block.value += sub_value;
					}
				}
				
				if (hasId) {
					// Last block
					if (block.value) children.push(block);
					
					// Create the group block
					if (children.length) {
						id_data.children = children;
						res.push(id_data);
					}
					
					// New future block
					block = {value: ''};
				}
			} else {
				if (id_data.id && id_data.id.charAt(0) == '#') {
					// Previous block end
					if (block.value) res.push(block);
					
					// Id block
					id_data.value = child_txt;
					res.push(id_data);
					
					// New future block
					block = {value: ''};
				} else {
					block.value += child_txt;
				}
			}
		}
		if (block.value) res.push(block);
		
		return res;
	}
})();