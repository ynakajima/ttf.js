fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/TTFDataView'
MaxpTable = require '../../../src/table/MaxpTable'

# test data
view = new TTFDataView new jDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = MaxpTable.createFromTTFDataView(view, 408)

# test
exports.MaxpTableTest =
  
  'test MaxpTable is Constructor': (test) ->
    test.strictEqual typeof MaxpTable, 'function'
    head = new MaxpTable()
    test.ok head instanceof MaxpTable
    test.done()

exports.MaxpTable_createFromTTFDataView =
  
  'MaxpTable#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof MaxpTable.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof MaxpTable
    test.done()

  'test MaxpTable#version': (test) ->
    test.strictEqual ttf1.version, 1
    test.done()

  'test MaxpTable#numGlyphs': (test) ->
    test.strictEqual ttf1.numGlyphs, 965
    test.done()

  'test MaxpTable#maxPoints': (test) ->
    test.strictEqual ttf1.maxPoints, 82
    test.done()

  'test MaxpTable#maxContours': (test) ->
    test.strictEqual ttf1.maxContours, 16
    test.done()

  'test MaxpTable#maxCompositPoints': (test) ->
    test.strictEqual ttf1.maxCompositPoints, 106
    test.done()

  'test MaxpTable#maxCompositContours': (test) ->
    test.strictEqual ttf1.maxCompositContours, 6
    test.done()

  'test MaxpTable#maxZones': (test) ->
    test.strictEqual ttf1.maxZones, 1
    test.done()

  'test MaxpTable#maxTwilightPoints': (test) ->
    test.strictEqual ttf1.maxTwilightPoints, 0
    test.done()

  'test MaxpTable#maxStorage': (test) ->
    test.strictEqual ttf1.maxStorage, 0
    test.done()

  'test MaxpTable#maxFunctionDefs': (test) ->
    test.strictEqual ttf1.maxFunctionDefs, 10
    test.done()

  'test MaxpTable#maxInstructionDefs': (test) ->
    test.strictEqual ttf1.maxInstructionDefs, 0
    test.done()

  'test MaxpTable#maxStackElements': (test) ->
    test.strictEqual ttf1.maxStackElements, 512
    test.done()

  'test MaxpTable#maxSizeOfInstructions': (test) ->
    test.strictEqual ttf1.maxSizeOfInstructions, 371
    test.done()

  'test MaxpTable#maxComponentElements': (test) ->
    test.strictEqual ttf1.maxComponentElements, 3
    test.done()

  'test MaxpTable#maxComponentDepth': (test) ->
    test.strictEqual ttf1.maxComponentDepth, 1
    test.done()
  
