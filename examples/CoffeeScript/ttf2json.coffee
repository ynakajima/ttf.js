#!/usr/bin/env coffee
fs = require 'fs'
jDataView = require 'jdataview'

#ttfjs = require '../ttf'
ttfjs = {
  TTFDataView: require '../../src/TTFDataView'
  TrueType: require '../../src/TrueType'
}

if process.argv.length > 2
  ttf = ttfjs.TrueType.createFromTTFDataView new ttfjs.TTFDataView new jDataView fs.readFileSync process.argv[2]
  console.log JSON.stringify(ttf, null, 2)

