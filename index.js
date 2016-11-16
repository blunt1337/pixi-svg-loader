const loaderUtils = require('loader-utils')
const fs = require('fs')
const parseSvg = require('./lib/parseSvg')
const parseOrigins = require('./lib/parseOrigins')
const setGroupPaintbox = require('./lib/setGroupPaintbox')
const buildResult = require('./lib/buildResult')
const makeAtlas = require('./lib/makeAtlas')

/**
 * Get the loader configuration from the option plugin and the query string
 * @return	{Object}
 */
const getLoaderConfig = (context) => {
	let query = loaderUtils.parseQuery(context.query),
		configKey = query.config || 'PixiSvgLoader',
		config = context.options && context.options.hasOwnProperty(configKey) ? context.options[configKey] : {}
	
	delete query.config
	return Object.assign(query, config)
}

module.exports = function (content) {
	this.cacheable()
	
	let callback = this.async(),
		config = getLoaderConfig(this)
	
	// Parse the svg as a template tree
	parseSvg(content).then(svg => {
		if (!svg) return callback(new Error('Not a valid svg, or empty'))
		
		// Compute the paintbox of groups
		setGroupPaintbox(svg.tree)
		
		// Parse all origins
		parseOrigins(svg.tree, svg.view_box, svg.view_box, config.default_origin)
		
		// Make an atlas
		if (!config.disable_packing) {
			makeAtlas(svg)
		}
		
		// Generate and return
		let resolution = config.resolution ? config.resolution : 'window.devicePixelRatio || 1'
		callback(null, buildResult(svg, this, resolution)+'')
	}).catch(err => callback(err))
}