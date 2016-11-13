/*
 * Started by phantomjs evaluate
 */
window.launch = function (svg_content) {
	// Set as document
	document.body.innerHTML = svg_content;
	
	// Svg document
	var svg = document.querySelector('svg');
	
	// Tool to get the texture bounds
	var paintbox = new window.PaintBox(svg);
	
	// Detach the texture parts into blocks
	var tree = window.makeTree(svg);
	if (tree.length == 0) window.callPhantom(null);
	
	// Get the paint boxes on all blocks
	var nb_blocks = 0;
	var nb_done = 0;
	walk(tree);
	
	// Call setBounds on all nodes
	function walk(blocks) {
		for (var i = 0, l = blocks.length; i < l; i++) {
			if (blocks[i].children) {
				walk(blocks[i].children);
			} else {
				setBounds(blocks[i]);
			}
		}
	}
	
	function setBounds(block) {
		nb_blocks++;
		
		paintbox.get(block.value, function (paintbox) {
			if (paintbox.width != 0 || paintbox.height != 0) {
				block.paintbox = paintbox;
			}
			if (++nb_done == nb_blocks) {
				onBoundsCalculated();
			}
		});
	}
	
	// When all setBounds are done
	function onBoundsCalculated() {
		window.callPhantom({
			view_box: paintbox.view_box,
			defs: paintbox.defs,
			tree: tree
		});
	}
};