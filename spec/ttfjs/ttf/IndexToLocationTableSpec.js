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
 * @fileoverview Spec of IndexToLocationTable Class.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../../src/ttf/IndexToLocationTable.js') :
    global.ttfjs;

  ttfjs.Table = (typeof require !== 'undefined') ?
    require('../../../src/Table.js').Table :
    global.ttfjs.Table;

  ttfjs.util = ttfjs.util || {};
  ttfjs.util.TTFDataView = (typeof require !== 'undefined') ?
    require('../../../src/util/TTFDataView.js').util.TTFDataView :
    global.ttfjs.util.TTFDataView;

  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../../vendor/jdataview') :
    global.jDataView;
  
  var testFont = (typeof require !== 'undefined') ?
    require('../../fonts/SourceCodePro-Medium.ttf.js') :
    global.testFont;

  var testFontTableDirectory = (typeof require !== 'undefined') ?
    require('../../fonts/SourceCodePro-Medium.tabledirectory.js').tableDirectory :
    global.testFontTableDirectory.tableDirectory;

  var testFontSpec = (typeof require !== 'undefined') ?
    require('../../fonts/SourceCodePro-Medium.ttx.js').ttFont :
    global.testFontSpec.ttFont;

  var tableShortName = ttfjs.Table.getShortName('IndexToLocation');
  var tableOffset = testFontTableDirectory[tableShortName].offset;
  var locaSpec = testFontSpec[tableShortName];
  var fontDataView = new ttfjs.util.TTFDataView(testFont);
  var indexToLocFormat = parseInt(testFontSpec.head.indexToLocFormat.value, 10);
  var numGlyphs = parseInt(testFontSpec.maxp.numGlyphs.value, 10);

  if (typeof ttfjs.ttf.IndexToLocationTable.createFromDataView === 'function') {
    var testTable = ttfjs.ttf.IndexToLocationTable.createFromDataView(fontDataView, tableOffset, indexToLocFormat, numGlyphs);
  }

  // spec
  describe('ttfjs.ttf.IndexToLocationTable', function() {

    it('is Coonstructor', function() {
      expect(ttfjs.ttf.IndexToLocationTable).toEqual(jasmine.any(Function));
    });

    it('is inherited from Table.', function() {
      expect(testTable).toEqual(jasmine.any(ttfjs.Table));
    });

    describe('ttfjs.ttf.MaximumProfileTable.specs', function() {
     
      it('is Array', function() {
        expect(testTable.specs).toEqual([
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
        ]);
      });

    });

    it('has indexToLoc', function() {
      expect(testTable.indexToLoc).toEqual(jasmine.any(Array));
      expect(testTable.indexToLoc.length).toEqual(numGlyphs + 1);
      expect(testTable.indexToLoc).toEqual(locaSpec);
    });

  });

})(this);
