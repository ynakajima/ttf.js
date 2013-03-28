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
 * @fileoverview loca - IndexToLocationTable Class file.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */

if (!ttfjs) { var ttfjs = {}; }

(function(global, ttfjs) {

  if (typeof ttfjs.ttf === 'undefined') {
    ttfjs.ttf = {};
  }

  // require
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../vendor/jdataview') :
    global.jDataView;

  ttfjs.Table = (typeof require !== 'undefined') ?
    require('../Table.js').Table :
    global.ttfjs.Table;


  /**
   * loca - IndexToLocationTable Class
   * @constructor
   * @param {String} specName name of table spec.
   */
  ttfjs.ttf.IndexToLocationTable = function(specName) {

    /**
     * Table Spec.
     * @type {Array}
     */
    this.specs = [
      {
        name: 'short',
        dataSpec: [
          {name: 'indexToLoc', type: 'USHORT'}
        ]
      },
      {
        name: 'long',
        dataSpec: [
          {name: 'indexToLoc', type: 'ULONG'}
        ]
      }
    ];

    ttfjs.Table.call(this, specName);

    /**
     * The offsets to the locations of the glyphs in the font.
     * <pre>short version : The actual local offset divided by 2 is stored.
     * The value of n is numGlyphs + 1. The value for numGlyphs is
     * found in the 'maxp' table.
     * long version : The actual local offset is stored.
     * The value of n is numGlyphs + 1.
     * The value for numGlyphs is found in the 'maxp' table.
     * </pre>
     * @type {Array.<Number>}
     */
    this.indexToLoc = [];

  };

  // extends Table
  ttfjs.ttf.IndexToLocationTable.prototype = new ttfjs.Table();

  /**
   * Create IndexToLocationTable insance from TTFDataView object.
   * @param {TTFDataView} view TTFDataView object.
   * @param {number} offset offset.
   * @param {number} indexToLocFormat Index to Location format.
   *                                  0: short, 1: long.
   * @param {number} numGlyphs The number of glyphs in the font.
   * @return {ttfjs.ttf.MaximumProfileTable} incetance of MaximumProfileTable.
   */
  ttfjs.ttf.IndexToLocationTable.createFromDataView =
   function(view, offset, indexToLocFormat, numGlyphs) {

    var specName = (indexToLocFormat === 1) ? 'long' : 'short';
    var locaTable = new ttfjs.ttf.IndexToLocationTable(specName);

    view.seek(offset);

    for (var i = 0; i < numGlyphs + 1; i++) {
      var index = (specName === 'short') ?
                view.getUshort() * 2 : view.getUlong();
      locaTable.indexToLoc.push(index);
    }

    return locaTable;

  };


  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
