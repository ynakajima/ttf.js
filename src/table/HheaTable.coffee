# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Hhead table Class
class HheaTable
  constructor: () ->
    @version = 0
    @ascender = 0
    @descender = 0
    @lineGap = 0
    @advanceWidthMax = 0
    @minLeftSideBearing = 0
    @minRightSideBearing = 0
    @xMaxExtent = 0
    @caretSlopeRise = 0
    @caretOffset = 0
    @reserved_0 = 0
    @reserved_1 = 0
    @reserved_2 = 0
    @reserved_3 = 0
    @metricDataFormat = 0
    @numberOfHMetrics = 0

  # Create HheaTable instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @param {TrueType} ttf
  # @return {HheaTable}
  @createFromTTFDataView: (view, offset, ttf) ->
    view.seek offset
    hhea = new HheaTable()

    hhea.version = view.getFixed()
    hhea.ascender = view.getFWord()
    hhea.descender = view.getFWord()
    hhea.lineGap = view.getFWord()
    hhea.advanceWidthMax = view.getUFWord()
    hhea.minLeftSideBearing = view.getFWord()
    hhea.minRightSideBearing = view.getFWord()
    hhea.xMaxExtent = view.getFWord()
    hhea.caretSlopeRise = view.getShort()
    hhea.caretSlopeRun = view.getShort()
    hhea.caretOffset = view.getShort()
    hhea.reserved_0 = view.getShort()
    hhea.reserved_1 = view.getShort()
    hhea.reserved_2 = view.getShort()
    hhea.reserved_3 = view.getShort()
    hhea.metricDataFormat = view.getShort()
    hhea.numberOfHMetrics = view.getUshort()
      
    # return hhea
    hhea

# exports
module.exports = HheaTable
