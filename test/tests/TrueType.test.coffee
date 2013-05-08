fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../coffee/TTFDataView'
TrueType = require '../../coffee/TrueType'
HeadTable = require '../../coffee/table/HeadTable'
MaxpTable = require '../../coffee/table/MaxpTable'

# test data
ttf = new TrueType()
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
macTTF = TrueType.createFromTTFDataView new TTFDataView new jDataView jDataView.createBuffer 0x74, 0x72, 0x75, 0x65, # true
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

ttcf = TrueType.createFromTTFDataView new TTFDataView new jDataView jDataView.createBuffer 0x74, 0x74, 0x63, 0x66, # ttcf
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

otto = TrueType.createFromTTFDataView new TTFDataView new jDataView jDataView.createBuffer 0x4f, 0x54, 0x54, 0x4f, # OTTO
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0


# test
exports.TrueTypeTest =
  
  'test TrueType is Constructor': (test) ->
    test.strictEqual typeof TrueType, 'function'
    test.strictEqual ttf.sfntVersion, 0
    test.strictEqual ttf.numTables, 0
    test.strictEqual ttf.searchRange, 0
    test.strictEqual ttf.entrySelector, 0
    test.strictEqual ttf.rangeShift, 0
    test.ok ttf.tableDirectory instanceof Array
    test.strictEqual ttf.tableDirectory.length, 0
    test.done()

exports.TrueType_createFromTTFDataView =
  
  'TrueTypecreateFromTTFDataView is function': (test) ->
    test.strictEqual typeof TrueType.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof TrueType
    test.done()

  'test TrueType#sfntVersion': (test) ->
    test.strictEqual ttf1.sfntVersion, 1.0
    test.strictEqual macTTF.sfntVersion, 'true'
    test.strictEqual ttcf.sfntVersion, 'ttcf'
    test.strictEqual otto.sfntVersion, 'OTTO'
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

  'test TrueType#isMacTTF()': (test) ->
    test.equal typeof ttf1.isMacTTF, 'function'
    test.equal ttf1.isMacTTF(), false
    test.equal macTTF.isMacTTF(), true
    test.equal ttcf.isMacTTF(), false
    test.equal otto.isMacTTF(), false
    test.done()

  'test TrueType#isWinTTF()': (test) ->
    test.equal typeof ttf1.isWinTTF, 'function'
    test.equal ttf1.isWinTTF(), true
    test.equal macTTF.isWinTTF(), false
    test.equal ttcf.isWinTTF(), false
    test.equal otto.isWinTTF(), false
    test.done()

  'test TrueType#isTTCF()': (test) ->
    test.equal typeof ttf1.isTTCF, 'function'
    test.equal ttf1.isTTCF(), false
    test.equal macTTF.isTTCF(), false
    test.equal ttcf.isTTCF(), true
    test.equal otto.isTTCF(), false
    test.done()

  'test TrueType#isTTF()': (test) ->
    test.equal typeof ttf1.isTTF, 'function'
    test.equal ttf1.isTTF(), true
    test.equal macTTF.isTTF(), true
    test.equal ttcf.isTTF(), true
    test.equal otto.isTTF(), false
    test.done()

  'test TrueType#isOTTO()': (test) ->
    test.equal typeof ttf1.isOTTO, 'function'
    test.equal ttf1.isOTTO(), false
    test.equal macTTF.isOTTO(), false
    test.equal ttcf.isOTTO(), false
    test.equal otto.isOTTO(), true
    test.done()

  'test TrueType#isCFF()': (test) ->
    test.equal typeof ttf1.isCFF, 'function'
    test.equal ttf1.isCFF(), false
    test.equal macTTF.isCFF(), false
    test.equal ttcf.isCFF(), false
    test.equal otto.isCFF(), true
    test.done()

  'test TrueType#head': (test) ->
    test.ok ttf.head instanceof HeadTable
    test.ok ttf1.head instanceof HeadTable
    test.strictEqual ttf.head.version, 0
    test.strictEqual ttf1.head.version, 1
    test.done()

  'test TrueType#maxp': (test) ->
    test.ok ttf.maxp instanceof MaxpTable
    test.ok ttf1.maxp instanceof MaxpTable
    test.strictEqual ttf.maxp.version, 0
    test.strictEqual ttf1.maxp.version, 1
    test.done()


