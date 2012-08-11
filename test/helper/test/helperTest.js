if (typeof helper === 'undefined') {
	var helper = require('../helper');
}

var module = QUnit.module;
var test = QUnit.test;
var ttfPath = '../../fonts/mplus-1c-regular.ttf';
var specPath = '../../fontSpec/mplus-1c-regular.json.gz';

// テストの初期化
var testInitializer = new helper.TestInitializer(ttfPath, specPath);

testInitializer.on('complete', function (err) {
	if (err) {
		throw err;
	}

	var ttf = testInitializer.ttf;
	var spec = testInitializer.spec;

	// テスト開始
	module('TTFLoader');
	test('isLoaded', function () {
		equal(typeof ttf, 'object');
	});

	module('SpecLoader');
	test('isLoaded', function () {
		equal(typeof spec, 'object');
	});

});