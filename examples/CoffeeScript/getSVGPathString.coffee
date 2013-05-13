#!/usr/bin/env coffee
fs = require 'fs'

#ttfjs = require '../ttf'
ttfjs = {
  TrueType: require '../../src/TrueType'
}

if process.argv.length > 3
  ttf = ttfjs.TrueType.createFromBuffer fs.readFileSync process.argv[2]
  glyph = ttf.getGlyphById(parseInt(process.argv[3], 10))
  console.log glyph.toSVGPathString()

