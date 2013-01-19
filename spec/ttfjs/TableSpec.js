/**
 * @license Released under the MIT license.
 *
 * <pre>
 * Copyright (c) 2013 ynakajima <yuhta.nakajima@gmail.com>
 *
 * Includes zocial-regular-webfont.ttf
 * https://github.com/samcollins/css-social-buttons/
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
 * @fileoverview Spec of Table Class.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../src/Table.js') :
    global.ttfjs;

  // spec
  describe('ttfjs.Table', function() {

    it('is Coonstructor', function() {
      expect(ttfjs.Table).toEqual(jasmine.any(Function));
    });

    describe('ttfjs.Table.createFromDataView()', function() {

      it('is method.', function() {
        expect(ttfjs.Table.createFromDataView).toEqual(jasmine.any(Function));
      });

      it('throw err.', function() {
        expect(ttfjs.Table.createFromDataView).toThrow();
      });

    });

    describe('ttfjs.Table.isRequired()', function() {

      var table = new ttfjs.Table();

      it('is method', function() {
        expect(table.isRequired).toEqual(jasmine.any(Function));
      });

      it('default value is false', function() {
        expect(table.isRequired()).toEqual(false);
      });

    });

    describe('ttfjs.Table.LONG_NAME_LIST', function() {

      it('is Object', function() {
        expect(ttfjs.Table.LONG_NAME_LIST).toEqual(jasmine.any(Object));
      });

      it('has cmap that value is "CMap"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['cmap']).toEqual('CMap');
      });

      it('has glyf that value is "GlyphData"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['glyf']).toEqual('GlyphData');
      });

      it('has head that value is "FontHeader"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['head']).toEqual('FontHeader');
      });

      it('has hhea that value is "HorizontalHeader"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['hhea']).toEqual('HorizontalHeader');
      });

      it('has hmtx that value is "HorizontalMetrics"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['hmtx']).toEqual('HorizontalMetrics');
      });

      it('has loca that value is "IndexToLocation"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['loca']).toEqual('IndexToLocation');
      });

      it('has maxp that value is "MaximumProfile"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['maxp']).toEqual('MaximumProfile');
      });

      it('has name that value is "Naming"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['name']).toEqual('Naming');
      });

      it('has post that value is "PostScriptInformation"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['post']).toEqual('PostScriptInformation');
      });

      it('has OS/2 that value is "PostScriptInformation"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['OS/2']).toEqual('OS2SpecificMetrics');
      });

      it('has cvt that value is "ControlValue"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['cvt ']).toEqual('ControlValue');
      });

      it('has EBDT that value is "EmbeddedBitmapData"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['EBDT']).toEqual('EmbeddedBitmapData');
      });

      it('has EBLC that value is "EmbeddedBitmapLocation"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['EBLC']).toEqual('EmbeddedBitmapLocation');
      });

      it('has EBSC that value is "EmbeddedBitmapScaling"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['EBSC']).toEqual('EmbeddedBitmapScaling');
      });

      it('has fpgm that value is "FontProgram"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['fpgm']).toEqual('FontProgram');
      });

      it('has gasp that value is "GridFittingScanConversion"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['gasp']).toEqual('GridFittingScanConversion');
      });

      it('has hdmx that value is "HoriontalDeviceMetrics"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['hdmx']).toEqual('HoriontalDeviceMetrics');
      });

      it('has kern that value is "Kerning"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['kern']).toEqual('Kerning');
      });

      it('has LTSH that value is "LinearThresholdData"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['LTSH']).toEqual('LinearThresholdData');
      });

      it('has prep that value is "CVTProgram"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['prep']).toEqual('CVTProgram');
      });

      it('has PCLT that value is "PCL5Data"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['PCLT']).toEqual('PCL5Data');
      });

      it('has VDMX that value is "VerticalDeviceMetrics"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['VDMX']).toEqual('VerticalDeviceMetrics');
      });

      it('has vhea that value is "VerticalMetricsHeader"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['vhea']).toEqual('VerticalMetricsHeader');
      });

      it('has vmtx that value is "VerticalMetrics"', function() {
        expect(ttfjs.Table.LONG_NAME_LIST['vmtx']).toEqual('VerticalMetrics');
      });


    });

  });

})(this);
