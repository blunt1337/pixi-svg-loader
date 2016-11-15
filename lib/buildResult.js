/**
 * Convert a string to CamelCase
 * @param	{String}	name
 * @return	{String}
 */
const camelify = (name) => (' '+name).replace(/(?:\W)(\w)/g, letter => letter.toUpperCase()).replace(/\W/g, '')

/** Structure for a class to generate */
const BaseClass = {
	children: '',
	positions: '',
	anchors: '',
	texture_id: null
}

/**
 * Build the final js script with the parsed svg.
 * @param	{Object}	svg			Result of the parsed svg
 * @param	{Object}	module
 * @return	{String}
 */
module.exports = (svg, module) => {
	// Textures and children
	let next_id = 0,
		textures = '',
		classes = {},
		unique = {}

	// Add the atlas base texture
	if (svg.atlas) {
		let tmp = (svg.defs ? svg.defs : '') + svg.atlas.value
		textures = `var atlas = svg2baseTexture(${JSON.stringify(tmp)}, ${svg.atlas.width}, ${svg.atlas.height});\n`
	}
	// Non atlas textures
	else {
		textures = `var defs = ${svg.defs ? JSON.stringify(svg.defs) : "''"};\n`
	}
	
	// Exported class
	var main_classname = camelify(module.resourcePath)
	var main = classes[main_classname] = Object.assign({}, BaseClass)
	
	// Build the blocks code recursively
	const build = (blocks, clazz, parent) => {
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
				if (!block.classname) {
					child += `new Container()`
				} else {
					// Classname
					block.classname = camelify(block.classname)
					
					// Check that the class does not exists
					if (classes.hasOwnProperty(block.classname) && classes[block.classname].texture_id != null) {
						throw new Error('Duplicate of classname inside the SVG file: '+block.classname);
					}
					
					classes[block.classname] = Object.assign({}, BaseClass)
					child += `new ${block.classname}()`
				}
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
						textures += `var texture_${next_id} = new Texture(svg2baseTexture(defs+${JSON.stringify(block.value)}, ${paintbox.width}, ${paintbox.height}, ${paintbox.x}, ${paintbox.y}));\n`
					}
				}
				
				// Sprite
				if (!block.classname) {
					child += `new Sprite(texture_${texture_id})`
				} else {
					// Classname
					block.classname = camelify(block.classname)
					
					// Check that the class does not exists
					if (classes.hasOwnProperty(block.classname) && classes[block.classname].texture_id != texture_id) {
						throw new Error('Duplicate of classname inside the SVG file: '+block.classname);
					}
					
					classes[block.classname] = Object.assign({}, BaseClass, { texture_id })
					child += `new ${block.classname}()`
				}
				
				// Shift texture position
				let offsetX = (origin.x - paintbox.x) / paintbox.width,
					offsetY = (origin.y - paintbox.y) / paintbox.height
				if (offsetX != 0 || offsetY != 0) {
					clazz.anchors += `${varname}.anchor.set(${offsetX.toFixed(2)},${offsetY.toFixed(2)});\n`
				}
			}
			
			// Position
			if (relative_origin.x != 0 || relative_origin.y != 0) {
				clazz.positions += `${varname}.position.set(${relative_origin.x.toFixed(2)},${relative_origin.y.toFixed(2)});\n`
			}
			
			clazz.children += child+`; ${parent}.addChild(${varname});\n`
			next_id++
			
			// Children
			if (block.children) {
				if (block.classname) {
					build(block.children, classes[block.classname], 'this')
				} else {
					build(block.children, clazz, varname)
				}
			}
		}
	}
	build(svg.tree, main, 'this')

	// Default position
	if (svg.view_box.x != 0 || -svg.view_box.y != 0) {
		main.positions += `this.position.set(${svg.view_box.x},${svg.view_box.y});\n`
	}
	
	// Result header
	let result = `
		var common = require(${JSON.stringify(__dirname+'/commonModule.js')}),
			svg2baseTexture = common.svg2baseTexture,
			inherits = common.inherits;
		var Container = PIXI.Container, Sprite = PIXI.Sprite, Texture = PIXI.Texture, Rect = PIXI.Rectangle;`
	
	// Add texture definition
	result += textures
		
	// Generate all classes definition
	for (let classname in classes) {
		let clazz = classes[classname]
		
		result += `function ${classname}() {\n`
		if (clazz.texture_id) {
			result += `Sprite.call(this, texture_${clazz.texture_id});\n`
		} else {
			result += `Container.call(this);\n`
		}
		result += `${clazz.children}
					${clazz.anchors}
					${clazz.positions}
				}\n`
		if (clazz.texture_id) {
			result += `inherits(${classname}, Sprite);`
		} else {
			result += `inherits(${classname}, Container);`
		}
	}
	
	// Generate exports
	result += `module.exports = ${main_classname};`
	
	delete classes[main_classname]
	for (let classname in classes) {
		result += `\nmodule.exports.${classname} = ${classname};`
	}
	
	return result
}