fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/util/TTFDataView'
HheaTable = require '../../../src/table/HheaTable'

# test data
view = new TTFDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = HheaTable.createFromTTFDataView(view, 372)
json = require('../../resources/SourceCodePro/SourceCodePro-Medium.ttf.json').hhea
ttf1_json = HheaTable.createFromJSON(json)

# test
exports.HheaTableTest =
  
  'test HheaTable is Constructor': (test) ->
    test.strictEqual typeof HheaTable, 'function'
    head = new HheaTable()
    test.ok head instanceof HheaTable
    test.done()

exports.HheaTable_createFromTTFDataView =
  
  'HheaTable#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof HheaTable.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof HheaTable
    test.done()

  'HheaTable#createFromJSON() is function': (test) ->
    test.strictEqual typeof HheaTable.createFromJSON, 'function'
    test.ok ttf1_json instanceof HheaTable
    test.done()

  'test HheaTable#version': (test) ->
    test.strictEqual ttf1.version, 1.0, 'version'
    test.strictEqual ttf1_json.version, 1.0, 'version'
    test.done()

  'test HheaTable#ascender': (test) ->
    test.strictEqual ttf1.ascender, 984, 'ascender'
    test.strictEqual ttf1_json.ascender, 984, 'ascender'
    test.done()

  'test HheaTable#descender': (test) ->
    test.strictEqual ttf1.descender, -273, 'descender'
    test.strictEqual ttf1_json.descender, -273, 'descender'
    test.done()

  'test HheaTable#lineGap': (test) ->
    test.strictEqual ttf1.lineGap, 0, 'lineGap'
    test.strictEqual ttf1_json.lineGap, 0, 'lineGap'
    test.done()

  'test HheaTable#advanceWidthMax': (test) ->
    test.strictEqual ttf1.advanceWidthMax, 600, 'advanceWidthMax'
    test.strictEqual ttf1_json.advanceWidthMax, 600, 'advanceWidthMax'
    test.done()

  'test HheaTable#minLeftSideBearing': (test) ->
    test.strictEqual ttf1.minLeftSideBearing, -47, 'minLeftSideBearing'
    test.strictEqual ttf1_json.minLeftSideBearing, -47, 'minLeftSideBearing'
    test.done()

  'test HheaTable#minRightSideBearing': (test) ->
    test.strictEqual ttf1.minRightSideBearing, -106, 'minRightSideBearing'
    test.strictEqual ttf1_json.minRightSideBearing, -106, 'minRightSideBearing'
    test.done()

  'test HheaTable#xMaxExtent': (test) ->
    test.strictEqual ttf1.xMaxExtent, 706, 'xMaxExtent'
    test.strictEqual ttf1_json.xMaxExtent, 706, 'xMaxExtent'
    test.done()

  'test HheaTable#caretSlopeRise': (test) ->
    test.strictEqual ttf1.caretSlopeRise, 1, 'caretSlopeRise'
    test.strictEqual ttf1_json.caretSlopeRise, 1, 'caretSlopeRise'
    test.done()

  'test HheaTable#caretSlopeRun': (test) ->
    test.strictEqual ttf1.caretSlopeRun, 0, 'caretSlopeRun'
    test.strictEqual ttf1_json.caretSlopeRun, 0, 'caretSlopeRun'
    test.done()

  'test HheaTable#caretOffset': (test) ->
    test.strictEqual ttf1.caretOffset, 0, 'caretOffset'
    test.strictEqual ttf1_json.caretOffset, 0, 'caretOffset'
    test.done()

  'test HheaTable#reserved_0': (test) ->
    test.strictEqual ttf1.reserved_0, 0, 'reserved_0'
    test.strictEqual ttf1_json.reserved_0, 0, 'reserved_0'
    test.done()

  'test HheaTable#reserved_1': (test) ->
    test.strictEqual ttf1.reserved_1, 0, 'reserved_1'
    test.strictEqual ttf1_json.reserved_1, 0, 'reserved_1'
    test.done()

  'test HheaTable#reserved_2': (test) ->
    test.strictEqual ttf1.reserved_2, 0, 'reserved_2'
    test.strictEqual ttf1_json.reserved_2, 0, 'reserved_2'
    test.done()

  'test HheaTable#reserved_3': (test) ->
    test.strictEqual ttf1.reserved_3, 0, 'reserved_3'
    test.strictEqual ttf1_json.reserved_3, 0, 'reserved_3'
    test.done()

  'test HheaTable#metricDataFormat': (test) ->
    test.strictEqual ttf1.metricDataFormat, 0, 'metricDataFormat'
    test.strictEqual ttf1_json.metricDataFormat, 0, 'metricDataFormat'
    test.done()

  'test HheaTable#numberOfHMetrics': (test) ->
    test.strictEqual ttf1.numberOfHMetrics, 965, 'numberOfHMetrics'
    test.strictEqual ttf1_json.numberOfHMetrics, 965, 'numberOfHMetrics'
    test.done()

