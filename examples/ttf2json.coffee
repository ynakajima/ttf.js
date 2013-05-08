#!/usr/bin/env coffee
fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../coffee/TTFDataView'
TrueType = require '../coffee/TrueType'

if process.argv.length > 2
  ttf = TrueType.createFromTTFDataView new TTFDataView new jDataView fs.readFileSync process.argv[2]
  console.log JSON.stringify(ttf, null, 2)

