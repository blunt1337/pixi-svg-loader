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
		page.property('onConsoleMessage', function (m) {
			console.log('PhantomJS:', m)
		})
		
		return new Promise((resolve, reject) => {
			// Check if async evaluate is done
			function asyncBullshit() {
				instance.windowProperty('RESULT_FUCKING_DATA').then((data) => {
					if (data !== undefined) {
						resolve(data);
					} else {
						setTimeout(asyncBullshit, 100);
					}
				}, () => setTimeout(asyncBullshit, 100))
			}
			page.property('onCallback', function (data) {
				RESULT_FUCKING_DATA = data;
			})
			
			// Async evaluate must call window.callPhantom
			asyncBullshit();
			page.evaluate(function (svg) { launch(svg); }, svg)
		})
	})
	// Close
	.then(result => {
		page.close()
		instance.exit()
		return result
	})
	// Errors
	.catch(error => {
		instance.exit()
		throw error
	})
}