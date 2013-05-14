fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/TTFDataView'
HheaTable = require '../../../src/table/HheaTable'

# test data
view = new TTFDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = HheaTable.createFromTTFDataView(view, 372)

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

  'test HheaTable#version': (test) ->
    test.strictEqual ttf1.version, 1.0, 'version'
    test.done()

  'test HheaTable#ascender': (test) ->
    test.strictEqual ttf1.ascender, 984, 'ascender'
    test.done()

  'test HheaTable#descender': (test) ->
    test.strictEqual ttf1.descender, -273, 'descender'
    test.done()

  'test HheaTable#lineGap': (test) ->
    test.strictEqual ttf1.lineGap, 0, 'lineGap'
    test.done()

  'test HheaTable#advanceWidthMax': (test) ->
    test.strictEqual ttf1.advanceWidthMax, 600, 'advanceWidthMax'
    test.done()

  'test HheaTable#minLeftSideBearing': (test) ->
    test.strictEqual ttf1.minLeftSideBearing, -47, 'minLeftSideBearing'
    test.done()

  'test HheaTable#minRightSideBearing': (test) ->
    test.strictEqual ttf1.minRightSideBearing, -106, 'minRightSideBearing'
    test.done()

  'test HheaTable#xMaxExtent': (test) ->
    test.strictEqual ttf1.xMaxExtent, 706, 'xMaxExtent'
    test.done()

  'test HheaTable#caretSlopeRise': (test) ->
    test.strictEqual ttf1.caretSlopeRise, 1, 'caretSlopeRise'
    test.done()

  'test HheaTable#caretSlopeRun': (test) ->
    test.strictEqual ttf1.caretSlopeRun, 0, 'caretSlopeRun'
    test.done()

  'test HheaTable#caretOffset': (test) ->
    test.strictEqual ttf1.caretOffset, 0, 'caretOffset'
    test.done()

  'test HheaTable#reserved_0': (test) ->
    test.strictEqual ttf1.reserved_0, 0, 'reserved_0'
    test.done()

  'test HheaTable#reserved_1': (test) ->
    test.strictEqual ttf1.reserved_1, 0, 'reserved_1'
    test.done()

  'test HheaTable#reserved_2': (test) ->
    test.strictEqual ttf1.reserved_2, 0, 'reserved_2'
    test.done()

  'test HheaTable#reserved_3': (test) ->
    test.strictEqual ttf1.reserved_3, 0, 'reserved_3'
    test.done()

  'test HheaTable#metricDataFormat': (test) ->
    test.strictEqual ttf1.metricDataFormat, 0, 'metricDataFormat'
    test.done()

  'test HheaTable#numberOfHMetrics': (test) ->
    test.strictEqual ttf1.numberOfHMetrics, 965, 'numberOfHMetrics'
    test.done()

