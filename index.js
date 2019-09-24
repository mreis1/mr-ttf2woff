const argv = require('yargs').argv
var glob = require("glob")
var path = require("path");
var fs = require('fs');
var ttf2woff2 = require('ttf2woff2');
var fse = require('fs-extra');

if (!argv.src) {
	throw new Error('Invalid src path');
}
if (!argv.outDir) {
	argv.outDir = '.';
	//throw new Error('Invalid output directory');
}

glob(argv.src, {}, function (err, files) {
	if (err){
		throw err;
	}

	var baseDir = path.join(process.cwd(), argv.outDir);
	
	if (files.length) {
		fse.ensureDirSync(baseDir);
	}
	
	// files is an array of filenames.
  	// If the `nonull` option is set, and nothing
  	// was found, then files is ["**/*.js"]
  	// er is an error object or null.
	files.forEach(function(file){
		var f = path.parse(file);
		var input = fs.readFileSync(file);
		console.log('Processing ' + file)
		var outputTo = path.join(baseDir, f.name + '.woff2');
		fs.writeFileSync(outputTo, ttf2woff2(input));		
		console.log('>>> ' + outputTo);
	})
	console.log('Completed!')
})
