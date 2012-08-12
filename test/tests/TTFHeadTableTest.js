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
	module('head table');
	test('head table exists', function() {
		ok((typeof ttf.head !== 'undefined'), 'ttf.head is NOT undefined');
	});
	test('instanceof TTFHeadTable', function(){
		ok((ttf.head instanceof ttfjs.TTFHeadTable), 'ttf.head is instance of TTFHeadTable');
	});


});