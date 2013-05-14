# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# require
TTFDataView = require ('./TTFDataView')
HeadTable = require ('./table/HeadTable')
MaxpTable = require ('./table/MaxpTable')
LocaTable = require ('./table/LocaTable')
GlyfTable = require ('./table/GlyfTable')
HheaTable = require ('./table/HheaTable')


# ## TrueType Class
class TrueType
  constructor: () ->
   # offset table
   @sfntVersion = 0
   @numTables = 0
   @searchRange = 0
   @entrySelector = 0
   @rangeShift = 0
   @tableDirectory = []

   # tables
   @head = new HeadTable()
   @maxp = new MaxpTable()
   @loca = new LocaTable()
   @glyf = new GlyfTable()
   @hhea = new HheaTable()

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

  getNumGlyphs: () ->
    @maxp.numGlyphs

  isLocaLong: () ->
    @head.isLocaLong()

  # Return Glyph at the specified id.
  # @param {Number} id id of Glyph 
  # @return {SimpleGlyph|CompositeGlyph}
  getGlyphById: (id) ->
    @glyf.getGlyphById id

  # Create TrueType instance from TTFDataView
  # @param {Buffer|Array|String} buffer buffer can be either a binary String,
  #                                     any Array-like byte storage
  #                                     (Array, Uint8Array, Arguments, jQuery(Array), ...)
  # @return {TrueType}
  @createFromBuffer: (buffer) ->
    ttf = new TrueType()

    # create TTFDataView
    view = new TTFDataView buffer
    
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
      if ttf.numTables > 0
        tableOffsets = {}

        ttf.tableDirectory = for i in [0..ttf.numTables-1]
          tag = view.getString 4
          checkSum = view.getUlong().toString(16)
          offset = view.getUlong()
          length = view.getUlong()
          tableOffsets[tag] = offset
          {
            tag: tag
            checkSum: checkSum
            offset: offset
            length: length
          }

        # head
        if typeof tableOffsets.head isnt 'undefined'
          ttf.head = HeadTable.createFromTTFDataView(view, tableOffsets.head, ttf)

        # maxp
        if typeof tableOffsets.maxp isnt 'undefined'
          ttf.maxp = MaxpTable.createFromTTFDataView(view, tableOffsets.maxp, ttf)

        # loca
        if typeof tableOffsets.loca isnt 'undefined'
          ttf.loca = LocaTable.createFromTTFDataView(view, tableOffsets.loca, ttf)

        # glyf
        if typeof tableOffsets.glyf isnt 'undefined'
          ttf.glyf = GlyfTable.createFromTTFDataView(view, tableOffsets.glyf, ttf)

        # hhea
        if typeof tableOffsets.hhea isnt 'undefined'
          ttf.hhea = HheaTable.createFromTTFDataView(view, tableOffsets.hhea, ttf)


    # return ttf
    ttf

  # TODO: Implement this.
  # Create TrueType instance from JSON
  # @param {object} json
  # @return {TrueType}
  # @createFromJSON: (json) ->

# exports
module.exports = TrueType
