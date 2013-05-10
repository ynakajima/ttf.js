# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Composite Glyph Class
class CompositeGlyph
  constructor: () ->
    @type = 'composite'
    @numberOfContours = 0
    @xMin = 0
    @yMin = 0
    @xMax = 0
    @yMax = 0

    # components = [
    #   { # first component
    #     glyphIndex: 1
    #     x: 0
    #     y: 0
    #     flags : 0x204
    #   },
    #   { # second component
    #     ...
    #   },
    #   {....}
    # ]
    @components = []

  # Create CompositeGlyph instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @return {CompositeGlyph}
  @createFromTTFDataView: (view, offset) ->
    view.seek offset
    g = new CompositeGlyph()
    
    g.numberOfContours = view.getShort()

    # TODO: 実装!
    
    # return glyph
    g

# exports
module.exports = CompositeGlyph
