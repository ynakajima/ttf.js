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
 * @fileoverview Identify FontFormat.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */

if (!ttfjs) { var ttfjs = {}; }

(function(global, ttfjs) {

  // require
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../vendor/jdataview') :
    global.jDataView;

  /**
   * FontFormat Class
   * @constructor
   */
  ttfjs.FontFormat = function() {

  };

  /**
   * Read Version
   * @private
   * @param {(string|Object|ArrayBuffer| Buffer)} buffer Buffer of Font file.
   * @return {Array.<number>} header array.
   */
  ttfjs.FontFormat._readVersion = function(buffer) {
    var dataView = new jDataView(buffer, 0, 4, false);

    // move to head
    dataView.seek(0);

    // read head
    var version = [
      dataView.getInt8(),
      dataView.getInt8(),
      dataView.getInt8(),
      dataView.getInt8()
    ];

    return version;
  };

  /**
   * Identify the TrueType font with the version information in the header.
   * @param {(string|Object|ArrayBuffer|Buffer)} buffer Buffer of Font file.
   * @return {boolean} if TTF return true.
   */
  ttfjs.FontFormat.isTTF = function(buffer) {
    var version = ttfjs.FontFormat._readVersion(buffer);

    // isMacTTF or isWinTTF
    if (ttfjs.FontFormat.isMacTTF(buffer) ||
        ttfjs.FontFormat.isWinTTF(buffer)) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Identify the TrueType font for the Mac OS
   * with the version information in the header.
   * @param {(string|Object|ArrayBuffer|Buffer)} buffer Buffer of Font file.
   * @return {boolean} if TTF return true.
   */
  ttfjs.FontFormat.isMacTTF = function(buffer) {
    var version = ttfjs.FontFormat._readVersion(buffer);

    // true
    if (version[0] === 0x74 && version[1] === 0x72 &&
         version[2] === 0x75 && version[3] === 0x65) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Identify the TrueType font for Windows
   * with the version information in the header.
   * @param {(string|Object|ArrayBuffer|Buffer)} buffer Buffer of Font file.
   * @return {boolean} if TTF return true.
   */
  ttfjs.FontFormat.isWinTTF = function(buffer) {
    var version = ttfjs.FontFormat._readVersion(buffer);

    // 0x000100
    if (version[0] === 0 && version[1] === 1 &&
         version[2] === 0 && version[3] === 0) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Identify the Compact Font Format(OpenType font)
   * with the version information in the header.
   * @param {(string|Object|ArrayBuffer|Buffer)} buffer Buffer of Font file.
   * @return {boolean} if CFF return true.
   */
  ttfjs.FontFormat.isCFF = function(buffer) {
    var version = ttfjs.FontFormat._readVersion(buffer);

    // OTTO
    if (version[0] === 0x4f && version[1] === 0x54 &&
        version[2] === 0x54 && version[3] === 0x4f) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Identify the TrueTypeCollection font
   * with the version information in the header.
   * @param {(string|Object|ArrayBuffer|Buffer)} buffer Buffer of Font file.
   * @return {boolean} if TTC return true.
   */
  ttfjs.FontFormat.isTTC = function(buffer) {
    var version = ttfjs.FontFormat._readVersion(buffer);

    // ttcf
    if (version[0] === 0x74 && version[1] === 0x74 &&
        version[2] === 0x63 && version[3] === 0x66) {
      return true;
    } else {
      return false;
    }
  };

  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
