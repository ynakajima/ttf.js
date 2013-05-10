#!/usr/bin/env node
var fs = require('fs'),
    jDataView = require('jdataview'),
    ttfjs = require('../../ttf');

if (process.argv.length > 2) {
  ttf = ttfjs.TrueType.createFromTTFDataView(new ttfjs.TTFDataView(new jDataView(fs.readFileSync(process.argv[2]))));
  console.log(JSON.stringify(ttf, null, 2));
}

