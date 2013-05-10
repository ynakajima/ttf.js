# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Loca table Class
class LocaTable
  constructor: () ->
    @offsets = []

  # Create LocaTable instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @param {TrueType} ttf
  # @return {LocaTable}
  @createFromTTFDataView: (view, offset, ttf) ->
    numGlyphs = ttf.getNumGlyphs()
    long = ttf.isLocaLong()
    view.seek offset
    loca = new LocaTable()
    loca.offsets = for i in [0..numGlyphs]
      if long then view.getUlong() else (view.getUshort() * 2)

    # return loca
    loca

# exports
module.exports = LocaTable
