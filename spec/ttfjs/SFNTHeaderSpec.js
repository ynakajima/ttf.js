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
 * @fileoverview Spec of SFNTheader Class.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../src/SFNTHeader.js') :
    global.ttfjs;
  ttfjs.util = (typeof require !== 'undefined') ?
    require('../../src/util/TTFDataView.js').util :
    global.ttfjs.util;
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../vendor/jdataview') :
    global.jDataView;

  var buffer = jDataView.createBuffer(
    0x00, 0x01, 0x00, 0x00 // 0x000100
  );

  // spec
  describe('ttfjs.SFNTHeader', function() {

    var dataview =new ttfjs.util.TTFDataView(new jDataView(buffer, 0, buffer.byteLength, false));
    var sfntHeader = new ttfjs.SFNTHeader(dataview);

    it('is Coonstructor', function() {
      expect(ttfjs.SFNTHeader).toEqual(jasmine.any(Function));
      expect(sfntHeader).toEqual(jasmine.any(ttfjs.SFNTHeader));
    });

    it('will throw an error when passed an argument other than TTFDataView.',
      function() {
        expect(function() {
          new ttfjs.SFNTHeader(dataview);
        }).not.toThrow('error: dataview is not TTFDataView.');
        expect(function() {
          new ttfjs.SFNTHeader('hoge');
        }).toThrow('error: dataview is not TTFDataView.');
      }
    );

    it('has version and version is string', function() {
      expect(sfntHeader.version).toBeDefined();
      expect(sfntHeader.version).toEqual(jasmine.any(String));
      // TODO(ynakajima): Add details.
    });

    it('has numTables and numTables is number', function() {
      expect(sfntHeader.numTables).toBeDefined();
      expect(sfntHeader.numTables).toEqual(jasmine.any(Number));
      // TODO(ynakajima): Add details.
    });

    it('has searchRenge and searchRenge is number', function() {
      expect(sfntHeader.searchRenge).toBeDefined();
      expect(sfntHeader.searchRenge).toEqual(jasmine.any(Number));
      // TODO(ynakajima): Add details.
    });

    it('has entrySelector and entrySelector is number', function() {
      expect(sfntHeader.entrySelector).toBeDefined();
      expect(sfntHeader.entrySelector).toEqual(jasmine.any(Number));
      // TODO(ynakajima): Add details.
    });

    it('has rangeShift and rangeShift is number', function() {
      expect(sfntHeader.rangeShift).toBeDefined();
      expect(sfntHeader.rangeShift).toEqual(jasmine.any(Number));
      // TODO(ynakajima): Add details.
    });

  });

})(this);
