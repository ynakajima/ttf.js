fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../coffee/TTFDataView'
TrueType = require '../../coffee/TrueType'

ttf1 = TrueType.createFromTTFDataView new TTFDataView new jDataView fs.readFileSync __dirname + '/../resources/SourceCodePro-Medium.ttf'
ttf1TableDirectory = JSON.parse """
[
  {"tag": "BASE", "checkSum":"8b1994b1", "offset":111904, "length":58},
  {"tag": "DSIG", "checkSum":"ffc3b7a7", "offset":111964, "len":8280},
  {"tag": "GDEF", "checkSum":"32a13361", "offset":106600, "length":224},
  {"tag": "GPOS", "checkSum":"33aace14", "offset":106824, "length":2210},
  {"tag": "GSUB", "checkSum":"e048f4cb", "offset":109036, "length":2866},
  {"tag": "OS/2", "checkSum":"7318d0b4", "offset":440, "length":96},
  {"tag": "cmap", "checkSum":"ecf6c912", "offset":4396, "length":2592},
  {"tag": "cvt ", "checkSum":"00cd0b81", "offset":7428, "length":34},
  {"tag": "fpgm", "checkSum":"06599c37", "offset":6988, "length":371},
  {"tag": "gasp", "checkSum":"ffff0003", "offset":106592, "length":8},
  {"tag": "glyf", "checkSum":"3da4de32", "offset":9396, "length":73236},
  {"tag": "head", "checkSum":"fbdbf913", "offset":316, "length":54},
  {"tag": "hhea", "checkSum":"066e04a3", "offset":372, "length":36},
  {"tag": "hmtx", "checkSum":"d3b645f7", "offset":536, "length":3860},
  {"tag": "loca", "checkSum":"4bbf9342", "offset":7464, "length":1932},
  {"tag": "maxp", "checkSum":"05e90231", "offset":408, "length":32},
  {"tag": "name", "checkSum":"d228dcd6", "offset":82632, "length":15676},
  {"tag": "post", "checkSum":"844804a9", "offset":98308, "length":8284},
  {"tag": "prep", "checkSum":"28b81ab0", "offset":7360, "length":65}
]
"""

exports.TrueTypeTest =
  
  'test TrueType is Constructor': (test) ->
    test.strictEqual typeof TrueType, 'function'
    test.done()

exports.TrueType_createFromTTFDataView =
  
  'TrueTypecreateFromTTFDataView is function': (test) ->
    test.strictEqual typeof TrueType.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof TrueType
    test.done()

  'test TrueType#version': (test) ->
    test.strictEqual ttf1.version, 1.0
    test.done()

  'test TrueType#numTables': (test) ->
    test.strictEqual ttf1.numTables, 19
    test.done()

  'test TrueType#searchRange': (test) ->
    test.strictEqual ttf1.searchRange, 256
    test.done()

  'test TrueType#entrySelector': (test) ->
    test.strictEqual ttf1.entrySelector, 4
    test.done()

  'test TrueType#rangeShift': (test) ->
    test.strictEqual ttf1.rangeShift, 48
    test.done()

  'test TrueType#tableDirectory': (test) ->
    test.ok ttf1.tableDirectory instanceof Array
    for table, i in ttf1TableDirectory
      _table = ttf1.tableDirectory[i]
      test.ok _table.tag, table.tag
      test.ok _table.checkSum, table.checkSum
      test.ok _table.length, table.length
    test.done()
