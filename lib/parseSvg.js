const phantom = require('phantom')

/**
 * Split the document in multiple nodes and compute the paint boxes, all into phantomjs
 * @param	{string}	svg		Svg source content
 * @return	{Object}			{view_box: {x, y, width, height}, tree: see makeTree.js}
 */
module.exports = (svg) => {
	let instance, page
	
	return phantom.create()
	.then(i => {
		instance = i
		return i.createPage()
	})
	.then((p) => page = p)
	// Add scripts
	.then(() => page.injectJs(__dirname+'/phantom/PaintBox.js'))
	.then(() => page.injectJs(__dirname+'/phantom/makeTree.js'))
	.then(() => page.injectJs(__dirname+'/phantom/index.js'))
	// Render svg
	.then(() => {
		page.on('onConsoleMessage', function (m) {
			console.log('PhantomJS:', m)
		})
		
		return new Promise((resolve, reject) => {
			page.on('onCallback', resolve)
			page.evaluate(function (svg) { launch(svg); }, svg)
		})
	})
	// Close
	.then(result => {
		instance.exit()
		return result
	})
	// Errors
	.catch(error => {
		instance.exit()
		throw error
	})
}