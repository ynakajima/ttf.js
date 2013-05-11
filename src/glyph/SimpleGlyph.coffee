# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Simple Glyph Class
class SimpleGlyph
  constructor: (GID = null) ->
    @GID = GID
    @type = 'simple'
    @numberOfContours = 0
    @xMin = 0
    @yMin = 0
    @xMax = 0
    @yMax = 0
    @endPtsOfContours = []
    @instructionLength = 0
    @instructions = []
    @flags = []
    @xCoordinates = []
    @yCoordinates = []

    # _outline = [
    #   [ # first countour
    #     {x:  0, y:   0, on: false}, # coordinate
    #     {x: 40, y: -20, on: true },
    #     ...
    #   ],
    #   [ # second countour
    #     ...
    #   ],
    #   [....]
    # ]
    @_outline = []

    # set outline
    # @param {Object} outline
    # @return {SimpleGlyph} this
    @setOutline = (outline) ->
      @_outline = outline ? []
      @

    # return outline
    # @return {Object} outline
    @getOutline = () ->
      @_outline


  # Create SimpleGlyph instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @param {Number} glyphID
  # @return {SimpleGlyph}
  @createFromTTFDataView: (view, offset, glyphID) ->
    
    # init flags
    ON_CURVE          = Math.pow 2, 0
    X_SHORT           = Math.pow 2, 1
    Y_SHORT           = Math.pow 2, 2
    REPEAT            = Math.pow 2, 3
    X_IS_SAME         = Math.pow 2, 4
    POSITIVE_X_SHORT  = Math.pow 2, 4
    Y_IS_SAME         = Math.pow 2, 5
    POSITIVE_Y_SHORT  = Math.pow 2, 5
    
    # init glyph
    view.seek offset
    g = new SimpleGlyph(glyphID)
    
    # number of contours
    g.numberOfContours = view.getShort()

    # no contours
    if g.numberOfContours is 0
      return g
    
    # xMin yMin xMax yMax
    g.xMin = view.getShort()
    g.yMin = view.getShort()
    g.xMax = view.getShort()
    g.yMax = view.getShort()
   
    # endPtsOfContours
    g.endPtsOfContours = for i in [1..g.numberOfContours]
      view.getUshort()

    # number of coordinates
    numberOfCoordinates = g.endPtsOfContours[g.endPtsOfContours.length - 1] + 1

    # instrunctions
    g.instructionLength = view.getUshort()
    if g.instructionLength > 0 
      g.instructions = for i in [1..g.instructionLength]
        view.getByte()
    
    # flags
    flags = []
    i = 0

    while i < numberOfCoordinates
      flag = view.getByte()
      flags.push flag
      i++

      # repeat
      if flag & REPEAT
        numRepeat = view.getByte()
        for j in [1..numRepeat]
          if i < numberOfCoordinates
            flags.push flag
            i++

    g.flags = flags

    # xCoordinates
    g.xCoordinates = for flag in flags
      x = 0
      if flag & X_SHORT # short Vector
        x = (if flag & POSITIVE_X_SHORT then 1 else -1) * view.getByte()
      else
        x = if flag & X_IS_SAME then 0 else view.getShort()

    # yCoordinates
    g.yCoordinates = for flag in flags
      y = 0
      if flag & Y_SHORT # short Vector
        y = (if flag & POSITIVE_Y_SHORT then 1 else -1) * view.getByte()
      else
        y = if flag & Y_IS_SAME then 0 else view.getShort()

    # outline
    startPtOfContour = x = y = 0
    outline = for endPtOfcountour in g.endPtsOfContours
      contour = for i in [startPtOfContour..endPtOfcountour]
        x += g.xCoordinates[i]
        y += g.yCoordinates[i]
        {
          x: x
          y: y
          on: flags[i] & ON_CURVE
        }
      startPtOfContour = endPtOfcountour + 1
      contour

    g.setOutline outline
    
    # return glyph
    g

# exports
module.exports = SimpleGlyph
