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
 * @fileoverview Table Class file.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */

if (!ttfjs) { var ttfjs = {}; }

(function(global, ttfjs) {

  if (typeof ttfjs.util === 'undefined') {
    ttfjs.util = {};
  }
  ttfjs.util.TTFDataView = (typeof require !== 'undefined') ?
    require('./util/TTFDataView').util.TTFDataView :
    global.ttfjs.util.TTFDataView;

  /**
   * The Table class.
   * @constructor
   */
  ttfjs.Table = function() {

    /**
     * @private
     * @type Boolean
     */
    this.isRequired_ = false;

    /**
     * Table spec list
     * @type Object.<Array>
     */
    this.specs = {};

    /**
     * @private
     * @type Object
     */
    this.spec = {};

  };

  /**
   * Conversion list from table name to long name.
   * @type Object.<string>
   * @private
   */
  ttfjs.Table.LONG_NAME_LIST_ = {
    'cmap': 'CMap',
    'glyf': 'GlyphData',
    'head': 'FontHeader',
    'hhea': 'HorizontalHeader',
    'hmtx': 'HorizontalMetrics',
    'loca': 'IndexToLocation',
    'maxp': 'MaximumProfile',
    'name': 'Naming',
    'post': 'PostScriptInformation',
    'OS/2': 'OS2SpecificMetrics',
    'cvt ': 'ControlValue',
    'EBDT': 'EmbeddedBitmapData',
    'EBLC': 'EmbeddedBitmapLocation',
    'EBSC': 'EmbeddedBitmapScaling',
    'fpgm': 'FontProgram',
    'gasp': 'GridFittingScanConversion',
    'hdmx': 'HoriontalDeviceMetrics',
    'kern': 'Kerning',
    'LTSH': 'LinearThresholdData',
    'prep': 'CVTProgram',
    'PCLT': 'PCL5Data',
    'VDMX': 'VerticalDeviceMetrics',
    'vhea': 'VerticalMetricsHeader',
    'vmtx': 'VerticalMetrics'
  };

  /**
   * Return long name of table.
   * @param {string} shortName short name of table.
   * @return {string} long name of table.
   */
  ttfjs.Table.getLongName = function(shortName) {
    return ttfjs.Table.LONG_NAME_LIST_[shortName];
  };

  /**
   * Return short name of table.
   * @param {string} longName long name of table.
   * @return {string} short name of table.
   */
  ttfjs.Table.getShortName = function(longName) {
    var longNameList = ttfjs.Table.LONG_NAME_LIST_;
    for( var key in longNameList) {
      if (longNameList[key] == longName) {
        return key;
      }
    }
    return "";
  };

  /**
   * Create Table insance from TTFDataView object.
   * @param {TTFDataView} view TTFDataView object.
   */
  ttfjs.Table.createFromDataView = function(view) {
    throw 'error: this is interface.';
  };

  /**
   * Return whether required.
   * @return {Boolean} whether required.
   */
  ttfjs.Table.prototype.isRequired = function() {
    return this.isRequired_;
  };

  /**
   * Initialize and set table spec data.
   * @param {String} specName spec name.
   */
  ttfjs.Table.prototype.setSpec = function(specName) {
    if (typeof specName !== 'undefined' && typeof this.specs[specName] !== 'undefined') {

      // init var
      var selectedSepc = this.specs[specName];
      var spec = {
        dataList: [],
        dataSpec: {}
      };
      var offset = 0;

      // create spec data
      for (var i = 0, l = selectedSepc.length; i < l; i++) {
        var dataName = selectedSepc[i].name;
        var dataType =  selectedSepc[i].type.toUpperCase();
        var byteSize = ttfjs.util.TTFDataView.DATA_TYPE[dataType].byteSize;
        spec.dataList.push(dataName);
        spec.dataSpec[dataName] = {
          type: dataType,
          offset: offset
        }
        offset += byteSize;
      }

      // set spec data
      this.spec = spec;
    }
  };


  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
