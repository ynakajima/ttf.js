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
 * @fileoverview Font Interface file.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */

if (!ttfjs) { var ttfjs = {}; }

(function(global, ttfjs) {

  /**
   * Font Interface
   * @interface
   * @constructor
   */
  ttfjs.Font = function(buffer) {

    /** @type string */
    this.format = '';

    /** @type ttfjs.SFNTHeader */
    this.sfntHeader = null;

    /** @type Array.<ttfjs.TableDirectoryEntry> */
    this.tableDirectory = [];

  };

  /**
   * Create Font instance form Font file buffer.
   * @param {(ArrayBuffer|Buffer)} buffer Font file buffer.
   */
  ttfjs.Font.createFromBuffer = function(buffer) {
    // TODO(ynakajima): Implement this.
  };

  /**
   * Get Glyph Object by index.
   * @param {number} glyphIndex Glyph index number.
   * @return {ttfjs.Glyph} Glyph Object.
   */
  ttfjs.Font.prototype.getGlyph = function(glyphIndex) {
    throw 'error: This is a Interface. Override this.';
  };

  /**
   * Get Glyph List.
   * @return {Array.<ttfjs.Glyph>} Glyph Object List.
   */
  ttfjs.Font.prototype.getGlyphList = function() {
    throw 'error: This is a Interface. Override this.';
  };

  /**
   * Get font revision number.
   * @return {number} Font revision number.
   */
  ttfjs.Font.prototype.getRevision = function() {
    throw 'error: This is a Interface. Override this.';
  };

  /**
   * Get units per EM.
   * @return {number} Units per Em.
   */
  ttfjs.Font.prototype.getUnitsPerEm = function() {
    throw 'error: This is a Interface. Override this.';
  };

  /**
   * Get created date.
   * @return {Date} Created date.
   */
  ttfjs.Font.prototype.getCreatedDate = function() {
    throw 'error: This is a Interface. Override this.';
  };

  /**
   * Get modified date.
   * @return {Date} Created date.
   */
  ttfjs.Font.prototype.getModifiedDate = function() {
    throw 'error: This is a Interface. Override this.';
  };

  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
