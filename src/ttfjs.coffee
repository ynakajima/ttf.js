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
  TTFDataView: TTFDataView
  table: {
    HeadTable: HeadTable
    LocaTable: LocaTable
    MaxpTable: MaxpTable
    GlyfTable: GlyfTable
  }
  glyph: {
    SimpleGlyph: SimpleGlyph
    CompositeGlyph: CompositeGlyph
  }
}

if typeof module isnt 'undefined'
  module.exports = ttfjs
else
  @ttfjs = ttfjs
