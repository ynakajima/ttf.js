/**
 * helper functions for test
 */
var util = require('util');
var events = require('events');
var fs = require('fs');
var zlib = require('zlib');
var ttfjs = require('./../../src/ttf.js');

/**
 * testの初期化
 * @param {String} ttfPath
 * @param {String} specPath
 */
function TestInitializer(ttfPath, specPath, tableDirectoryPath) {
	events.EventEmitter.call(this);
	this.ttfPath = ttfPath;
	this.specPath = specPath;
	this.tableDirectoryPath = tableDirectoryPath;

	this.ttf = '';
	this.spec = '';
	this.tableDirectory = '';

	this.init();
	var that = this;
	console.log('loading Table Directory...');
	console.time('tabelDirectoryLoaded');
	fs.readFile(this.tableDirectoryPath, 'utf-8', function onRead(err, data) {
		if (err) {
			throw err;
		}
		console.timeEnd('tabelDirectoryLoaded');
		that.tableDirectory = JSON.parse(data);
		that.isComplete();
	});

}

util.inherits(TestInitializer, events.EventEmitter);

TestInitializer.prototype.init = function () {
	var that = this;

	console.log('\nloading TTF...');
	console.time('ttfLoaded');
	var ttfLoader = new TTFLoader(this.ttfPath);

	console.log('loading Spec...');
	console.time('specLoaded');
	var specLoader = new TTFSpecLoader(this.specPath);

	ttfLoader.on('loaded', function onLoaded (err, data) {
		console.timeEnd('ttfLoaded');
		that.ttf = ttfLoader.content;
		that.isComplete();
	});

	specLoader.on('loaded', function onLoaded (err, data) {
		console.timeEnd('specLoaded');
		that.spec = specLoader.content;
		that.isComplete();
	});

};

TestInitializer.prototype.isComplete = function () {
	if (this.ttf !== '' && this.spec !== '' && this.tableDirectory !== '') {
		this.emit("complete", false);
	}
};

exports.TestInitializer = TestInitializer;

/**
 * TrueType font loader
 * @param {String}
 *            path
 */
function TTFLoader(path) {
	events.EventEmitter.call(this);
	this.path = path;
	this.content = null;
	this._load();
}

util.inherits(TTFLoader, events.EventEmitter);

TTFLoader.prototype._load = function() {
	var that = this;
	fs.readFile(this.path, function onRead(err, data) {
		if (err) {
			throw err;
		}
		that.content = new ttfjs.TTF(data);
		that.emit("loaded", err, that);
	});
}

/**
 * font spec file loader
 * @param {String}
 *            path
 */
function TTFSpecLoader(path) {
	events.EventEmitter.call(this);
	this.path = path;
	this.content = null;
	this._load();
}

util.inherits(TTFSpecLoader, events.EventEmitter);

TTFSpecLoader.prototype._load = function() {
	var that = this;
	fs.readFile(this.path, function onRead(err, data) {
		if (err) {
			throw err;
		}
		zlib.unzip(data, onUnzip);
	});

	function onUnzip(err, data) {
		if (err) {
			throw err;
		}
		that.content = JSON.parse(data.toString());
		that.emit("loaded", err, this);
	}
};