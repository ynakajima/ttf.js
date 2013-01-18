/**
 * @license Released under the MIT license.
 *
 * <pre>
 * Copyright (c) 2013 ynakajima <yuhta.nakajima@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * </pre>
 *
 * @fileoverview TableDirectoryEntry Class file.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */

if (!ttfjs) { var ttfjs = {}; }

(function(global, ttfjs) {

  // require
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../vendor/jdataview') :
    global.jDataView;

  /**
   * The table directory follows the offset subtable.
   * @constructor
   * @param {string} tag tag(4-byte identifier).
   * @param {string} checksum checksum for table.
   * @param {number} offset offset from beginning of sfnt.
   * @param {number} length length of table in byte.
   * @param {jDataView} view Font file buffer.
   */
  ttfjs.TableDirectoryEntry = function(tag, checksum, offset, length, view) {

    /**
     * @private
     * @type string
     */
    this.tag_ = '';

    /**
     * @private
     * @type string
     */
    this.checksum_ = '';

    /**
     * @private
     * @type number
     */
    this.offset_ = 0;

    /**
     * @private
     * @type number
     */
    this.length_ = 0;

    /**
     * @private
     * @type jDataView
     */
    this.view_ = (view instanceof jDataView) ? view : null;

    // init
    this.setTag(tag);
    this.setChecksum(checksum);
    this.setOffset(offset);
    this.setLength(length);

  };

  /**
   * Create TableDirectoryEntry insance from jDataView object.
   * @param {jDataView} view jDataView object.
   * @param {number} offset offset from beginning of sfnt.
   * @return {ttfjs.TableDirectoryEntry} TableDirectoryEntry instance.
   */
  ttfjs.TableDirectoryEntry.createFromDataView = function(view, offset) {

    if (typeof view !== 'undefined' && view instanceof jDataView &&
        typeof offset === 'number') {

      view.seek(offset);
      var _tag = view.getString(4);
      var _checksum = ('00000000' + view.getUint32().toString(16)).slice(-8);
      var _offset = view.getUint32();
      var _length = view.getUint32();

      return new ttfjs.TableDirectoryEntry(_tag, _checksum, _offset, _length, view);

    } else {
      return null;
    }

  };

  /**
   * Tag name getter.
   * @return {string} tag(4-byte identifier).
   */
  ttfjs.TableDirectoryEntry.prototype.getTag = function() {
    return this.tag_;
  };

  /**
   * Tag name setter.
   * @param {string} tag tag(4-byte identifier).
   */
  ttfjs.TableDirectoryEntry.prototype.setTag = function(tag) {
    if (typeof tag === 'string') {
      this.tag_ = tag;
    }
  };

  /**
   * checksum getter.
   * @return {string} checksum for table.
   */
  ttfjs.TableDirectoryEntry.prototype.getChecksum = function() {
    return this.checksum_;
  };

  /**
   * checksum setter.
   * @param {string} checksum checksum for table..
   */
  ttfjs.TableDirectoryEntry.prototype.setChecksum = function(checksum) {
    if (typeof checksum === 'string') {
      this.checksum_ = checksum;
    }
  };

  /**
   * offset getter.
   * @return {number} offset from beginning of sfnt.
   */
  ttfjs.TableDirectoryEntry.prototype.getOffset = function() {
    return this.offset_;
  };

  /**
   * offset setter.
   * @param {number} offset offset from beginning of sfnt.
   */
  ttfjs.TableDirectoryEntry.prototype.setOffset = function(offset) {
    if (typeof offset === 'number') {
      this.offset_ = offset;
    }
  };

  /**
   * length getter.
   * @return {number} length of table in byte.
   */
  ttfjs.TableDirectoryEntry.prototype.getLength = function() {
    return this.length_;
  };

  /**
   * length setter.
   * @param {number} length length of table in byte.
   */
  ttfjs.TableDirectoryEntry.prototype.setLength = function(length) {
    if (typeof length === 'number') {
      this.length_ = length;
    }
  };

  /**
   * Calculate Checksum for table.
   * @return {string} checksum for table.
   */
  ttfjs.TableDirectoryEntry.prototype.calcChecksum = function() {
    var view = this.view_;

    if (view === null) {
      throw 'err: can not caluclate.';
    } else {

      // move to head of table
      view.seek(this.getOffset());

      // calculate checksum
      var sum = 0;
      var nLongs = parseInt((this.getLength() + 3) / 4, 10);
      
      while (nLongs-- > 0) {
        sum = (sum + view.getUint32()) & 0xffffffff;
      }

      return ('00000000' + (sum & 0xffffffff).toString(16)).slice(-8);
    }
  };

  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
