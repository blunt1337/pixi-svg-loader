/**
 * Build the final js script with the parsed svg.
 * @param	{Object}	svg			Result of the parsed svg
 * @param	{String}	template	Js script for template, where some strings are replaced
 * @param	{Object}	module
 * @return	{String}
 */
module.exports = (svg, template, module) => {
	// Textures and children
	let next_id = 0,
		textures = '',
		children = '',
		positions = '',
		anchors = '',
		unique = {}

	// Add the atlas base texture
	if (svg.atlas) {
		let tmp = (svg.defs ? svg.defs : '') + svg.atlas.value
		textures = `var atlas = Svg2BaseTexture(${JSON.stringify(tmp)}, ${svg.atlas.width}, ${svg.atlas.height});\n`
	}
	// Non atlas textures
	else {
		textures = `var defs = ${svg.defs ? JSON.stringify(svg.defs) : "''"};\n`
	}
	
	// Build the blocks code recursively
	const build = (blocks, parent) => {
		for (let block of blocks) {
			let paintbox = block.paintbox
			if (!paintbox) continue;
			
			// Sprite/container
			let varname = `child_${next_id}`
			let child = `var ${varname} = `
			
			// An id
			if (block.id) {
				child += parent+'.'+block.id.substr(1).replace(/\W+/g, '_').toLowerCase()+' = '
			}
			
			let origin = block.origin
			let relative_origin = origin.relative
			
			// Container
			if (block.children) {
				child += 'new Container()'
			} else {
				// Texture
				let texture_id
				if (block.atlas) {
					// Atlas texture
					if (!block.atlas.texture_id) {
						block.atlas.texture_id = next_id
						textures += `var texture_${next_id} = new Texture(atlas, new Rect(${block.atlas.x}, ${block.atlas.y}, ${paintbox.width}, ${paintbox.height}));\n`
					}
					texture_id = block.atlas.texture_id
				} else {
					// Standalone texture
					if (unique.hasOwnProperty(block.value)) {
						texture_id = unique[block.value]
					} else {
						unique[block.value] = texture_id = next_id
						textures += `var texture_${next_id} = new Texture(Svg2BaseTexture(defs+${JSON.stringify(block.value)}, ${paintbox.width}, ${paintbox.height}, ${paintbox.x}, ${paintbox.y}));\n`
					}
				}
				
				// Sprite
				child += `new Sprite(texture_${texture_id})`
				
				// Shift texture position
				let offsetX = (origin.x - paintbox.x) / paintbox.width,
					offsetY = (origin.y - paintbox.y) / paintbox.height
				if (offsetX != 0 || offsetY != 0) {
					anchors += `${varname}.anchor.set(${offsetX.toFixed(2)},${offsetY.toFixed(2)});\n`
				}
			}
			
			// Position
			if (relative_origin.x != 0 || relative_origin.y != 0) {
				positions += `${varname}.position.set(${relative_origin.x.toFixed(2)},${relative_origin.y.toFixed(2)});\n`
			}
			
			children += child+`; ${parent}.addChild(${varname});\n`
			next_id++
			
			// Children
			if (block.children) {
				build(block.children, varname)
			}
		}
	}
	build(svg.tree, 'this')

	// Default position
	if (svg.view_box.x != 0 || -svg.view_box.y != 0) {
		positions += `this.position.set(${svg.view_box.x},${svg.view_box.y});\n`
	}

	// Classname
	let classname = (' '+module.resourcePath).replace(/(?:\W)(\w)/g, letter => letter.toUpperCase()).replace(/\W/g, '')

	// Generate and return
	return 'var Svg2BaseTexture = require(\''+__dirname+'/Svg2BaseTexture.js'+'\');'
		+template.replace(/@(\{classname\}|classname)/g, classname)
		.replace(/@(\{anchors\}|anchors)/g, anchors)
		.replace(/@(\{positions\}|positions)/g, positions)
		.replace(/@(\{children\}|children)/g, children)
		.replace(/@(\{textures\}|textures)/g, textures)
}