# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## TrueType Class
class TrueType
  constructor: () ->
   @sfntVersion = 0
   @numTables = 0
   @searchRange = 0
   @entrySelector = 0
   @rangeShift = 0
   @tableDirectory = []

  # https://developer.apple.com/fonts/TTRefMan/RM06/Chap6.html#ScalerTypeNote
  isMacTTF: () ->
    @sfntVersion is 'true'

  isWinTTF: () ->
    @sfntVersion is 1.0

  isTTCF: () ->
    @sfntVersion is 'ttcf'

  isTTF: () ->
    @isMacTTF() or @isWinTTF() or @isTTCF()

  isOTTO: () ->
    @sfntVersion is 'OTTO'

  isCFF: () ->
    @isOTTO()

  # Create TrueType instance from TTFDataView
  # @param {TTFDataView} view
  # @return {TrueType}
  @createFromTTFDataView: (view) ->
    ttf = new TrueType()
    
    # sfntVersion
    sfntVersionString = view.getString 4, 0
    sfntVersionNumber = view.getFixed 0
    ttf.sfntVersion = if (sfntVersionNumber == 1.0) then sfntVersionNumber else sfntVersionString
    
    # offset table
    if ttf.isTTF() and not ttf.isTTCF() or ttf.isOTTO()
      ttf.numTables = view.getUshort 4
      ttf.searchRange = view.getUshort()
      ttf.entrySelector = view.getUshort()
      ttf.rangeShift = view.getUshort()

      # tableDirectory
      ttf.tableDirectory = for i in [1..ttf.numTables]
        {
          tag: view.getString 4
          checkSum: view.getUlong().toString(16)
          offset: view.getUlong()
          length: view.getUlong()
        }

    # return ttf
    ttf

# exports
module.exports = TrueType
