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
 * @fileoverview SFNTHeader Class file.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */

if (!ttfjs) { var ttfjs = {}; }

(function(global, ttfjs) {

  // require
  ttfjs.util = (typeof require !== 'undefined') ?
    require('./util/TTFDataView.js').util :
    global.ttfjs.util;

  /**
   * SFNTHeader Class
   * <p>Spec: http://www.microsoft.com/typography/otspec/otff.htm</p>
   * @constructor
   * @param {ttfjs.util.TTFDataView} dataview TTFDataView Object.
   */
  ttfjs.SFNTHeader = function(dataview) {

    if (typeof dataview !== 'object' || !dataview instanceof ttfjs.util.TTFDataView) {
      throw 'error: dataview is not TTFDataView.';
    }

    /**
     * 0x00010000 for version 1.0.
     * @type string
     */
    this.version = '';

    /**
     * Number of tables.
     * @type number
     */
    this.numTables = 0;

    /**
     * (Maximum power of 2 <= numTables) x 16.
     * @type number
     */
    this.searchRenge = 0;

    /**
     * Log2(maximum power of 2 <= numTables).
     * @type number
     */
    this.entrySelector = 0;

    /**
     * NumTables x 16-searchRange.
     * @type number
     */
    this.rangeShift = 0;

    // init
    this._init(dataview);
  };

  /**
   * Init SFNTheader
   * @param {ttfjs.util.TTFDataView} dataview TTFDataView Object.
   * @private
   */
  ttfjs.SFNTHeader.prototype._init = function(dataview) {
    // TODO(ynakajima) Initialize members.
  };

  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
