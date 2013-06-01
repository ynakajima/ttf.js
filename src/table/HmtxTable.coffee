# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Hmtx table Class
class HmtxTable
  constructor: () ->
    @hMetrics = []
    @leftSideBearing = []

  # Create HmtxTable instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @param {TrueType} ttf
  # @return {HmtxTable}
  @createFromTTFDataView: (view, offset, ttf) ->
    numberOfHMetrics = ttf.hhea.numberOfHMetrics
    numGlyphs = ttf.maxp.numGlyphs
    lsbNum = numGlyphs - numberOfHMetrics

    view.seek offset
    hmtx = new HmtxTable()
    hmtx.hMetrics = for i in [1..numberOfHMetrics]
      {
        advanceWidth: view.getUshort()
        lsb: view.getShort()
      }

    if lsbNum > 0
      hmtx.leftSideBearing = for i in [1..lsbNum]
        view.getShort()

    # return hmtx
    hmtx

  # Create HmtxTable from JSON
  # @param {Object|String} json
  # @return {HmtxTable}
  @createFromJSON: (json) ->
    # init
    if typeof json == 'string'
      json = JSON.parse json

    hmtx = new HmtxTable()

    hmtx.hMetrics = json.hMetrics
    hmtx.leftSideBearing = json.leftSideBearing

    # return hmtx
    hmtx



# exports
module.exports = HmtxTable
