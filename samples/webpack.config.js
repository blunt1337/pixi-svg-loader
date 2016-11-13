// List test folders
const fs = require('fs')
let entries = {}
let dirs = fs.readdirSync(__dirname)
for (let dir of dirs) {
	let path = __dirname+'/'+dir+'/index.js'
	if (fs.existsSync(path)) {
		entries[dir] = path
	}
}

module.exports = {
	entry: entries,
	output: {
		path: __dirname,
		filename: '[name]/built.js',
		publicPath: '/'
	},
	resolve: {
		modules: [__dirname+'/..', __dirname+'../node_modules'],
		extensions: ['.js', '.json']
	}
}