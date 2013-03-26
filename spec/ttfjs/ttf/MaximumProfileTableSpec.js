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
 * @fileoverview Spec of MaximumProfileTable Class.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../../src/ttf/MaximumProfileTable.js') :
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

  var tableShortName = ttfjs.Table.getShortName('MaximumProfile');
  var tableOffset = testFontTableDirectory[tableShortName].offset;
  var maxpSpec = testFontSpec.maxp;
  var fontDataView = new ttfjs.util.TTFDataView(testFont);

  if (typeof ttfjs.ttf.MaximumProfileTable.createFromDataView === 'function') {
    var testTable = ttfjs.ttf.MaximumProfileTable.createFromDataView(fontDataView, tableOffset);
  }

  // spec
  describe('ttfjs.ttf.MaximumProfileTable', function() {

    it('is Coonstructor', function() {
      expect(ttfjs.ttf.MaximumProfileTable).toEqual(jasmine.any(Function));
    });

    it('is inherited from Table.', function() {
      expect(testTable).toEqual(jasmine.any(ttfjs.Table));
    });

    describe('ttfjs.ttf.MaximumProfileTable.specs', function() {
     
      it('is Array', function() {
        expect(testTable.specs).toEqual([
          {
             name: 'v0_5',
             dataSpec: [
               {name: 'tableVersion', type: 'Fixed'},
               {name: 'numGlyphs', type: 'USHORT'}
             ]
           },
           {
             name: 'v1_0',
             dataSpec: [
               {name: 'tableVersion', type: 'Fixed'},
               {name: 'numGlyphs', type: 'USHORT'},
               {name: 'maxPoints', type: 'USHORT'},
               {name: 'maxContours', type: 'USHORT'},
               {name: 'maxCompositePoints', type: 'USHORT'},
               {name: 'maxCompositeContours', type: 'USHORT'},
               {name: 'maxZones', type: 'USHORT'},
               {name: 'maxTwilightPoints', type: 'USHORT'},
               {name: 'maxStorage', type: 'USHORT'},
               {name: 'maxFunctionDefs', type: 'USHORT'},
               {name: 'maxInstructionDefs', type: 'USHORT'},
               {name: 'maxStackElements', type: 'USHORT'},
               {name: 'maxSizeOfInstructions', type: 'USHORT'},
               {name: 'maxComponentElements', type: 'USHORT'},
               {name: 'maxComponentDepth', type: 'USHORT'}
             ]
           }
        ]);
      });

    });

    it('has tableVersion', function() {
      expect(testTable.tableVersion).toEqual(jasmine.any(Number));
      expect(testTable.tableVersion).toEqual(parseFloat(maxpSpec.tableVersion.value, 16));
    });

    it('has numGlyphs', function() {
      expect(testTable.numGlyphs).toEqual(jasmine.any(Number));
      expect(testTable.numGlyphs).toEqual(parseInt(maxpSpec.numGlyphs.value, 10));
    });

    it('has maxPoints', function() {
      expect(testTable.maxPoints).toEqual(jasmine.any(Number));
      expect(testTable.maxPoints).toEqual(parseInt(maxpSpec.maxPoints.value, 10));
    });

    it('has maxContours', function() {
      expect(testTable.maxContours).toEqual(jasmine.any(Number));
      expect(testTable.maxContours).toEqual(parseInt(maxpSpec.maxContours.value, 10));
    });

    it('has maxCompositePoints', function() {
      expect(testTable.maxCompositePoints).toEqual(jasmine.any(Number));
      expect(testTable.maxCompositePoints).toEqual(parseInt(maxpSpec.maxCompositePoints.value, 10));
    });

    it('has maxCompositeContours', function() {
      expect(testTable.maxCompositeContours).toEqual(jasmine.any(Number));
      expect(testTable.maxCompositeContours).toEqual(parseInt(maxpSpec.maxCompositeContours.value, 10));
    });

    it('has maxTwilightPoints', function() {
      expect(testTable.maxTwilightPoints).toEqual(jasmine.any(Number));
      expect(testTable.maxTwilightPoints).toEqual(parseInt(maxpSpec.maxTwilightPoints.value, 10));
    });

    it('has maxStorage', function() {
      expect(testTable.maxStorage).toEqual(jasmine.any(Number));
      expect(testTable.maxStorage).toEqual(parseInt(maxpSpec.maxStorage.value, 10));
    });

    it('has maxFunctionDefs', function() {
      expect(testTable.maxFunctionDefs).toEqual(jasmine.any(Number));
      expect(testTable.maxFunctionDefs).toEqual(parseInt(maxpSpec.maxFunctionDefs.value, 10));
    });

    it('has maxInstructionDefs', function() {
      expect(testTable.maxInstructionDefs).toEqual(jasmine.any(Number));
      expect(testTable.maxInstructionDefs).toEqual(parseInt(maxpSpec.maxInstructionDefs.value, 10));
    });
  
    it('has maxStackElements', function() {
      expect(testTable.maxStackElements).toEqual(jasmine.any(Number));
      expect(testTable.maxStackElements).toEqual(parseInt(maxpSpec.maxStackElements.value, 10));
    });

    it('has maxFunctionDefs', function() {
      expect(testTable.maxFunctionDefs).toEqual(jasmine.any(Number));
      expect(testTable.maxFunctionDefs).toEqual(parseInt(maxpSpec.maxFunctionDefs.value, 10));
    });

     it('has maxInstructionDefs', function() {
      expect(testTable.maxInstructionDefs).toEqual(jasmine.any(Number));
      expect(testTable.maxInstructionDefs).toEqual(parseInt(maxpSpec.maxInstructionDefs.value, 10));
    });
  
    it('has maxSizeOfInstructions', function() {
      expect(testTable.maxSizeOfInstructions).toEqual(jasmine.any(Number));
      expect(testTable.maxSizeOfInstructions).toEqual(parseInt(maxpSpec.maxSizeOfInstructions.value, 10));
    });

    it('has maxComponentElements', function() {
      expect(testTable.maxComponentElements).toEqual(jasmine.any(Number));
      expect(testTable.maxComponentElements).toEqual(parseInt(maxpSpec.maxComponentElements.value, 10));
    });

    it('has maxComponentDepth', function() {
      expect(testTable.maxComponentDepth).toEqual(jasmine.any(Number));
      expect(testTable.maxComponentDepth).toEqual(parseInt(maxpSpec.maxComponentDepth.value, 10));
    });


  });

})(this);
