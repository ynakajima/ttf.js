var ttfjs = require('./../../src/ttf.js');

if (typeof helper === 'undefined') {
	var helper = require('../helper/helper');
}

var module = QUnit.module;
var test = QUnit.test;
var ttfPath = '../fonts/FreeSansBold.ttf';
var specPath = '../fontSpec/FreeSansBold.json.gz';
var tableDirectoryPath = '../fontSpec/FreeSansBold_tableDirectory.json';

// テストの初期化
var testInitializer = new helper.TestInitializer(ttfPath, specPath, tableDirectoryPath);

testInitializer.on('complete', function (err) {
	if (err) {
		throw err;
	}

	var ttf = testInitializer.ttf;
	var spec = testInitializer.spec.ttFont;
	var tableDirectory = testInitializer.tableDirectory.tableDirectory;

	/**
	 * テスト開始
	 */
	module('Table Direcotry');
	test('TableDirectory exists', function() {
		ok((typeof ttf.tableDirectory !== 'undefined'), 'ttf.tableDirectory  is NOT undefined');
	});
	test('instanceof TTFTableDirecotry', function(){
		ok(ttf.tableDirectory instanceof ttfjs.TTFTableDirecotry, 'ttf.tableDirectory  is instalce of TTFTableDirecotry');
	});

	//table directory
	for (var tag in tableDirectory) {
		test(tag, function(){
			var actualTD = ttf.tableDirectory[tag];
			var specTD = tableDirectory[tag];
			ok((typeof actualTD !== 'undefined'), tag + ' is NOT undefined');
			equal(actualTD.checkSum, specTD.checksum, tag + '.checkSum is ' + specTD.checksum);
			equal(actualTD.offset, specTD.offset, tag + '.offset is ' + specTD.offset);
			equal(actualTD.length, specTD.len, tag + '.length is ' + specTD.len);
		});
	}

});