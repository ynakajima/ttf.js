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
    @caretSlopeRun = 0
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

  # Create HheaTable from JSON
  # @param {Object|String} json
  # @return {LocaTable}
  @createFromJSON: (json) ->
    # init
    if typeof json == 'string'
      json = JSON.parse json

    hhea = new HheaTable()

    hhea.version = json.version
    hhea.ascender = json.ascender
    hhea.descender = json.descender
    hhea.lineGap = json.lineGap
    hhea.advanceWidthMax = json.advanceWidthMax
    hhea.minLeftSideBearing = json.minLeftSideBearing
    hhea.minRightSideBearing = json.minRightSideBearing
    hhea.xMaxExtent = json.xMaxExtent
    hhea.caretSlopeRise = json.caretSlopeRise
    hhea.caretSlopeRun = json.caretSlopeRun
    hhea.caretOffset = json.caretOffset
    hhea.reserved_0 = json.reserved_0
    hhea.reserved_1 = json.reserved_1
    hhea.reserved_2 = json.reserved_2
    hhea.reserved_3 = json.reserved_3
    hhea.metricDataFormat = json.metricDataFormat
    hhea.numberOfHMetrics = json.numberOfHMetrics

    # return hhea
    hhea


# exports
module.exports = HheaTable
