# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## TrueType Class
class TrueType
  constructor: () ->

  # Create TrueType instance from TTFDataView
  # @param {TTFDataView} view
  # @return {TrueType}
  @createFromTTFDataView: (view) ->
    ttf = new TrueType
    ttf.version = view.getFixed()
    ttf.numTables = view.getUshort()
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
    ttf

# exports
module.exports = TrueType
