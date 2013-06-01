# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# require
SimpleGlyphData = require '../glyph/SimpleGlyphData'
CompositeGlyphData = require '../glyph/CompositeGlyphData'

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
        new SimpleGlyphData(i, glyfTable)

      else if view.getShort(glyphLocation) >= 0 # simple glyph
        SimpleGlyphData.createFromTTFDataView(view, glyphLocation, i, glyfTable)

      else # composite glyph
        CompositeGlyphData.createFromTTFDataView(view, glyphLocation, i, glyfTable)

    # return glyfTable
    glyfTable

  # Create GlyfTable from JSON
  # @param {Object|String} json
  # @return {LocaTable}
  @createFromJSON: (json) ->
    # init
    if typeof json == 'string'
      json = JSON.parse json

    glyfTable = new GlyfTable()

    for glyph in json.glyphs
      if glyph.type == 'simple'
        glyfTable.glyphs.push(SimpleGlyphData.createFromJSON(glyph, glyfTable))
      else
        glyfTable.glyphs.push(CompositeGlyphData.createFromJSON(glyph, glyfTable))

    # return glyfTable
    glyfTable


# exports
module.exports = GlyfTable
