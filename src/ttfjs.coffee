# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

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
