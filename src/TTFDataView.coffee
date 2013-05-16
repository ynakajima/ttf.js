# # ttf.js - JavaScript TrueType Font library
#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.
#
#
# TTFDataView.getLongDateTime() method is:
#  https://github.com/fontforge/fontforge/blob/v20120731-b/fonttools/showttf.c#L483-L516
#  copyright (C) 2000,2001,2002,2003,2004,2005,2006,2007,2008
#  George Williams.
#  Released under BSD license.
#
#  Redistribution and use in source and binary forms, with or without
#  modification, are permitted provided that the following conditions are met:
#
#  Redistributions of source code must retain the above copyright notice, this
#  list of conditions and the following disclaimer.
#
#  Redistributions in binary form must reproduce the above copyright notice,
#  this list of conditions and the following disclaimer in the documentation
#  and/or other materials provided with the distribution.
#
#  The name of the author may not be used to endorse or promote products
#  derived from this software without specific prior written permission.
#
#  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
#  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
#  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
#  EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
#  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
#  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
#  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
#  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
#  OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
#  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

# require
jDataView = if typeof require isnt 'undefined' then require('jdataview') else this.jDataView

# TTFDataView Class
class TTFDataView
  
  # Create TTFDataView
  # @param {Buffer|String|Array} buffer buffer buffer can be either a binary String,
  #                                     any Array-like byte storage
  #                                     (Array, Uint8Array, Arguments, jQuery(Array), ...)
  constructor: (buffer) ->
    @buffer = buffer
    @view = new jDataView @buffer

  seek: (offset) ->
    @view.seek offset if typeof offset is 'number'
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
    @seek offset if typeof offset is 'number'
    mantissa = @view.getInt16()
    fraction = @view.getUint16() / Math.pow(2, 16)
    Math.ceil((mantissa + fraction) * 1000) / 1000

  getF2dot14: (offset) ->
    @seek offset if typeof offset is 'number'
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
    @seek offset if typeof offset is 'number'
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

  getUshortFlags: (offset) ->
    flags = @getUshort offset
    for i in [0..15]
      num = if (flags & Math.pow(2, i)) is 0 then 0 else 1

# exports
module.exports = TTFDataView
