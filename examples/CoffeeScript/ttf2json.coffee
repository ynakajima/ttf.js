#!/usr/bin/env coffee
fs = require 'fs'

#ttfjs = require '../ttf'
ttfjs = {
  TTFDataView: require '../../src/TTFDataView'
  TrueType: require '../../src/TrueType'
}

if process.argv.length > 2
  ttf = ttfjs.TrueType.createFromBuffer fs.readFileSync process.argv[2]
  console.log JSON.stringify(ttf, null, 2)

