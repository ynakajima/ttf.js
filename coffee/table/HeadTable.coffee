# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Head table Class
class HeadTable
  constructor: () ->
   @version = 0
   @fontRevision = 0
   @checkSumAdjustment = '0x00000000'
   @magicNumber = '0x5f0f3cf5'
   @flags = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
   @unitsPerEm = 0
   @created = new Date()
   @modified = new Date()
   @xMin = 0
   @yMin = 0
   @xMax = 0
   @yMax = 0
   @macStyle = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
   @lowestRecPPEM = 0
   @fontDirectionHint = 2
   @indexToLocFormat = 0
   @glyphDataFormat = 0

  # Return true if loca table format is Long.
  # @return {Boolean}
  isLocaLong: () ->
    @indexToLocFormat is 1

  # Create HeadTable instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @return {HeadTable}
  @createFromTTFDataView: (view, offset) ->
    view.seek offset
    head = new HeadTable()

    head.version = view.getFixed()
    head.fontRevision = view.getFixed()
    head.checkSumAdjustment = '0x' + view.getUlong(offset + 8).toString(16)
    head.magicNumber = '0x' + view.getUlong().toString(16)
    head.flags = view.getUshortFlags()
    head.unitsPerEm = view.getUshort()
    head.created = view.getLongDateTime()
    head.modified = view.getLongDateTime()
    head.xMin = view.getShort()
    head.yMin = view.getShort()
    head.xMax = view.getShort()
    head.yMax = view.getShort()
    head.macStyle = view.getUshortFlags()
    head.lowestRecPPEM = view.getUshort()
    head.fontDirectionHint = view.getShort()
    head.indexToLocFormat = view.getShort()
    head.glyphDataFormat = view.getShort()
      
    # return head
    head

# exports
module.exports = HeadTable
