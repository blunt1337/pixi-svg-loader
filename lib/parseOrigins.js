/**
 * Set all blocks origin.
 * If a block as a custom origin property, it will be parsed, else the default one is used.
 * The origin string can be composed of numeric pixels, percents, or special letters.
 * Those values can be separated by a coma for x,y.
 * Special letters are bounds of the paintbox. L: left, R: right, T: top, B: bottom, C or M: center/middle.
 * i.g.:
 * '10,10': 10px, 10px
 * 'tr': top right corner
 * 't': 0, top
 * 'r': right, 0
 * 'r - 2': right - 2px, 0
 * 'l + 5%, t + 5%': left + 5% of viewbox width, top + 5% of viewbox height
 */
const parseOrigins = (blocks, view_box, base_origin, default_origin) => {
	// Build a regex
	let number = '[0-9.-]+'
	let letter = '[tblrmc]'
	let value = '('+number+'%?|'+letter+')'
	let sums = value+'(\\s*[+-]\\s*'+value+')*'
	let regex = new RegExp('^('+sums+')(\\s*[,;]\\s*('+sums+'))?$')
	
	for (let block of blocks) {
		let paintbox = block.paintbox
		if (!paintbox) paintbox = { x: 0, y: 0, width: 0, height: 0 }
		
		// Block custom origin
		if (block.origin) {
			let origin = block.origin.toLowerCase()
			block.origin = null
			
			// Alias
			origin = origin.replace(/^[lrc][tbc]$/, (a) => a.charAt(0)+','+a.charAt(1))
			origin = origin.replace(/^[tbc][lrc]$/, (a) => a.charAt(1)+','+a.charAt(0))
			
			// Try to match our regex
			let match = origin.match(regex)
			if (match) {
				let x, y
				if (!match[6]) {
					if (match[1].match(/[tb]/i)) {
						y = match[1]
						x = '0'
					} else {
						x = match[1]
						y = '0'
					}
				} else {
					x = match[1]
					y = match[6]
				}
				
				// Replace bounds
				x = x.replace(/l/g, paintbox.x).replace(/r/g, paintbox.x + paintbox.width).replace(/[mc]/g, paintbox.x + paintbox.width / 2)
				y = y.replace(/t/g, paintbox.y).replace(/b/g, paintbox.y + paintbox.height).replace(/[mc]/g, paintbox.y + paintbox.height / 2)
				
				// Replace percents
				x = x.replace(new RegExp('('+number+')%', 'g'), (_, p) => view_box.x + p / 100 * view_box.width)
				y = y.replace(new RegExp('('+number+')%', 'g'), (_, p) => view_box.y + p / 100 * view_box.height)
				
				// Eval sums
				x = eval(x)
				y = eval(y)
				
				block.origin = {
					// Absolute
					x: x,
					y: y,
					// Relative to parent
					relative: {
						x: x - base_origin.x,
						y: y - base_origin.y
					}
				}
			}
		}
		if (!block.origin) {
			// Default origin
			let origin = block.origin = {
				x: view_box.x,
				y: view_box.y
			}
			
			let match = default_origin ? default_origin.match(/^(([lrcm])([tbcm])?|([tbcm])([lrcm]?))$/i): false
			if (match) {
				if (match[2]) origin.x = match[2]
				if (match[3]) origin.y = match[3]
				if (match[4]) origin.y = match[4]
				if (match[5]) origin.x = match[5]
				
				if (origin.x == 'l') origin.x = paintbox.x
				if (origin.x == 'r') origin.x = paintbox.x + paintbox.width
				if (origin.x == 'c' || origin.x == 'm') origin.x = paintbox.x + paintbox.width / 2
				
				if (origin.y == 'l') origin.y = paintbox.y
				if (origin.y == 'r') origin.y = paintbox.y + paintbox.height
				if (origin.y == 'c' || origin.y == 'm') origin.y = paintbox.y + paintbox.height / 2
			}
			
			origin.relative = {
				x: origin.x - base_origin.x,
				y: origin.y - base_origin.y
			}
		}
		
		if (block.children) {
			parseOrigins(block.children, view_box, block.origin, default_origin)
		}
	}
}
module.exports = parseOrigins;