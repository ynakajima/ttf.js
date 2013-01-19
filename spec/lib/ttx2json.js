#! /usr/bin/env node
var fs = require('fs');
var parser = require('xml2json-edp');

fs.readFile(process.argv[2], 'utf-8', function(err, data) {
  var json = parser.toJson(data);
  console.log(json);
});
