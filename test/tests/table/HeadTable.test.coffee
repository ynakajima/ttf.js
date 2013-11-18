fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/util/TTFDataView'
HeadTable = require '../../../src/table/HeadTable'

# test data
view = new TTFDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = HeadTable.createFromTTFDataView(view, 316)

json = require('../../resources/SourceCodePro/SourceCodePro-Medium.ttf.json').head
ttf1_json = HeadTable.createFromJSON(json)

# test
exports.HeadTableTest =
  
  'test HeadTable is Constructor': (test) ->
    test.strictEqual typeof HeadTable, 'function'
    head = new HeadTable()
    test.ok head instanceof HeadTable
    test.done()

exports.HeadTableTest_createFromTTFDataView =
  
  'HeadTable#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof HeadTable.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof HeadTable
    test.done()

  'HeadTable#createFromJSON() is function': (test) ->
    test.strictEqual typeof HeadTable.createFromJSON, 'function'
    test.ok ttf1_json instanceof HeadTable
    test.done()

  'test HeadTable#version': (test) ->
    test.strictEqual ttf1.version, 1
    test.strictEqual ttf1_json.version, 1
    test.done()

  'test HeadTable#fontRevision': (test) ->
    test.strictEqual ttf1.fontRevision, 1.017
    test.strictEqual ttf1_json.fontRevision, 1.017
    test.done()

  'test HeadTable#checkSumAdjustment': (test) ->
    test.strictEqual ttf1.checkSumAdjustment, '0x6d0bc4b5'
    test.strictEqual ttf1_json.checkSumAdjustment, '0x6d0bc4b5'
    test.done()

  'test HeadTable#magicNumber': (test) ->
    test.strictEqual ttf1.magicNumber, '0x5f0f3cf5'
    test.strictEqual ttf1_json.magicNumber, '0x5f0f3cf5'
    test.done()

  'test HeadTable#flags': (test) ->
    test.deepEqual ttf1.flags, [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    test.deepEqual ttf1_json.flags, [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    test.done()

  'test HeadTable#unitsPerEm': (test) ->
    test.strictEqual ttf1.unitsPerEm, 1000
    test.strictEqual ttf1_json.unitsPerEm, 1000
    test.done()

  'test HeadTable#created': (test) ->
    test.strictEqual ttf1.created.getTime(), Date.parse 'Fri Jan 11 19:57:01 2013'
    test.strictEqual ttf1_json.created.getTime(), Date.parse 'Fri Jan 11 19:57:01 2013'
    test.done()

  'test HeadTable#modified': (test) ->
    test.strictEqual ttf1.modified.getTime(), Date.parse 'Sat Jan 12 03:57:02 2013'
    test.strictEqual ttf1_json.modified.getTime(), Date.parse 'Sat Jan 12 03:57:02 2013'
    test.done()

  'test HeadTable#xMin': (test) ->
    test.strictEqual ttf1.xMin, -47
    test.strictEqual ttf1_json.xMin, -47
    test.done()

  'test HeadTable#yMin': (test) ->
    test.strictEqual ttf1.yMin, -400
    test.strictEqual ttf1_json.yMin, -400
    test.done()

  'test HeadTable#xMax': (test) ->
    test.strictEqual ttf1.xMax, 706
    test.strictEqual ttf1_json.xMax, 706
    test.done()

  'test HeadTable#yMax': (test) ->
    test.strictEqual ttf1.yMax, 1000
    test.strictEqual ttf1_json.yMax, 1000
    test.done()

  'test HeadTable#macStyle': (test) ->
    test.deepEqual ttf1.macStyle, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    test.deepEqual ttf1_json.macStyle, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    test.done()

  'test HeadTable#lowestRecPPEM': (test) ->
    test.strictEqual ttf1.lowestRecPPEM, 9
    test.strictEqual ttf1_json.lowestRecPPEM, 9
    test.done()

  'test HeadTable#fontDirectionHint': (test) ->
    test.strictEqual ttf1.fontDirectionHint, 2
    test.strictEqual ttf1_json.fontDirectionHint, 2
    test.done()

  'test HeadTable#indexToLocFormat': (test) ->
    test.strictEqual ttf1.indexToLocFormat, 0
    test.strictEqual ttf1_json.indexToLocFormat, 0
    test.done()

  'test HeadTable#glyphDataFormat': (test) ->
    test.strictEqual ttf1.glyphDataFormat, 0
    test.strictEqual ttf1_json.glyphDataFormat, 0
    test.done()

  'test HeadTable#isLocaLong()': (test) ->
    test.strictEqual ttf1.isLocaLong(), false
    test.strictEqual ttf1_json.isLocaLong(), false
    test.done()

