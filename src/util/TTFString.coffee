# # ttf.js - JavaScript TrueType Font library
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

# TTFString Class
class TTFString

  @codePointAt: (string, position) ->
    string = String(string)
    size = string.length

    # ToInteger
    index = if typeof position != 'undefined' then Number(position)  else 0
    if isNaN(index)
      index = 0

    # Account for out-of-bounds indices:
    if index < 0 || index >= size
      return undefined

    # Get the first code unit
    first = string.charCodeAt(index)
    second = undefined

    # check if it’s the start of a surrogate pair
    if first >= 0xD800 && first <= 0xDBFF && size > index + 1
      second = string.charCodeAt(index + 1)
      if second >= 0xDC00 && second <= 0xDFFF # low surrogate
        # http:#mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000
    return first
  
# exports
module.exports = TTFString
