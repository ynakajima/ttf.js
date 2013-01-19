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
    /** @type {jDataView} */
    this.view = jdataview;
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
   * seek
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.seek = function(offset) {
    return this.view.seek(offset | 0);
  };

  /**
   * Return String.
   * @param {number} length length of string.
   */
  ttfjs.util.TTFDataView.prototype.getString = function(length) {
    return this.view.getString(length);
  };

  /**
   * Return 8-bit unsigned integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getByte = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view.getUint8();
  };

  /**
   * Return 8-bit signed integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getChar = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view.getInt8();
  };

  /**
   * Return 16-bit unsigned integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getUshort = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view.getUint16();
  };

  /**
   * Return 16-bit signed integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getShort = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view.getInt16();
  };

  /**
   * Return 32-bit unsigned integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getUlong = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view.getUint32();
  };

  /**
   * Return 32-bit signed integer.
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getLong = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    return this.view.getInt32();
  };

  /**
   * Return 32-bit signed fixed-point number (16.16).
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getFixed = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    var mantissa = this.view.getInt16();
    var fraction = this.view.getUint16() / Math.pow(2, 16);
    return Math.round((mantissa + fraction) * 1000000) / 1000000;
  };

  /**
   * Return 16-bit signed fixed number with the low 14 bits of fraction (2.14).
   * @param {number} offset offset.
   */
  ttfjs.util.TTFDataView.prototype.getF2dot14 = function(offset) {
    if (typeof offset === 'number') {
      this.seek(offset);
    }
    var value = this.view.getUint16();
    var mantissa = ttfjs.util.TTFDataView.INT2_[(value >>> 14)];
    var fraction = (value & 0x3fff) / ttfjs.util.TTFDataView.SIZE_OF_14_BIT_;
    return Math.round((mantissa + fraction) * 1000000) / 1000000;
  };

  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
