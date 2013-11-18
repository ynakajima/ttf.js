# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

###
require
###
if typeof module isnt 'undefined'
  TTFDataView = require ('./util/TTFDataView')
  TrueType = require ('./TrueType')
  HeadTable = require ('./table/HeadTable')
  MaxpTable = require ('./table/MaxpTable')
  LocaTable = require ('./table/LocaTable')
  GlyfTable = require ('./table/GlyfTable')
  HheaTable = require ('./table/HheaTable')
  HmtxTable = require ('./table/HmtxTable')
  OS_2Table = require ('./table/OS_2Table')
  SimpleGlyphData = require ('./glyph/SimpleGlyphData')
  CompositeGlyphData= require ('./glyph/CompositeGlyphData')

###
exports
###
ttfjs = {
  TrueType: TrueType
  util : {
    TTFDataView: TTFDataView
  }
  table: {
    HeadTable: HeadTable
    LocaTable: LocaTable
    MaxpTable: MaxpTable
    GlyfTable: GlyfTable
    HheaTable: HheaTable
    HmtxTable: HmtxTable
    OS_2Table: OS_2Table
  }
  glyph: {
    SimpleGlyphData: SimpleGlyphData
    CompositeGlyphData: CompositeGlyphData
  }
}

if typeof module isnt 'undefined'
  module.exports = ttfjs
else
  @ttfjs = ttfjs
