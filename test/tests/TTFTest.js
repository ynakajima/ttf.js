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
	var tableDirectory = testInitializer.tableDirectory;

	/**
	 * テスト開始
	 */
	module('TTF');
	test('instanceof TTF', function(){
		ok((ttf instanceof TTF), 'ttf is instalce of TTF');
	})
	test('version', function(){
		equal(ttf.version, 1, 'version is 1');
	});
	test('numTables', function(){
		equal(ttf.numTables, tableDirectory.numtables, 'numTables is ' + tableDirectory.numtables);
	});
	test('searchRange', function(){
		equal(ttf.searchRenge, tableDirectory.searchRange, 'searchRange is ' + tableDirectory.searchRange);
	});
	test('entrySelector', function(){
		equal(ttf.entrySelector, tableDirectory.entrySel, 'entrySel is ' + tableDirectory.entrySel);
	});
	test('rangeShift', function(){
		equal(ttf.rengeShift, tableDirectory.rangeshift, 'rangeshift is ' + tableDirectory.rangeshift);
	});

});