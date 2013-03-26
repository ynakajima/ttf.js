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
 * @fileoverview maxp - MaximumProfileTable Class file.
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
   * maxp - MaximumProfileTable Class
   * @constructor
   * @param {String} specName name of table spec.
   */
  ttfjs.ttf.MaximumProfileTable = function(specName) {

    /**
     * Table Spec.
     * @type {Array}
     */
    this.specs = [
      {
        name: 'v0_5',
        dataSpec: [
          {name: 'tableVersion', type: 'Fixed'},
          {name: 'numGlyphs', type: 'USHORT'}
        ]
      },
      {
        name: 'v1_0',
        dataSpec: [
          {name: 'tableVersion', type: 'Fixed'},
          {name: 'numGlyphs', type: 'USHORT'},
          {name: 'maxPoints', type: 'USHORT'},
          {name: 'maxContours', type: 'USHORT'},
          {name: 'maxCompositePoints', type: 'USHORT'},
          {name: 'maxCompositeContours', type: 'USHORT'},
          {name: 'maxZones', type: 'USHORT'},
          {name: 'maxTwilightPoints', type: 'USHORT'},
          {name: 'maxStorage', type: 'USHORT'},
          {name: 'maxFunctionDefs', type: 'USHORT'},
          {name: 'maxInstructionDefs', type: 'USHORT'},
          {name: 'maxStackElements', type: 'USHORT'},
          {name: 'maxSizeOfInstructions', type: 'USHORT'},
          {name: 'maxComponentElements', type: 'USHORT'},
          {name: 'maxComponentDepth', type: 'USHORT'}
        ]
      }
    ];

    ttfjs.Table.call(this, specName);

    /**
     * Table table version number.
     * @type {number}
     */
    this.tableVersion = 0;

    /**
     * The number of glyphs in the font.
     * @type {number}
     */
    this.numGlyphs = 0;

    /**
     * Maximum points in a non-composite glyph.
     * @type {number}
     */
    this.maxPoints = 0;

    /**
     * Maximum contours in a non-composite glyph.
     * @type {number}
     */
    this.maxContours = 0;

    /**
     * Maximum points in a composite glyph.
     * @type {number}
     */
    this.maxCompositePoints = 0;

    /**
     * Maximum contours in a composite glyph.
     * @type {number}
     */
    this.maxCompositeContours = 0;

    /**
     * 1 if instructions do not use the twilight zone (Z0),
     * or 2 if instructions do use Z0; should be set to 2 in most cases.
     * @type {number}
     */
    this.maxZones = 0;

    /**
     * Maximum points used in Z0.
     * @type {number}
     */
    this.maxTwilightPoints = 0;

    /**
     * Number of Storage Area locations.
     * @type {number}
     */
    this.maxStorage = 0;

    /**
     * Number of FDEFs.
     * @type {number}
     */
    this.maxFunctionDefs = 0;

    /**
     * Number of IDEFs.
     * @type {number}
     */
    this.maxInstructionDefs = 0;

    /**
     * Maximum stack depth2.
     * @type {number}
     */
    this.maxStackElements = 0;

    /**
     * Maximum byte count for glyph instructions.
     * @type {number}
     */
    this.maxSizeOfInstructions = 0;

    /**
     * Maximum number of components referenced at "top level"
     * for any composite glyph.
     * @type {number}
     */
    this.maxComponentElements = 0;

    /**
     * Maximum levels of recursion; 1 for simple components.
     * @type {number}
     */
    this.maxComponentDepth = 0;

  };

  // extends Table
  ttfjs.ttf.MaximumProfileTable.prototype = new ttfjs.Table();

  /**
   * Create MaximumProfileTable insance from TTFDataView object.
   * @param {TTFDataView} view TTFDataView object.
   * @param {number} offset offset.
   * @return {ttfjs.ttf.MaximumProfileTable} incetance of MaximumProfileTable.
   */
  ttfjs.ttf.MaximumProfileTable.createFromDataView = function(view, offset) {

    var tableVersion = view.getFixed(offset);
    var specName = '';

    switch (tableVersion) {
      case 0.5:
        specName = 'v0_5';
        break;

      case 1.0:
        specName = 'v1_0';
        break;

      default:
        throw 'err: invalid table version.';
    }

    return ttfjs.Table.createFromDataView_(
           ttfjs.ttf.MaximumProfileTable, view, offset, specName);
  };


  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
