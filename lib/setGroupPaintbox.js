/**
 * Compute paintboxes of groups
 * @param	{Object[]}	blocks
 * @return	{Object}				The merged paintbox of all blocks
 */
const setGroupPaintbox = (blocks) => {
	let x, y, r, b
	x = y = Number.POSITIVE_INFINITY
	r = b = Number.NEGATIVE_INFINITY
	
	for (let block of blocks) {
		if (block.children) {
			block.paintbox = setGroupPaintbox(block.children)
		}
		if (block.paintbox) {
			let box = block.paintbox
			if (x > box.x) x = box.x
			if (y > box.y) y = box.y
			if (r < box.x + box.width) r = box.x + box.width
			if (b < box.y + box.height) b = box.y + box.height
		}
	}
	
	if (x > r || y > b) {
		return {x: 0, y: 0, width: 0, height: 0}
	}
	return {x, y, width: r - x, height: b - y}
}
module.exports = setGroupPaintbox