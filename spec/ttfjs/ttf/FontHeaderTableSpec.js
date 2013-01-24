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
 * @fileoverview Spec of FontHeaderTable Class.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../../src/ttf/FontHeaderTable.js') :
    global.ttfjs;
   ttfjs.Table = (typeof require !== 'undefined') ?
    require('../../../src/Table.js').Table :
    global.ttfjs.Table;
   ttfjs.util = ttfjs.util || {};
   ttfjs.util.TTFDataView = (typeof require !== 'undefined') ?
    require('../../../src/util/TTFDataView.js').util.TTFDataView :
    global.ttfjs.util.TTFDataView.js;
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../../vendor/jdataview') :
    global.jDataView;
  var testFont = (typeof require !== 'undefined') ?
    require('../../fonts/SourceCodePro-Medium.ttf.js') :
    global.fontDataView;

  // spec
  describe('ttfjs.ttf.FontHeaderTable', function() {

    var fontDataView = new ttfjs.util.TTFDataView(testFont);
    var fontHeaderTable = ttfjs.ttf.FontHeaderTable.createFromDataView(fontDataView, 316);

    it('is Coonstructor', function() {
      expect(ttfjs.ttf.FontHeaderTable).toEqual(jasmine.any(Function));
    });

    it('is inherited from Table.', function() {
      expect(new ttfjs.ttf.FontHeaderTable()).toEqual(jasmine.any(ttfjs.Table));
    });

    describe('ttfjs.ttf.FontHeaderTable.createFromDataView', function() {

      it('is static method.', function() {
        expect(ttfjs.ttf.FontHeaderTable.createFromDataView).toEqual(jasmine.any(Function));
        expect(ttfjs.ttf.FontHeaderTable.createFromDataView(fontDataView, 316)).toEqual(jasmine.any(ttfjs.ttf.FontHeaderTable));
      });

    });

    it('has version', function() {
      expect(fontHeaderTable.version).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.version).toEqual(1.0);
    }); 

    it('has fontRevision', function() {
      expect(fontHeaderTable.fontRevision).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.fontRevision).toEqual(1.017);
    }); 

    it('has checkSumAdjustment', function() {
      expect(fontHeaderTable.checkSumAdjustment).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.checkSumAdjustment).toEqual(0x6d0bc4b5);
    }); 

    it('has magicNumber', function() {
      expect(fontHeaderTable.magicNumber).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.magicNumber).toEqual(0x5f0f3cf5);
    }); 

    it('has flags', function() {
      expect(fontHeaderTable.flags).toEqual(jasmine.any(Array));
      expect(fontHeaderTable.flags[0]).toEqual(true);
      expect(fontHeaderTable.flags[1]).toEqual(false);
      expect(fontHeaderTable.flags[2]).toEqual(false);
      expect(fontHeaderTable.flags[3]).toEqual(true);
      expect(fontHeaderTable.flags[4]).toEqual(false);
      expect(fontHeaderTable.flags[5]).toEqual(false);
      expect(fontHeaderTable.flags[6]).toEqual(false);
      expect(fontHeaderTable.flags[7]).toEqual(false);
      expect(fontHeaderTable.flags[8]).toEqual(false);
      expect(fontHeaderTable.flags[9]).toEqual(false);
      expect(fontHeaderTable.flags[10]).toEqual(false);
      expect(fontHeaderTable.flags[11]).toEqual(false);
      expect(fontHeaderTable.flags[12]).toEqual(false);
      expect(fontHeaderTable.flags[13]).toEqual(false);
      expect(fontHeaderTable.flags[14]).toEqual(false);
      expect(fontHeaderTable.flags[15]).toEqual(false);
    }); 

    it('has unitsPerEm', function() {
      expect(fontHeaderTable.unitsPerEm).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.unitsPerEm).toEqual(1000);
    });

    it('has created', function() {
      expect(fontHeaderTable.created).toEqual(jasmine.any(Date));
      expect(fontHeaderTable.created).toEqual(new Date('Fri Jan 11 10:57:01 2013 GMT+0000'));
    });

    it('has modified', function() {
      expect(fontHeaderTable.modified).toEqual(jasmine.any(Date));
      expect(fontHeaderTable.modified).toEqual(new Date('Fri Jan 11 18:57:02 2013 GMT+0000'));
    });

    it('has xMin', function() {
      expect(fontHeaderTable.xMin).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.xMin).toEqual(-47);
    });


    it('has yMin', function() {
      expect(fontHeaderTable.yMin).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.yMin).toEqual(-400);
    });

    it('has xMax', function() {
      expect(fontHeaderTable.xMax).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.xMax).toEqual(706);
    });

    it('has yMax', function() {
      expect(fontHeaderTable.yMax).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.yMax).toEqual(1000);
    });

    it('has macStyle', function() {
      expect(fontHeaderTable.macStyle).toEqual(jasmine.any(Array));
      expect(fontHeaderTable.macStyle[0]).toEqual(false);
      expect(fontHeaderTable.macStyle[1]).toEqual(false);
      expect(fontHeaderTable.macStyle[2]).toEqual(false);
      expect(fontHeaderTable.macStyle[3]).toEqual(false);
      expect(fontHeaderTable.macStyle[4]).toEqual(false);
      expect(fontHeaderTable.macStyle[5]).toEqual(false);
      expect(fontHeaderTable.macStyle[6]).toEqual(false);
      expect(fontHeaderTable.macStyle[7]).toEqual(false);
      expect(fontHeaderTable.macStyle[8]).toEqual(false);
      expect(fontHeaderTable.macStyle[9]).toEqual(false);
      expect(fontHeaderTable.macStyle[10]).toEqual(false);
      expect(fontHeaderTable.macStyle[11]).toEqual(false);
      expect(fontHeaderTable.macStyle[12]).toEqual(false);
      expect(fontHeaderTable.macStyle[13]).toEqual(false);
      expect(fontHeaderTable.macStyle[14]).toEqual(false);
      expect(fontHeaderTable.macStyle[15]).toEqual(false);
    });

   it('has lowestRecPPEM', function() {
     expect(fontHeaderTable.lowestRecPPEM).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.lowestRecPPEM).toEqual(9);
   });

   it('has fontDirectionHint', function() {
     expect(fontHeaderTable.fontDirectionHint).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.fontDirectionHint).toEqual(2);
   });

   it('has indexToLocFormat', function() {
     expect(fontHeaderTable.indexToLocFormat).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.indexToLocFormat).toEqual(0);
   });

   it('has glyphDataFormat', function() {
     expect(fontHeaderTable.glyphDataFormat).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.glyphDataFormat).toEqual(0);
   });

  it('has isLongtLocaFormat() method', function() {
    expect(fontHeaderTable.isLongtLocaFormat).toEqual(jasmine.any(Function));
    expect(fontHeaderTable.isLongtLocaFormat()).toEqual(false);
  });

    // TODO(ynakajima) Add detail.
 

  });

})(this);
