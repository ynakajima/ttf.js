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
    this.specs = (typeof this.specs === 'undefined') ? {} : this.specs;

    /**
     * Table spec
     * @type Object
     */
    this.spec = {};

    if (this.specs.length > 0) {
      this.setSpec(this.specs[0].name);
    }

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
    for (var key in longNameList) {
      if (longNameList[key] == longName) {
        return key;
      }
    }
    return '';
  };

  /**
   * Create Table insance from TTFDataView object.
   * @private
   * @param {ttfjs.Table} tableClass Table Class.
   * @param {TTFDataView} ttfDataview TTFDataView object.
   * @param {number} tableOffset Offset to a table.
   */
  ttfjs.Table.createFromDataView_ = function(
    tableClass, ttfDataview, tableOffset) {
    var table = new tableClass();
    var tableDataList = table.spec.dataList;
    for (var i = 0, l = tableDataList.length; i < l; i++) {
      var dataName = tableDataList[i];
      table.setDataFromDataView(dataName, ttfDataview, tableOffset);
    }
    return table;
  };

  /**
   * Return whether required.
   * @return {Boolean} whether required.
   */
  ttfjs.Table.prototype.isRequired = function() {
    return this.isRequired_;
  };

  /**
   * Returns the specification of the given name.
   * @param {String} spacName spec name.
   * @return {Object} specdata.
   */
  ttfjs.Table.prototype.getSpecByName = function(specName) {
    if (typeof specName === 'string') {
      for (var i = 0, l = this.specs.length; i < l; i++) {
        if (this.specs[i].name === specName) {
          return this.specs[i];
        }
      }
    }
    return false;
  };

  /**
   * Initialize and set table spec data.
   * @param {String} specName spec name.
   */
  ttfjs.Table.prototype.setSpec = function(specName) {
    var selectedSepc = this.getSpecByName(specName);
    if (selectedSepc) {
      // init var
      var spec = {
        dataList: [],
        dataSpec: {}
      };
      var offset = 0;

      // create spec data
      for (var i = 0, l = selectedSepc.dataSpec.length; i < l; i++) {
        var dataName = selectedSepc.dataSpec[i].name;
        var dataType = selectedSepc.dataSpec[i].
                       type.toUpperCase();
        var byteSize = ttfjs.util.TTFDataView.DATA_TYPE[dataType].byteSize;
        var isFlags = (typeof selectedSepc.dataSpec[i].isFlags === 'boolean') ?
                      selectedSepc.dataSpec[i].isFlags : false;
        spec.dataList.push(dataName);
        spec.dataSpec[dataName] = {
          type: dataType,
          offset: offset,
          isFlags: isFlags
        };
        offset += byteSize;
      }

      // set spec data
      this.spec = spec;
    }
  };

   /**
   * Set data based on the specified ttfDataView.
   * @param {String} dataName data name.
   * @param {ttf.util.TTFDataView} ttfDataView incetance of TTFDataView.
   * @param {number} tableOffset Offset to a table.
   */
  ttfjs.Table.prototype.setDataFromDataView = function(
          dataName, ttfDataView, tableOffset) {
    if (typeof dataName === 'string' &&
        typeof this.spec.dataSpec[dataName] !== 'undefined' &&
        typeof ttfDataView !== 'undefined' && typeof tableOffset === 'number') {
      // init
      var dataSpec = this.spec.dataSpec[dataName];
      var dataType = dataSpec.type;
      var offset = dataSpec.offset + tableOffset;
      var methodName = ttfjs.util.TTFDataView.DATA_TYPE[dataType].methodName;
      var isFlags = dataSpec.isFlags;

      // get spec data
      var specData = ttfDataView[methodName](offset);

      // set spec data
      if (isFlags) {
        this[dataName] = [];
        var bitSize = 8 * ttfjs.util.TTFDataView.DATA_TYPE[dataType].byteSize;
        for (var i = 0; i < bitSize; i++) {
          var bit = Math.pow(2, i);
          this[dataName][i] = ((bit & specData) === bit);
        }
      } else {
        this[dataName] = ttfDataView[methodName](offset);
      }
    }
  };

  // exports
  if (typeof module !== 'undefined') {
    module.exports = ttfjs;
  }

})(this, ttfjs);
