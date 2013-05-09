# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Maxp table Class
class MaxpTable
  constructor: () ->
    @version = 0
    @numGlyphs = 0
    @maxPoints = 0
    @maxContours = 0
    @maxCompositPoints = 0
    @maxCompositContours = 0
    @maxZones = 0
    @maxTwilightPoints = 0
    @maxStorage = 0
    @maxFunctionDefs = 0
    @maxInstructionDefs = 0
    @maxStackElements = 0
    @maxSizeOfInstructions = 0
    @maxComponentElements = 0
    @maxComponentDepth = 0

  # Create HeadTable instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @return {HeadTable}
  @createFromTTFDataView: (view, offset) ->
    view.seek offset
    maxp = new MaxpTable()

    maxp.version = view.getFixed()
    maxp.numGlyphs = view.getUshort()
    maxp.maxPoints = view.getUshort()
    maxp.maxContours = view.getUshort()
    maxp.maxCompositPoints = view.getUshort()
    maxp.maxCompositContours = view.getUshort()
    maxp.maxZones = view.getUshort()
    maxp.maxTwilightPoints = view.getUshort()
    maxp.maxStorage = view.getUshort()
    maxp.maxFunctionDefs = view.getUshort()
    maxp.maxInstructionDefs = view.getUshort()
    maxp.maxStackElements = view.getUshort()
    maxp.maxSizeOfInstructions = view.getUshort()
    maxp.maxComponentElements = view.getUshort()
    maxp.maxComponentDepth = view.getUshort()
      
    # return maxp
    maxp

# exports
module.exports = MaxpTable
