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
 * @fileoverview FontHeaderTable Class file.
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
   * FontHeaderTable Class
   * @constructor
   */
  ttfjs.ttf.FontHeaderTable = function() {

    /**
     * Table Spec
     * @type {Array}
     */
    this.specs = [
      {
        name: 'default',
        dataSpec: [
          {name: 'tableVersion', type: 'Fixed'},
          {name: 'fontRevision', type: 'Fixed'},
          {name: 'checkSumAdjustment', type: 'ULONG'},
          {name: 'magicNumber', type: 'ULONG'},
          {name: 'flags', type: 'USHORT', isFlags: true},
          {name: 'unitsPerEm', type: 'USHORT'},
          {name: 'created', type: 'LONGDATETIME'},
          {name: 'modified', type: 'LONGDATETIME'},
          {name: 'xMin', type: 'SHORT'},
          {name: 'yMin', type: 'SHORT'},
          {name: 'xMax', type: 'SHORT'},
          {name: 'yMax', type: 'SHORT'},
          {name: 'macStyle', type: 'USHORT', isFlags: true},
          {name: 'lowestRecPPEM', type: 'USHORT'},
          {name: 'fontDirectionHint', type: 'SHORT'},
          {name: 'indexToLocFormat', type: 'SHORT'},
          {name: 'glyphDataFormat', type: 'SHORT'}
        ]
      }
    ];

    // extends Table
    ttfjs.Table.call(this);

    /**
     * Table table version number.
     * @type {number}
     */
    this.tableVersion = 1.0;

    /**
     * Font revision.
     * @type {number}
     */
    this.fontRevision = 0;

    /**
     * CheckSum Adjustment.
     * <pre>
     * To compute: set it to 0, sum the entire font as ULONG,
     * then store 0xB1B0AFBA - sum.
     * @type {number}
     */
    this.checkSumAdjustment = 0;

    /**
     * MagicNumber.
     * @type {number}
     */
    this.magicNumber = 0x5F0F3CF5;

     /**
     * Flags.
     * <pre>
     * bit 0 - y value of 0 specifies baseline
     * bit 1 - x position of left most black bit is LSB
     * bit 2 - scaled point size and actual point size will differ
     *         (i.e. 24 point glyph differs from 12 point glyph
     *         scaled by factor of 2)
     * bit 3 - use integer scaling instead of fractional
     * bit 4 - (used by the Microsoft implementation of the TrueType scaler)
     * bit 5 - This bit should be set in fonts that are intended to e laid out
     *         vertically, and in which the glyphs have been drawn such
     *         that an x-coordinate of 0 corresponds to the desired vertical
     *         baseline.
     * bit 6 - This bit must be set to zero.
     * bit 7 - This bit should be set if the font requires layout for correct
     *         linguistic rendering (e.g. Arabic fonts).
     * bit 8 - This bit should be set for a GX font which has one or more
     *         metamorphosis effects designated as happening by default.
     * bit 9 - This bit should be set if the font contains any strong
     *         right-to-left glyphs.
     * bit 10 - This bit should be set if the font contains Indic-style
     *          rearrangement effects.
     * Bit 11: Font data is 'lossless,' as a result of having been compressed
     *         and decompressed with the Agfa MicroType Express engine.
     * Bit 12: Font converted (produce compatible metrics)
     * Bit 13: Font optimized for ClearType™. Note,
     *         fonts that rely on embedded bitmaps (EBDT) for rendering should
     *         not be considered optimized for ClearType, and therefore should
     *         keep this bit cleared.
     * Bit 14: Last Resort font. If set, indicates that the glyphs encoded in
     *         the cmap subtables are simply generic symbolic representations of
     *         code point ranges and don’t truly represent support for those
     *         code points. If unset, indicates that the glyphs encoded
     *         in the cmap subtables represent proper support for those
     *         code points.
     * Bit 15: Reserved, set to 0
     * </pre>
     * @type {number}
     */
    this.flags = [
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false];

    /**
     * Units per EM.
     * <pre>Valid range is from 16 to 16384</pre>
     * @type {number}
     */
    this.unitsPerEm = 0x5F0F3CF5;

    /**
     * Created DateTime.
     * @type {Date}
     */
    this.created = new Date('January 1, 1904 00:00:00');

    /**
     * Modified DateTime.
     * @type {Date}
     */
    this.modified = new Date('January 1, 1904 00:00:00');

    /**
     * Minimum value of X for all glyph bounding boxes.
     * @type {number}
     */
    this.xMin = 0;

    /**
     * Minimum value of Y for all glyph bounding boxes.
     * @type {number}
     */
    this.yMin = 0;

    /**
     * Maximum value of X for all glyph bounding boxes.
     * @type {number}
     */
    this.xMax = 0;

    /**
     * Maximum value of Y for all glyph bounding boxes.
     * @type {number}
     */
    this.yMax = 0;

    /**
     * Mac Style
     * <pre>
     * bit 0 bold
     * bit 1 italic
     * bit 2 underline
     * bit 3 outline
     * bit 4 shadow
     * bit 5 condensed (narrow)
     * bit 6 extended
     * </pre>
     * @type {Array.<Boolean>}
     */
    this.macStyle = [
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false];

    /**
     * Lowest RecPPEM.
     * Smallest readable size in pixels.
     * @type {number}
     */
    this.lowestRecPPEM = 0;

    /**
     * fontDirectionHint.
     * <pre>
     * 0 Fully mixed directional glyphs;
     * 1 Only strongly left to right;
     * 2 Like 1 but also contains neutrals1;
     * -1 Only strongly right to left;
     * -2 Like -1 but also contains neutrals.
     * </pre>
     * @type {number}
     */
    this.fontDirectionHint = 0;

    /**
     * Index to Location format.
     * <pre>0 for short offsets, 1 for long.</pre>
     * @type {number}
     */
    this.indexToLocFormat = 0;

    /**
     * Glyphi Data Format.
     * <pre>0 for current format.</pre>
     * @type {number}
     */
    this.glyphDataFormat = 0;

  };

  ttfjs.ttf.FontHeaderTable.prototype = new ttfjs.Table();

  /**
   * Return Loca Format.
   * @return {Boolean} if Loca Format is Long: true.
   */
  ttfjs.ttf.FontHeaderTable.prototype.isLongtLocaFormat = function() {
    return (this.indexToLocFormat === 1);
  };

  /**
   * Create Table insance from TTFDataView object.
   * @param {TTFDataView} view TTFDataView object.
   * @param {number} offset offset.
   */
  ttfjs.ttf.FontHeaderTable.createFromDataView = function(view, offset) {
    return ttfjs.Table.createFromDataView_(
           ttfjs.ttf.FontHeaderTable, view, offset);
  };


  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
