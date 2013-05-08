# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.

# exports
ttfjs = (module? and module.exports?) and module.exports or @ttfjs or @ttfjs = {}

# ## TTFDataView Class
class ttfjs.TTFDataView
  constructor: (jDataView) ->
    @view = jDataView

  seek: (offset) ->
    @view.seek offset if offset
    this

  tell: () -> @view.tell()

  getString: (length, offset) -> @view.getString length, offset

  getByte: (offset) -> @view.getUint8 offset

  getChar: (offset) -> @view.getInt8 offset
  
  getUshort: (offset) -> @view.getUint16 offset

  getShort: (offset) -> @view.getInt16 offset

  getUlong: (offset) -> @view.getUint32 offset

  getLong: (offset) -> @view.getInt32 offset

  ###*
   * Return 32-bit signed fixed-point number (16.16).
   * @param {number} `offset` offset.
  ###
  getFixed: (offset) ->
    @seek offset if offset
    mantissa = @view.getInt16()
    fraction = @view.getUint16() / Math.pow(2, 16)
    Math.ceil((mantissa + fraction) * 1000) / 1000

  getF2dot14: (offset) ->
    @seek offset if offset
    value = @view.getUint16()
    mantissa = [0, 1, -2, -1][(value >>> 14)]
    fraction = (value & 0x3fff) / Math.pow(2, 14)
    Math.round((mantissa + fraction) * 1000000) / 1000000

  ###*
   * Return the long internal format of a date
   * in seconds since 12:00 midnight, January 1, 1904.
   * It is represented as a signed 64-bit integer.<br />
   *
   * This method has been ported form the FontForge. <br />
   * https://github.com/fontforge/fontforge/blob/v20120731-b/fonttools/showttf.c#L483-L516
   * @param {number} offset offset.
   * @return {Date} date.
  ###
  getLongDateTime: (offset) ->
    @seek offset if offset
    date = [0, 0, 0, 0]
    date1970 = [0, 0, 0, 0]
    year = []

    # Dates in sfnt files are seconds since 1904. I adjust to unix time
    # seconds since 1970 by figuring out how many seconds were in between
    date[3] = @getUshort()
    date[2] = @getUshort()
    date[1] = @getUshort()
    date[0] = @getUshort()

    year[0] = (60 * 60 * 24 * 365) & 0xffff
    year[1] = (60 * 60 * 24 * 365) >> 16

    for i in [1904..1969]
      date1970[0] += year[0]
      date1970[1] += year[1]
      if (i & 3) == 0 && (i % 100 != 0 || i % 400 == 0)
        date1970[0] += 24 * 60 * 60 # Leap year
      date1970[1] += (date1970[0] >> 16)
      date1970[0] &= 0xffff
      date1970[2] += date1970[1] >> 16
      date1970[1] &= 0xffff
      date1970[3] += date1970[2] >> 16
      date1970[2] &= 0xffff

    for i in [0..3]
      date[i] -= date1970[i]
      date[i + 1] += date[i] >> 16
      date[i] &= 0xffff
    date[3] -= date1970[3]

    unixtime = ((date[1] << 16) | date[0]) * 1000
    new Date(unixtime)

  getUFWord: (offset) -> @getUshort offset

  getFWord: (offset) -> @getShort offset

