var fs = require('fs');
var ttfjs = require('./../../src/ttf.js');

// check args
if (process.argv.length < 3) {
	console.error("usage: node ttfdump.js TTFfile" );
	process.exit(1);
}

var path = process.argv[2];

if (!fs.existsSync(path)) {
	console.error("file not exists");
	process.exit(1);
}

fs.readFile(path, function (err, data) {
	if (err) throw err;
	var ttf = new ttfjs.TTF(data);
	console.dir(ttf.cmap.getGlyphIndex('德'));
});
