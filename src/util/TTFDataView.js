/**
 * @license Released under the MIT license.
 *
 * <pre>
 * Copyright (c) 2013 ynakajima <yuhta.nakajima@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * ttfjs.util.TTFDataView.getLongDateTime() method is:
 *
 * FontForge is copyright (C) 2000,2001,2002,2003,2004,2005,2006,2007,2008
 * by George Williams.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * The name of the author may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * </pre>
 *
 * @fileoverview TTFDataView Class file.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */

if (!ttfjs) { var ttfjs = {}; }

(function(global, ttfjs) {

  /** @namespace ttfjs.util */
  if (typeof ttfjs.util === 'undefined') {
    ttfjs.util = {};
  }

  // require
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../vendor/jdataview') :
    global.jDataView;

  /**
   * TTFDataView Class
   * @constructor
   * @param {jDataView} jdataview jDataView instance.
   */
  ttfjs.util.TTFDataView = function(jdataview) {
    /**
     * @private
     * @type {jDataView}
     */
    this.view_ = jdataview;
  };

  /**
   * Int2
   * @private
   * @type {Array.<number>}
   */
  ttfjs.util.TTFDataView.INT2_ = [0, 1, -2, -1];

  /**
   * Size of 14bit
   * @private
   * @type {number}
   */
  ttfjs.util.TTFDataView.SIZE_OF_14_BIT_ = 16384;

  /**
   * Moves the internal pointer to the position
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.seek = function(offset) {
    if (typeof offset === 'number') {
      this.view_.seek(offset);
    }
  };
  /**
   * Returns the current position.
   * @return {number} current positin.
   */
  ttfjs.util.TTFDataView.prototype.tell = function(offset) {
    return this.view_.tell();
  };

  /**
   * Return String.
   * @param {number} length length of string.
   * @return {string} string.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getString = function(length, offset) {
    return this.view_.getString(length, offset);
  };

  /**
   * Return 8-bit unsigned integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getByte = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view_.getUint8();
  };

  /**
   * Return 8-bit signed integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getChar = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view_.getInt8();
  };

  /**
   * Return 16-bit unsigned integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getUshort = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view_.getUint16();
  };

  /**
   * Return 16-bit signed integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getShort = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view_.getInt16();
  };

  /**
   * Return 32-bit unsigned integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getUlong = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view_.getUint32();
  };

  /**
   * Return 32-bit signed integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getLong = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view_.getInt32();
  };

  /**
   * Return 32-bit signed fixed-point number (16.16).
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getFixed = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    var mantissa = this.view_.getInt16();
    var fraction = this.view_.getUint16() / Math.pow(2, 16);
    return Math.ceil((mantissa + fraction) * 1000) / 1000;
  };

  /**
   * Return 16-bit signed fixed number with the low 14 bits of fraction (2.14).
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getF2dot14 = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    var value = this.view_.getUint16();
    var mantissa = ttfjs.util.TTFDataView.INT2_[(value >>> 14)];
    var fraction = (value & 0x3fff) / ttfjs.util.TTFDataView.SIZE_OF_14_BIT_;
    return Math.round((mantissa + fraction) * 1000000) / 1000000;
  };

  /**
   * Return 16-bit unsigned integer that describes a quantity in FUnits,
   * the smallest measurable distance in em space.
   * @param {number} offset offset.
   * @return {number} UFWord
   */
  ttfjs.util.TTFDataView.prototype.getUFWord = function(offset) {
    return this.getUshort(offset);
  };

  /**
   * Return 16-bit signed integer that describes a quantity in FUnits,
   * the smallest measurable distance in em space.
   * @param {number} offset offset.
   * @return {number} FWord
   */
  ttfjs.util.TTFDataView.prototype.getFWord = function(offset) {
    return this.getShort(offset);
  };

  /**
   * Return the long internal format of a date
   * in seconds since 12:00 midnight, January 1, 1904.
   * It is represented as a signed 64-bit integer.<br />
   *
   * This method has been ported form the FontForge. <br />
   * https://github.com/fontforge/fontforge/blob/v20120731-b/fonttools/showttf.c#L483-L516
   * @param {number} offset offset.
   * @return {Date} date.
   */
  ttfjs.util.TTFDataView.prototype.getLongDateTime = function(offset) {
    var date = [0, 0, 0, 0],
        date1970 = [0, 0, 0, 0],
        year = [];
    // Dates in sfnt files are seconds since 1904. I adjust to unix time
    // seconds since 1970 by figuring out how many seconds were in between

    this.seek(offset);
    date[3] = this.getUshort();
    date[2] = this.getUshort();
    date[1] = this.getUshort();
    date[0] = this.getUshort();

    year[0] = (60 * 60 * 24 * 365) & 0xffff;
    year[1] = (60 * 60 * 24 * 365) >> 16;

    for (var i = 1904; i < 1970; ++i) {
      date1970[0] += year[0];
      date1970[1] += year[1];
      if ((i & 3) == 0 && (i % 100 != 0 || i % 400 == 0)) {
        date1970[0] += 24 * 60 * 60; // Leap year
      }
      date1970[1] += (date1970[0] >> 16);
      date1970[0] &= 0xffff;
      date1970[2] += date1970[1] >> 16;
      date1970[1] &= 0xffff;
      date1970[3] += date1970[2] >> 16;
      date1970[2] &= 0xffff;
    }

    for (var i = 0; i < 3; ++i) {
      date[i] -= date1970[i];
      date[i + 1] += date[i] >> 16;
      date[i] &= 0xffff;
    }
    date[3] -= date1970[3];
    var unixtime = ((date[1] << 16) | date[0]) * 1000;

    return new Date(unixtime);
  };

  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
