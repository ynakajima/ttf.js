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

  var tableShortName = ttfjs.Table.getShortName('FontHeader');
  var tableOffset = testFontTableDirectory[tableShortName].offset;
  var headSpec = testFontSpec.head;
  var fontDataView = new ttfjs.util.TTFDataView(testFont);

  // spec
  describe('ttfjs.ttf.FontHeaderTable', function() {
   
    if (typeof ttfjs.ttf.FontHeaderTable.createFromDataView === 'function') {
      var fontHeaderTable = ttfjs.ttf.FontHeaderTable.createFromDataView(fontDataView, tableOffset);
    }
   
    it('is Coonstructor', function() {
      expect(ttfjs.ttf.FontHeaderTable).toEqual(jasmine.any(Function));
    });

    it('is inherited from Table.', function() {
      expect(new ttfjs.ttf.FontHeaderTable()).toEqual(jasmine.any(ttfjs.Table));
    });

    describe('ttfjs.ttf.FontHeaderTable.createFromDataView', function() {

      it('is static method.', function() {
        expect(ttfjs.ttf.FontHeaderTable.createFromDataView).toEqual(jasmine.any(Function));
        expect(ttfjs.ttf.FontHeaderTable.createFromDataView(fontDataView, tableOffset)).toEqual(jasmine.any(ttfjs.ttf.FontHeaderTable));
      });

    });

    it('has version', function() {
      expect(fontHeaderTable.tableVersion).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.tableVersion).toEqual(parseFloat(headSpec.tableVersion.value, 10));
    }); 

    it('has fontRevision', function() {
      var _fontRevision = Math.ceil(parseFloat(headSpec.fontRevision.value, 10) * 10000) / 10000;
      expect(fontHeaderTable.fontRevision).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.fontRevision).toEqual(_fontRevision);
    }); 

    it('has checkSumAdjustment', function() {
      expect(fontHeaderTable.checkSumAdjustment).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.checkSumAdjustment).toEqual(parseInt(headSpec.checkSumAdjustment.value, 16));
    }); 

    it('has magicNumber', function() {
      expect(fontHeaderTable.magicNumber).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.magicNumber).toEqual(parseInt(headSpec.magicNumber.value, 16));
    }); 

    it('has flags', function() {
      var _flags = headSpec.flags.value.replace(' ', '').split('').reverse();

      expect(fontHeaderTable.flags).toEqual(jasmine.any(Array));

      for ( var i = 0, l = _flags.length; i < l; i++) {
        expect(fontHeaderTable.flags[i]).toEqual(_flags[i] === '1');
      }
    }); 

    it('has unitsPerEm', function() {
      expect(fontHeaderTable.unitsPerEm).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.unitsPerEm).toEqual(parseInt(headSpec.unitsPerEm.value, 10));
    });

    it('has created', function() {
      expect(fontHeaderTable.created).toEqual(jasmine.any(Date));
      expect(fontHeaderTable.created).toEqual(new Date(headSpec.created.value + ' GMT+0000'));
    });

    it('has modified', function() {
      expect(fontHeaderTable.modified).toEqual(jasmine.any(Date));
      expect(fontHeaderTable.modified).toEqual(new Date(headSpec.modified.value + ' GMT+0000'));
    });

    it('has xMin', function() {
      expect(fontHeaderTable.xMin).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.xMin).toEqual(parseInt(headSpec.xMin.value, 10));
    });


    it('has yMin', function() {
      expect(fontHeaderTable.yMin).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.yMin).toEqual(parseInt(headSpec.yMin.value, 10));
    });

    it('has xMax', function() {
      expect(fontHeaderTable.xMax).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.xMax).toEqual(parseInt(headSpec.xMax.value, 10));
    });

    it('has yMax', function() {
      expect(fontHeaderTable.yMax).toEqual(jasmine.any(Number));
      expect(fontHeaderTable.yMax).toEqual(parseInt(headSpec.yMax.value, 10));
    });

    it('has macStyle', function() {
      var _macStyle = headSpec.macStyle.value.replace(' ', '').split('').reverse();

      expect(fontHeaderTable.macStyle).toEqual(jasmine.any(Array));

      for ( var i = 0, l = _macStyle.length; i < l; i++) {
        expect(fontHeaderTable.macStyle[i]).toEqual(_macStyle[i] === '1');
      }
    });

   it('has lowestRecPPEM', function() {
     expect(fontHeaderTable.lowestRecPPEM).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.lowestRecPPEM).toEqual(parseInt(headSpec.lowestRecPPEM.value, 10));
   });

   it('has fontDirectionHint', function() {
     expect(fontHeaderTable.fontDirectionHint).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.fontDirectionHint).toEqual(parseInt(headSpec.fontDirectionHint.value, 10));
   });

   it('has indexToLocFormat', function() {
     expect(fontHeaderTable.indexToLocFormat).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.indexToLocFormat).toEqual(parseInt(headSpec.indexToLocFormat.value, 10));
   });

   it('has glyphDataFormat', function() {
     expect(fontHeaderTable.glyphDataFormat).toEqual(jasmine.any(Number));
     expect(fontHeaderTable.glyphDataFormat).toEqual(parseInt(headSpec.glyphDataFormat.value, 10));
   });

  it('has isLongtLocaFormat() method', function() {
    expect(fontHeaderTable.isLongtLocaFormat).toEqual(jasmine.any(Function));
    expect(fontHeaderTable.isLongtLocaFormat()).toEqual(false);
  });

  // TODO(ynakajima) Add detail.
 

  });

})(this);
