const GrowingPacker = require('binpacking').GrowingPacker

/**
 * Flatten the tree of blocks into an object {block.value: {w, h, blocks: [blocks with the same value]}, ..}
 * @param	{Object[]}	blocks
 * @param	{Object[]}	result
 * @param	{Object}	unique
 */
const flatten = (blocks, result, unique) => {
	unique = unique || {}
	for (let block of blocks) {
		if (block.children) {
			flatten(block.children, result)
		} else {
			if (unique.hasOwnProperty(block.value)) {
				unique[block.value].blocks.push(block)
			} else {
				result.push(unique[block.value] = {
					x: block.paintbox.x,
					y: block.paintbox.y,
					w: block.paintbox.width,
					h: block.paintbox.height,
					blocks: [block],
					value: block.value
				})
			}
		}
	}
}

/**
 * Add a fit object on the svg.tree blocks to where it will be in the final packed svg
 * @param	{Object}	svg			Result of the parsed svg
 */
module.exports = (svg) => {
	// Build packer objects
	let textures = []
	flatten(svg.tree, textures)
	
	// Sort
	textures.sort((a, b) => Math.max(b.w, b.h) - Math.max(a.w, a.h))
	
	// Pack
	let packer = new GrowingPacker()
	packer.fit(textures)
	
	// Build the svg code and set an atlas: {x, y} position on the block
	let result = ''
	for (let texture of textures) {
		result += '<g transform="translate('+(texture.fit.x-texture.x)+' '+(texture.fit.y-texture.y)+')">'+texture.value+'</g>'
		
		// Failed to pack
		if (!texture.fit) return false
		
		// Atlas info
		let atlas = {x: texture.fit.x, y: texture.fit.y}
		for (let block of texture.blocks) {
			block.atlas = atlas
		}
	}
	
	// Add an atlas {width, height} property on the svg
	svg.atlas = {width: packer.root.w, height: packer.root.h, value: result}
}