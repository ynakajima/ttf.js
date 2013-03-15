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
      0x32, 0x40, // string: '2@'
      0x00, 0x00, 0x00, 0x00, 0xba, 0xb9, 0xf0, 0xb8, // longDateTime: Thu Apr 10 00:46:00 2003
      0x00, 0x00, 0x00, 0x00, 0xba, 0xc2, 0x67, 0x91, // longDateTime: Wed Apr 16 10:51:13 2003
      0x00, 0x00, 0x00, 0x00, 0xcd, 0x15, 0xa0, 0x7d, // longDateTime: Fri Jan 11 19:57:01 2013
      0x00, 0x00, 0x00, 0x00, 0xcd, 0x16, 0x10, 0xfe  // longDateTime: Sat Jan 12 03:57:02 2013
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

    describe('ttfjs.util.TTFDataView.tell()', function() {

      it('is method.', function() {
        expect(ttfDataView.tell).toEqual(jasmine.any(Function));
      });

      it('returns the current position', function() {
        ttfDataView.seek(8);
        expect(ttfDataView.tell()).toEqual(8);
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

    describe('ttfjs.TTFDataView.getLongDateTime()', function() {

      it('is method.', function() {
        expect(ttfDataView.getLongDateTime).toEqual(jasmine.any(Function));
      });

      it('returns the long internal format of a date in seconds since 12:00 midnight, January 1, 1904.', function() {
        expect(ttfDataView.getLongDateTime(33).getTime()).toEqual(Date.parse('Thu Apr 10 00:46:00 2003'));
        expect(ttfDataView.getLongDateTime().getTime()).toEqual(Date.parse('Wed Apr 16 10:51:13 2003'));
        expect(ttfDataView.getLongDateTime().getTime()).toEqual(Date.parse('Fri Jan 11 19:57:01 2013'));
        expect(ttfDataView.getLongDateTime().getTime()).toEqual(Date.parse('Sat Jan 12 03:57:02 2013'));
        // TODO(ynakajima): more test case. Distant past or future.
      });

    });

    describe('ttfjs.util.TTFDataView.getUFWord()', function() {
                                    
      it('is method.', function() { 
        expect(ttfDataView.getUFWord).toEqual(jasmine.any(Function));
      });

      it('returns the 16-bit signed integer.', function() {
        expect(ttfDataView.getUFWord(1)).toEqual(57072);
      });

    });

    describe('ttfjs.util.TTFDataView.getFWord()', function() {
                                    
      it('is method.', function() { 
        expect(ttfDataView.getFWord).toEqual(jasmine.any(Function));
      });

      it('returns the 16-bit signed integer.', function() {
        expect(ttfDataView.getFWord(1)).toEqual(-8464);
      });

    });


    describe('ttfjs.util.TTFDataView.DATA_TYPE', function() {
                                    
      it('is class member.', function() { 
        expect(ttfjs.util.TTFDataView.DATA_TYPE).toEqual(jasmine.any(Object));
      });

      /*
      BYTE        : {byteSize: 1, methodName: 'getByte'},
    CHAR        : {byteSize: 1, methodName: 'getChar'},
    USHORT      : {byteSize: 2, methodName: 'getUshort'},
    SHORT       : {byteSize: 2, methodName: 'getShort'},
    ULONG       : {byteSize: 4, methodName: 'getUlong'},
    LONG        : {byteSize: 4, methodName: 'getLong'},
    FIXED       : {byteSize: 4, methodName: 'getFixed'},
    FWORD       : {byteSize: 2, methodName: 'getFWord'},
    UFWORD      : {byteSize: 2, methodName: 'getUFWord'},
    LONGDATETIME: {byteSize: 8, methodName: 'getLongDateTime'}
      */

     it('has BYTE', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.BYTE).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.BYTE.byteSize).toEqual(1);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.BYTE.methodName).toEqual('getByte');
     });

     it('has CHAR', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.CHAR).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.CHAR.byteSize).toEqual(1);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.CHAR.methodName).toEqual('getChar');
     });

     it('has USHORT', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.USHORT).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.USHORT.byteSize).toEqual(2);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.USHORT.methodName).toEqual('getUshort');
     });

     it('has SHORT', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.SHORT).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.SHORT.byteSize).toEqual(2);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.SHORT.methodName).toEqual('getShort');
     });

     it('has ULONG', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.ULONG).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.ULONG.byteSize).toEqual(4);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.ULONG.methodName).toEqual('getUlong');
     });

     it('has LONG', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.LONG).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.LONG.byteSize).toEqual(4);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.LONG.methodName).toEqual('getLong');
     });

     it('has FWORD', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.FWORD).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.FWORD.byteSize).toEqual(2);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.FWORD.methodName).toEqual('getFWord');
     });

     it('has UFWORD', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.UFWORD).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.UFWORD.byteSize).toEqual(2);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.UFWORD.methodName).toEqual('getUFWord');
     });

     it('has LONGDATETIME', function() {
        expect(ttfjs.util.TTFDataView.DATA_TYPE.LONGDATETIME).toEqual(jasmine.any(Object));
        expect(ttfjs.util.TTFDataView.DATA_TYPE.LONGDATETIME.byteSize).toEqual(8);
        expect(ttfjs.util.TTFDataView.DATA_TYPE.LONGDATETIME.methodName).toEqual('getLongDateTime');
     });


    });


  });

})(this);
