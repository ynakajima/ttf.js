var QUnit = require('qunit');

QUnit.run({
	code: './../../src/ttf.js',
	tests: ['./TTFTest.js', './TTFTableDirectoryTest.js'],
});
