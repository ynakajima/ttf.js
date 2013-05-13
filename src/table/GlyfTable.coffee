# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# require
SimpleGlyph = require '../glyph/SimpleGlyph'
CompositeGlyph = require '../glyph/CompositeGlyph'

# ## Glyf table Class
class GlyfTable
  constructor: () ->
    @glyphs = []

  # Return Glyph at the specified id.
  # @param {Number} id id of Glyph 
  # @return {SimpleGlyph|CompositeGlyph|Boolean}
  getGlyphById: (id) ->
    if typeof @glyphs[id] isnt 'undefined' then @glyphs[id] else false

  # Create GlyfTable instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset
  # @param {TrueType} ttf 
  # @return {GlyfTable}
  @createFromTTFDataView: (view, offset, ttf) ->
    loca = ttf.loca
    view.seek offset
    glyfTable = new GlyfTable()

    # read glyphs
    glyfTable.glyphs = for i in [0..loca.offsets.length - 2] # loca last entry is extra.
      location = loca.offsets[i]
      glyphLocation = location + offset

      # If a glyph has no outlines, the offset loca[n] = loca[n+1].
      if loca.offsets[i + 1]? and location is loca.offsets[i + 1]
        new SimpleGlyph(i, glyfTable)

      else if view.getShort(glyphLocation) >= 0 # simple glyph
        SimpleGlyph.createFromTTFDataView(view, glyphLocation, i, glyfTable)

      else # composite glyph
        CompositeGlyph.createFromTTFDataView(view, glyphLocation, i, glyfTable)

    # return maxp
    glyfTable

# exports
module.exports = GlyfTable
