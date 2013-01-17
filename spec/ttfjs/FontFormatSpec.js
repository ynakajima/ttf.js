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
 * @fileoverview Spec of FontFormat.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var FontFormat = (typeof require !== 'undefined') ?
    require('../../src/FontFormat.js').FontFormat :
    global.ttfjs.FontFormat;
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../vendor/jdataview') :
    global.jDataView;

  // create buffer
  var ttfFileBuffer = jDataView.createBuffer(
    0x00, 0x01, 0x00, 0x00 // 0x000100
  );
  var ttfMacOSFileBuffer = jDataView.createBuffer(
    0x74, 0x72, 0x75, 0x65 // 'true'
  );
  var cffFileBuffer = jDataView.createBuffer(
    0x4f, 0x54, 0x54, 0x4f // 'OTTO'
  );
  var ttcFileBuffer = jDataView.createBuffer(
    0x74, 0x74, 0x63, 0x66 // 'tccf'
  );

  // spec
  describe('ttfjs.FontFormat', function() {

    it('is Constructor', function() {
      expect(FontFormat).toEqual(jasmine.any(Function));
    });

    it('should be able to identify the TrueType Font Format', function() {
      expect(FontFormat.isTTF).toEqual(jasmine.any(Function));
      expect(FontFormat.isTTF(ttfFileBuffer)).toBe(true);
      expect(FontFormat.isTTF(ttfMacOSFileBuffer)).toBe(true);
      expect(FontFormat.isTTF(cffFileBuffer)).toBe(false);
      expect(FontFormat.isTTF(ttcFileBuffer)).toBe(false);
    });

    it('should be able to identify the TrueType Font Format' +
       'for the Mac OS', function() {
      expect(FontFormat.isMacTTF).toEqual(jasmine.any(Function));
      expect(FontFormat.isMacTTF(ttfFileBuffer)).toBe(false);
      expect(FontFormat.isMacTTF(ttfMacOSFileBuffer)).toBe(true);
      expect(FontFormat.isMacTTF(cffFileBuffer)).toBe(false);
      expect(FontFormat.isMacTTF(ttcFileBuffer)).toBe(false);
    });

    it('should be able to identify the TrueType Font Format' +
       'for Windows', function() {
      expect(FontFormat.isWinTTF).toEqual(jasmine.any(Function));
      expect(FontFormat.isWinTTF(ttfFileBuffer)).toBe(true);
      expect(FontFormat.isWinTTF(ttfMacOSFileBuffer)).toBe(false);
      expect(FontFormat.isWinTTF(cffFileBuffer)).toBe(false);
      expect(FontFormat.isWinTTF(ttcFileBuffer)).toBe(false);
    });

    it('should be able to identify the Compact Font Format', function() {
      expect(FontFormat.isCFF).toEqual(jasmine.any(Function));
      expect(FontFormat.isCFF(ttfFileBuffer)).toBe(false);
      expect(FontFormat.isCFF(ttfMacOSFileBuffer)).toBe(false);
      expect(FontFormat.isCFF(cffFileBuffer)).toBe(true);
      expect(FontFormat.isCFF(ttcFileBuffer)).toBe(false);
    });

    it('should be able to identify the TrueTypeCollection Format', function() {
      expect(FontFormat.isTTC).toEqual(jasmine.any(Function));
      expect(FontFormat.isTTC(ttfFileBuffer)).toBe(false);
      expect(FontFormat.isTTC(ttfMacOSFileBuffer)).toBe(false);
      expect(FontFormat.isTTC(cffFileBuffer)).toBe(false);
      expect(FontFormat.isTTC(ttcFileBuffer)).toBe(true);
    });

  });

})(this);
