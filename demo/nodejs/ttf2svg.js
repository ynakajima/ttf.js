var fs = require('fs');
var ttfjs = require('./../../src/ttf.js');
var os = require('os');

// check args
if (process.argv.length < 4) {
	console.error("usage: node ttf2svg.js TTFfile glyphIndex" );
	process.exit(1);
}

var path = process.argv[2];
var glyphIndex = parseInt(process.argv[3]);

if (!fs.existsSync(path)) {
	console.error("file not exists");
	process.exit(1);
}

if (glyphIndex < 0) {
	console.error("gluphIndex should be a positive integer.");
	process.exit(1);
}

fs.readFile(path, function (err, data) {
	/** @TODO TrueTypeとSVGでは座標空間が異なる為、アフィン変換をする必要がある */
	if (err) throw err;
	var ttf = new ttfjs.TTF(data);
	var glyph = ttf.getGlyfByIndex(glyphIndex);
	var xMin = glyph.xMin;
	var yMin = glyph.yMin;
	var xMax = glyph.xMax;
	var yMax = glyph.yMax;
	var svg = '<svg viewBox="' + xMin + ' ' + yMin + ' ' + xMax + ' ' + yMax + '">' + os.EOL;
	svg += '<path d="' + glyph.path + '" />' + os.EOL;
	svg += '</svg>' + os.EOL;
	console.log(svg);	
});
