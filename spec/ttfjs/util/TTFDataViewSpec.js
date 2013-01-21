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
 * @fileoverview Spec of TTFDataView Class.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../../src/util/TTFDataView.js') :
    global.ttfjs;
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../../vendor/jdataview') :
    global.jDataView;

  // spec
  describe('ttfjs.util.TTFDataView', function() {

    var dummyBuffer = jDataView.createBuffer(
      0xab, // BYTE: 171, CHAR: -85
      0xde, 0xf0, // USHORT: 57072, SHORT: -8464
      0xab, 0xcd, 0xef, 0x89, // ULONG: 2882400137, LONG: -1412567159
      0x00, 0x01, 0x00, 0x00, // FIXED: 1.0
      0x01, 0x9c, 0x39, 0xe1, // FIXED: 412.226089478
      0x00, 0x00, 0x00, 0x09, // FIXED: 0.001
      0x7f, 0xff, // F2DOT14: 1.999939
      0x70, 0x00, // F2DOT14: 1.75
      0x00, 0x01, // F2DOT14: 0.000061
      0x00, 0x00, // F2DOT14: 0.0
      0xff, 0xff, // F2DOT14: -0.000061
      0x80, 0x00, // F2DOT14: -2.0
      0x32, 0x40 // string: '2@'
    );
    var view = new jDataView(dummyBuffer);
    var ttfDataView = new ttfjs.util.TTFDataView(view);

    it('is Coonstructor', function() {
      expect(ttfjs.util.TTFDataView).toEqual(jasmine.any(Function));
      expect(ttfDataView).toEqual(jasmine.any(ttfjs.util.TTFDataView));
    });

    describe('ttfjs.util.TTFDataView.seek()', function() {

      it('is method.', function() {
        expect(ttfDataView.seek).toEqual(jasmine.any(Function));
      });

      it('moves the internal pointer to the position', function() {
        ttfDataView.seek(12);
        expect(view.tell()).toEqual(12);
      });

    });

   describe('ttfjs.util.TTFDataView.getString()', function() {

      it('is method.', function() {
        expect(ttfDataView.getString).toEqual(jasmine.any(Function));
      });

      it('returns string.', function() {
        ttfDataView.seek(31);
        expect(ttfDataView.getString(2)).toEqual('2@');
        expect(ttfDataView.getString(1, 13)).toEqual('9');
      });

    });

    describe('ttfjs.util.TTFDataView.getByte()', function() {

      it('is method.', function() {
        expect(ttfDataView.getByte).toEqual(jasmine.any(Function));
      });

      it('returns the 8-bit unsigned integer.', function() {
        expect(ttfDataView.getByte(0)).toEqual(171);
      });

    });

    describe('ttfjs.util.TTFDataView.getChar()', function() {

      it('is method.', function() {
        expect(ttfDataView.getChar).toEqual(jasmine.any(Function));
      });

      it('returns the 8-bit signed integer.', function() {
        expect(ttfDataView.getChar(0)).toEqual(-85);
      });

    });

    describe('ttfjs.util.TTFDataView.getUshort()', function() {

      it('is method.', function() {
        expect(ttfDataView.getUshort).toEqual(jasmine.any(Function));
      });

      it('returns the 16-bit unsigned integer.', function() {
        expect(ttfDataView.getUshort(1)).toEqual(57072);
      });

    });

    describe('ttfjs.util.TTFDataView.getShort()', function() {

      it('is method.', function() {
        expect(ttfDataView.getShort).toEqual(jasmine.any(Function));
      });

      it('returns the 16-bit signed integer.', function() {
        expect(ttfDataView.getShort(1)).toEqual(-8464);
      });

    });

    describe('ttfjs.util.TTFDataView.getUlong()', function() {

      it('is method.', function() {
        expect(ttfDataView.getUlong).toEqual(jasmine.any(Function));
      });

      it('returns the 32-bit unsigned integer.', function() {
        expect(ttfDataView.getUlong(3)).toEqual(2882400137);
      });

    });

    describe('ttfjs.util.TTFDataView.getLong()', function() {

      it('is method.', function() {
        expect(ttfDataView.getLong).toEqual(jasmine.any(Function));
      });

      it('returns the 32-bit signed integer.', function() {
        expect(ttfDataView.getLong(3)).toEqual(-1412567159);
      });

    });

    describe('ttfjs.util.TTFDataView.getFixed()', function() {

      it('is method.', function() {
        expect(ttfDataView.getFixed).toEqual(jasmine.any(Function));
      });

      it('returns the 32-bit signed fixed-point number (16.16).', function() {
        expect(ttfDataView.getFixed(7)).toEqual(1.0);
        expect(ttfDataView.getFixed()).toEqual(412.227);
        expect(ttfDataView.getFixed()).toEqual(0.001);
      });

    });

    describe('ttfjs.util.TTFDataView.getF2dot14()', function() {

      it('is method.', function() {
        expect(ttfDataView.getF2dot14).toEqual(jasmine.any(Function));
      });

      it('returns the 16-bit signed fixed number with the low 14 bits of fraction (2.14).', function() {
        expect(ttfDataView.getF2dot14()).toEqual(1.999939);
        expect(ttfDataView.getF2dot14()).toEqual(1.75);
        expect(ttfDataView.getF2dot14()).toEqual(0.000061);
        expect(ttfDataView.getF2dot14()).toEqual(0.0);
        expect(ttfDataView.getF2dot14()).toEqual(-0.000061);
      });

    });

  });

})(this);
