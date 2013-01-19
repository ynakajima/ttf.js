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
 * @fileoverview Spec of TableDirectoryEntry.
 * @author yuhta.nakajima@gmail.com (ynakajima)
 */
(function(global) {

  // require
  var ttfjs = (typeof require !== 'undefined') ?
    require('../../src/TableDirectoryEntry.js') :
    global.ttfjs;
  ttfjs.util = (typeof require !== 'undefined') ?
    require('../../src/util/TTFDataView.js').util :
    global.ttfjs.util;
  var jDataView = (typeof global.jDataView === 'undefined') ?
    require('../../vendor/jdataview') :
    global.jDataView;

  // create buffer (Fragment of zocial-regular-webfont.ttf)
  /**
   * zocial-regular-webfont.ttf
   * https://github.com/samcollins/css-social-buttons/
   * Under MIT License
   */
  var tableDirectoryBuffer = jDataView.createBuffer(
    '0x63', '0x76', '0x74', '0x20', // tag: cvt
    '0x08', '0xB1', '0x08', '0x6A', // checksum: 08b1086a
    '0x00', '0x00', '0x00', '0x74', // offset: 116
    '0x00', '0x00', '0x00', '0x46', // len: 70

    '0x68', '0x68', '0x65', '0x61', // tag: hhea
    '0x08', '0xFB', '0x05', '0x1F', // checksum: 08fb051f
    '0x00', '0x00', '0x00', '0x30', // offset: 48
    '0x00', '0x00', '0x00', '0x24', // len: 36

    '0x6D', '0x61', '0x78', '0x70', // tag: maxp
    '0x01', '0xBB', '0x03', '0x33', // checksum: 01bb0333
    '0x00', '0x00', '0x00', '0x54', // offset: 84
    '0x00', '0x00', '0x00', '0x20', // len: 32

    // hhea
    '0x00', '0x01', '0x00', '0x00', '0x03', '0xC4', '0xFF', '0x1A',
    '0x00', '0x00', '0x05', '0x7F', '0xFF', '0xC1', '0xFF', '0xF6',
    '0x05', '0x73', '0x00', '0x01', '0x00', '0x00', '0x00', '0x00',
    '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00',
    '0x00', '0x00', '0x00', '0x8F',

    // maxp
    '0x00', '0x01', '0x00', '0x00', '0x00', '0x8F', '0x00', '0xFE',
    '0x00', '0x14', '0x00', '0x00', '0x00', '0x00', '0x00', '0x02',
    '0x00', '0x01', '0x00', '0x02', '0x00', '0x16', '0x00', '0x00',
    '0x01', '0x00', '0x02', '0x31', '0x00', '0x00', '0x00', '0x00',

    // cvt
    '0x00', '0x12', '0x01', '0xFE', '0x02', '0x21', '0x00', '0x26',
    '0x00', '0xBF', '0x00', '0x30', '0x00', '0x38', '0x00', '0x43',
    '0x00', '0x53', '0x00', '0x59', '0x00', '0x60', '0x00', '0x64',
    '0x00', '0x6C', '0x00', '0xAD', '0x00', '0x1C', '0x00', '0x26',
    '0x00', '0xDE', '0x00', '0x2C', '0x00', '0x34', '0x00', '0x3B',
    '0x00', '0x5A', '0x00', '0x64', '0x00', '0x6C', '0x00', '0x8E',
    '0x00', '0xA8', '0x00', '0xC0', '0x00', '0x1C', '0x00', '0xFB',
    '0x00', '0x7D', '0x00', '0x49', '0x00', '0x74', '0x00', '0x21',
    '0x00', '0x6A', '0x00', '0xC5', '0x00', '0x55', '0x00', '0x00'
  );
  var view = new ttfjs.util.TTFDataView(new jDataView(tableDirectoryBuffer));

  var tableDirectoryData = {
    'cvt ': {'checksum': '08b1086a', 'offset': 116, 'len': 70},
    'hhea': {'checksum': '08fb051f', 'offset': 48, 'len': 36},
    'maxp': {'checksum': '01bb0333', 'offset': 84, 'len': 32}
  };

  // spec
  describe('ttfjs.TableDirectoryEntry', function() {


    it('is Coonstructor', function() {
      expect(ttfjs.TableDirectoryEntry).toEqual(jasmine.any(Function));
    });

    describe('ttfjs.TableDirectoryEntry.createFromDataView()', function() {

      it('is Function', function() {
        expect(ttfjs.TableDirectoryEntry.createFromDataView).toEqual(jasmine.any(Function));
      });

      it('can create an instance of the TableDirectoryEntry from the buffer of the font.', function() {
        expect(ttfjs.TableDirectoryEntry.createFromDataView(view, 16)).toEqual(jasmine.any(ttfjs.TableDirectoryEntry));
      });

      it('returns a null when passed as an argument to something other than jDataView.', function() {
        expect(ttfjs.TableDirectoryEntry.createFromDataView({}, 16)).
          toBeNull();
      });

    });

    var cvt = ttfjs.TableDirectoryEntry.createFromDataView(view, 0);
    var hhea = ttfjs.TableDirectoryEntry.createFromDataView(view, 16);
    var maxp = ttfjs.TableDirectoryEntry.createFromDataView(view, 32);

    describe('ttfjs.TableDirectoryEntry.getTag()', function() {

      it('is method.', function() {
        expect(hhea.getTag).toEqual(jasmine.any(Function));
      });

      it('returns the tag name.', function() {
        expect(hhea.getTag()).toEqual('hhea');
        expect(maxp.getTag()).toEqual('maxp');
        expect(cvt.getTag()).toEqual('cvt ');
      });

    });

    describe('ttfjs.TableDirectoryEntry.getChecksum()', function() {

      it('is method.', function() {
        expect(hhea.getChecksum).toEqual(jasmine.any(Function));
      });

      it('returns checksum for table.', function() {
        expect(hhea.getChecksum()).toEqual(tableDirectoryData['hhea'].checksum);
        expect(maxp.getChecksum()).toEqual(tableDirectoryData['maxp'].checksum);
        expect(cvt.getChecksum()).toEqual(tableDirectoryData['cvt '].checksum);
      });

    });

    describe('ttfjs.TableDirectoryEntry.getOffset()', function() {

      it('is method.', function() {
        expect(hhea.getOffset).toEqual(jasmine.any(Function));
      });

      it('returns offset from beginning of sfnt.', function() {
        expect(hhea.getOffset()).toEqual(tableDirectoryData['hhea'].offset);
        expect(maxp.getOffset()).toEqual(tableDirectoryData['maxp'].offset);
        expect(cvt.getOffset()).toEqual(tableDirectoryData['cvt '].offset);
      });

    });

    describe('ttfjs.TableDirectoryEntry.getLength()', function() {

      it('is method.', function() {
        expect(hhea.getLength).toEqual(jasmine.any(Function));
      });

      it('returns length of table in byte.', function() {
        expect(hhea.getLength()).toEqual(tableDirectoryData['hhea'].len);
        expect(maxp.getLength()).toEqual(tableDirectoryData['maxp'].len);
        expect(cvt.getLength()).toEqual(tableDirectoryData['cvt '].len);
      });

    });

    describe('ttfjs.TableDirectoryEntry.calcChecksum()', function() {

      it('is method.', function() {
        expect(hhea.calcChecksum).toEqual(jasmine.any(Function));
      });

      it('calculate checksum for table.', function() {
        expect(hhea.calcChecksum()).toEqual(tableDirectoryData['hhea'].checksum);
        expect(maxp.calcChecksum()).toEqual(tableDirectoryData['maxp'].checksum);
        expect(cvt.calcChecksum()).toEqual(tableDirectoryData['cvt '].checksum);
      });

    });


  });

})(this);
