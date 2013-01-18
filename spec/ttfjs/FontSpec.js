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
 * @fileoverview Spec of core functions.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../src/Font.js') :
    global.ttfjs;
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../vendor/jdataview') :
    global.jDataView;

  // spec
  describe('ttfjs.Font', function() {

    var font = new ttfjs.Font();

    it('is Coonstructor', function() {
      expect(ttfjs.Font).toEqual(jasmine.any(Function));
      expect(font).toEqual(jasmine.any(ttfjs.Font));
    });

    /* Members */
    it('has format string', function() {
      expect(font.format).toEqual('');
    });

    it('has sfntHeader', function() {
      expect(font.sfntHeader).toEqual(null);
    });

    it('has tableDirectory', function() {
      expect(font.tableDirectory).toEqual(jasmine.any(Array));
    });

    /* Class Method */
    describe('ttfjs.Font.createFromBuffer()', function() {

      it('is method.', function() {
        expect(ttfjs.Font.createFromBuffer).toEqual(jasmine.any(Function));
      });

      // TODO(ynakajima): Add spec.

    });

    /* Methods */
    it('has getGlyph method and throws an exception', function() {
      expect(font.getGlyph).toEqual(jasmine.any(Function));
      expect(function() {
        font.getGlyph();
      }).toThrow('error: This is a Interface. Override this.');
    });

    it('has getGlyphList method and throws an exception', function() {
      expect(font.getGlyphList).toEqual(jasmine.any(Function));
      expect(function() {
        font.getGlyphList();
      }).toThrow('error: This is a Interface. Override this.');
    });

    it('has getRevision method and throws an exception', function() {
      expect(font.getRevision).toEqual(jasmine.any(Function));
      expect(function() {
        font.getRevision();
      }).toThrow('error: This is a Interface. Override this.');
    });

    it('has getUnitsPerEm method and throws an exception', function() {
      expect(font.getUnitsPerEm).toEqual(jasmine.any(Function));
      expect(function() {
        font.getUnitsPerEm();
      }).toThrow('error: This is a Interface. Override this.');
    });

    it('has getCreatedDate method and throws an exception', function() {
      expect(font.getCreatedDate).toEqual(jasmine.any(Function));
      expect(function() {
        font.getCreatedDate();
      }).toThrow('error: This is a Interface. Override this.');
    });

    it('has getModifiedDate method and throws an exception', function() {
      expect(font.getModifiedDate).toEqual(jasmine.any(Function));
      expect(function() {
        font.getModifiedDate();
      }).toThrow('error: This is a Interface. Override this.');
    });

  });

})(this);
