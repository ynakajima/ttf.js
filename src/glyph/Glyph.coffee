# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Glyph Class
class Glyph
  # Create Glyph
  # @param {SimpleGlyphData|CompositeGlyphData} glyphData
  # @param {TrueType} ttf
  constructor: (glyphData, ttf) ->
    @glyphData = glyphData
    @GID = glyphData.GID
    @type = glyphData.type
    @numberOfContours = glyphData.numberOfContours
    @xMin = glyphData.xMin
    @yMin = glyphData.yMin
    @xMax = glyphData.xMax
    @yMax = glyphData.yMax
    @hmtx = {
      advanceWidth: ttf.hmtx.hMetrics[@GID]? and ttf.hmtx.hMetrics[@GID].advanceWidth or ttf.hmtx.hMetrics[ttf.hmtx.hMetrics.length - 1]
      lbs: ttf.hmtx.hMetrics[@GID]? and ttf.hmtx.hMetrics[@GID].lsb or ttf.hmtx.leftSideBearing[@GID - ttf.hmtx.hMetrics.length]
    }

  # Return SVG Path Data
  # @param {Object} options = {
  #                   matrix: {
  #                     a, b, c
  #                     d, e, f
  #                   }
  #                   relative: false
  #                 }                                
  # @return {String}
  toSVGPathString: (options = {}) ->
    @glyphData.toSVGPathString(options)

# exports
module.exports = Glyph
