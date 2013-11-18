#
# Copyright (C) 2013 by ynakajima (https://github.com/ynakajima)
#
# Released under the MIT license.
#
# Copyright Mathias Bynens <http:#mathiasbynens.be/>
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
# 
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

ttfjs = require('../../../src/ttfjs')
TTFString = ttfjs.util.TTFString

exports.TTFStringTest =

  'test TTFString is Constructor': (test) ->
     test.ok typeof TTFString is 'function'
     test.done()

exports.TTFStringTest_codePointAt =

  'test TTFString.codePointAt is Function': (test) ->
    test.ok typeof TTFString.codePointAt is 'function'
    test.done()

  'test String that starts with a BMP symbol' : (test) ->
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', ''), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', '_'), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', ), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', -Infinity), undefined
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', -1), undefined
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', -0), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', 0), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', 3), 0x1D306
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', 4), 0xDF06
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', 5), 0x64
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', 42), undefined
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', Infinity), undefined
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', Infinity), undefined
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', NaN), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', false), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', null), 0x61
    test.equal TTFString.codePointAt('abc\uD834\uDF06def', undefined), 0x61
    test.done()

  'test String that starts with an astral symbol' : (test) ->
    test.equal TTFString.codePointAt('\uD834\uDF06def', ''), 0x1D306
    test.equal TTFString.codePointAt('\uD834\uDF06def', '1'), 0xDF06
    test.equal TTFString.codePointAt('\uD834\uDF06def', '_'), 0x1D306
    test.equal TTFString.codePointAt('\uD834\uDF06def', ), 0x1D306
    test.equal TTFString.codePointAt('\uD834\uDF06def', -1), undefined
    test.equal TTFString.codePointAt('\uD834\uDF06def', -0), 0x1D306
    test.equal TTFString.codePointAt('\uD834\uDF06def', 0), 0x1D306
    test.equal TTFString.codePointAt('\uD834\uDF06def', 1), 0xDF06
    test.equal TTFString.codePointAt('\uD834\uDF06def', 42), undefined
    test.equal TTFString.codePointAt('\uD834\uDF06def', false), 0x1D306
    test.equal TTFString.codePointAt('\uD834\uDF06def', null), 0x1D306
    test.equal TTFString.codePointAt('\uD834\uDF06def', undefined), 0x1D306
    test.done()

  'test Lone high surrogates' : (test) ->
    test.equal TTFString.codePointAt('\uD834abc', ''), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', '_'), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', ), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', -1), undefined
    test.equal TTFString.codePointAt('\uD834abc', -0), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', 0), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', false), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', NaN), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', null), 0xD834
    test.equal TTFString.codePointAt('\uD834abc', undefined), 0xD834
    test.done()

  'test Lone low surrogates' : (test) ->
    test.equal TTFString.codePointAt('\uDF06abc', ''), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', '_'), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', ), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', -1), undefined
    test.equal TTFString.codePointAt('\uDF06abc', -0), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', 0), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', false), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', NaN), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', null), 0xDF06
    test.equal TTFString.codePointAt('\uDF06abc', undefined), 0xDF06
    test.done()

exports.TTFStringTest_fromCodePoint =

  'test TTFString.fromCodePointf is Function': (test) ->
    test.ok typeof TTFString.fromCodePoint is 'function'
    test.done()

  'test TTFString.fromCodePoint' : (test) ->
    test.equal TTFString.fromCodePoint(''), '\0'
    test.equal TTFString.fromCodePoint(), ''
    test.equal TTFString.fromCodePoint(-0), '\0'
    test.equal TTFString.fromCodePoint(0), '\0'
    test.equal TTFString.fromCodePoint(0x1D306), '\uD834\uDF06'
    test.equal TTFString.fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07'
    test.equal TTFString.fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07'
    test.equal TTFString.fromCodePoint(false), '\0'
    test.equal TTFString.fromCodePoint(null), '\0'
    test.done()

  'test TTFSrting.fromCodePoint Throw RangeError' : (test) ->
    test.throws( (-> TTFString.fromCodePoint('_')), RangeError)
    test.throws( (-> TTFString.fromCodePoint('+Infinity')), RangeError)
    test.throws( (-> TTFString.fromCodePoint('-Infinity')), RangeError)
    test.throws( (-> TTFString.fromCodePoint(-1)), RangeError)
    test.throws( (-> TTFString.fromCodePoint(0x10FFFF + 1)), RangeError)
    test.throws( (-> TTFString.fromCodePoint(3.14)), RangeError)
    test.throws( (-> TTFString.fromCodePoint(3e-2)), RangeError)
    test.throws( (-> TTFString.fromCodePoint(Infinity)), RangeError)
    test.throws( (-> TTFString.fromCodePoint(NaN)), RangeError)
    test.throws( (-> TTFString.fromCodePoint(undefined)), RangeError)
    test.throws( (-> TTFString.fromCodePoint({})), RangeError)
    test.done()
