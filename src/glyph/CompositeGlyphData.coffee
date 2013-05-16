# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# ## Composite Glyph Data Class
class CompositeGlyphData
  constructor: (GID = null, glyfTable = null) ->
    @GID = GID
    @type = 'composite'
    @numberOfContours = 0
    @xMin = 0
    @yMin = 0
    @xMax = 0
    @yMax = 0
    @glyfTable = glyfTable

    # components = [
    #   { # first component
    #     flags : 0x204
    #     glyphIndex: 1
    #     offsetX: 0
    #     offsetY: 0
    #     points: [10, 20]
    #     transform: {
    #       scale: 1
    #       xScale: null
    #       yScale: null
    #       scale01: null
    #       scale10: null
    #     }
    #   },
    #   { # second component
    #     ...
    #   },
    #   {....}
    # ]
    @components = []

  # Return SVG Path Data
  # @param {Object} options = {
  #                   matrix: {
  #                     a, b, c
  #                     d, e, f
  #                   }
  #                   relative: false
  #                 }                  
  # @return {String}
  toSVGPathString: (options) ->
    matrix = options?.matrix ? undefined
    relative = options?.relative ? false

    pathString = for component in @components
      # create matrix
      t = component.transform
      glyph = @glyfTable.getGlyphById component.glyphIndex
      _matrix = {
        a: 1, c: 0, e: component.offsetX,
        b: 0, d: 1, f: component.offsetY
      }
      if typeof t.scale isnt 'undefined'
        _matrix.a = _matrix.d = t.scale
      if typeof t.xScale isnt 'undefined'
        _matrix.a = t.xScale
      if typeof t.xScale isnt 'undefined'
        _matrix.d = t.yScale
      if typeof t.scale01 isnt 'undefined'
        _matrix.b = t.scale01
      if typeof t.scale10 isnt 'undefined'
        _matrix.c = t.scale10

      # multiple matrix
      if typeof matrix isnt 'undefined'
        m = matrix
        _m = _matrix
        newMatrix = {
          a: m.a * _m.a + m.c * _m.b, c: m.a * _m.c + m.c * _m.d, e: m.a * _m.e + m.c * _m.f + m.e,
          b: m.b * _m.a + m.d * _m.b, d: m.b * _m.c + m.d * _m.d, f: m.b * _m.e + m.d * _m.f + m.f
        }
        _matrix = newMatrix

      # get path string
      glyph.toSVGPathString({matrix: _matrix, relative: relative})

    # return Path
    pathString.join(' ')
  

  # Create CompositeGlyphData instance from TTFDataView
  # @param {TTFDataView} view
  # @param {Number} offset 
  # @param {Number} glyphID 
  # @param {GlyfTable} glyfTable
  # @return {CompositeGlyphData}
  @createFromTTFDataView: (view, offset, glyphID, glyfTable) ->

    # init flags
    ARG_1_AND_2_ARE_WORDS     = Math.pow 2, 0  # If this is set, the arguments are words; otherwise, they are bytes.
    ARGS_ARE_XY_VALUES        = Math.pow 2, 1  # If this is set, the arguments are xy values; otherwise, they are points.
    ROUND_XY_TO_GRID          = Math.pow 2, 2  # For the xy values if the preceding is true.
    WE_HAVE_A_SCALE           = Math.pow 2, 3  # This indicates that there is a simple scale for the component. Otherwise, scale = 1.0.
    RESERVED                  = Math.pow 2, 4  # This bit is reserved. Set it to 0.
    MORE_COMPONENTS           = Math.pow 2, 5  # Indicates at least one more glyph after this one.
    WE_HAVE_AN_X_AND_Y_SCALE  = Math.pow 2, 6  # The x direction will use a different scale from the y direction.
    WE_HAVE_A_TWO_BY_TWO      = Math.pow 2, 7  # There is a 2 by 2 transformation that will be used to scale the component.
    WE_HAVE_INSTRUCTIONS      = Math.pow 2, 8  # Following the last component are instructions for the composite character.
    USE_MY_METRICS            = Math.pow 2, 9  # If set, this forces the aw and lsb (and rsb) for the composite to be equal 
                                               # to those from this original glyph. This works for hinted and unhinted characters.
    OVERLAP_COMPOUND          = Math.pow 2, 10 # Used by Apple in GX fonts. 
    SCALED_COMPONENT_OFFSET   = Math.pow 2, 11 # Composite designed not to have the component offset scaled 
                                               # (designed for the Microsoft TrueType rasterizer).
    UNSCALED_COMPONENT_OFFSET = Math.pow 2, 12 # Composite designed not to have the component offset scaled  
                                               # (designed for the Microsoft TrueType rasterizer).
    # init composite glyph
    view.seek offset
    g = new CompositeGlyphData(glyphID, glyfTable)

    # read number of contours
    g.numberOfContours = view.getShort()

    # xMin yMin xMax yMax
    g.xMin = view.getShort()
    g.yMin = view.getShort()
    g.xMax = view.getShort()
    g.yMax = view.getShort()

    # read components
    do_ = MORE_COMPONENTS
    g.components = while do_ is MORE_COMPONENTS

      # init component
      component = {
        offsetX: 0
        offsetY: 0
      }
      component.flags = view.getUshort()
      component.glyphIndex = view.getUshort()

      flags = component.flags
      
      # read argments
      if flags & ARG_1_AND_2_ARE_WORDS
        if flags & ARGS_ARE_XY_VALUES
          component.offsetX = view.getShort()
          component.offsetY = view.getShort()

        else
          component.points = [
            view.getShort(),
            view.getShort()
          ]
      else
        if flags & ARGS_ARE_XY_VALUES
          component.offsetX = view.getChar()
          component.offsetY = view.getChar()

        else
          component.points = [
            view.getChar(),
            view.getChar()
          ]

      # read Transformation Option 
      component.transform = transform = {}
      if flags & WE_HAVE_A_SCALE
        transform.scale = view.getF2dot14()

      else if flags & WE_HAVE_AN_X_AND_Y_SCALE
        transform.xScale = view.getF2dot14()
        transform.yScale = view.getF2dot14()

      else if flags & WE_HAVE_A_TWO_BY_TWO
        transform.xScale = view.getF2dot14()
        transform.scale01 = view.getF2dot14()
        transform.scale10 = view.getF2dot14()
        transform.yScale = view.getF2dot14()

      # more components?
      do_ = flags & MORE_COMPONENTS

      # return component
      component
    
    # return glyph
    g

# exports
module.exports = CompositeGlyphData
