fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/util/TTFDataView'
MaxpTable = require '../../../src/table/MaxpTable'

# test data
view = new TTFDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = MaxpTable.createFromTTFDataView(view, 408)
json = require('../../resources/SourceCodePro/SourceCodePro-Medium.ttf.json').maxp
ttf1_json = MaxpTable.createFromJSON(json)


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

  'MaxpTable#createFromJSON() is function': (test) ->
    test.strictEqual typeof MaxpTable.createFromJSON, 'function'
    test.ok ttf1_json instanceof MaxpTable
    test.done()

  'test MaxpTable#version': (test) ->
    test.strictEqual ttf1.version, 1
    test.strictEqual ttf1_json.version, 1
    test.done()

  'test MaxpTable#numGlyphs': (test) ->
    test.strictEqual ttf1.numGlyphs, 965
    test.strictEqual ttf1_json.numGlyphs, 965
    test.done()

  'test MaxpTable#maxPoints': (test) ->
    test.strictEqual ttf1.maxPoints, 82
    test.strictEqual ttf1_json.maxPoints, 82
    test.done()

  'test MaxpTable#maxContours': (test) ->
    test.strictEqual ttf1.maxContours, 16
    test.strictEqual ttf1_json.maxContours, 16
    test.done()

  'test MaxpTable#maxCompositPoints': (test) ->
    test.strictEqual ttf1.maxCompositPoints, 106
    test.strictEqual ttf1_json.maxCompositPoints, 106
    test.done()

  'test MaxpTable#maxCompositContours': (test) ->
    test.strictEqual ttf1.maxCompositContours, 6
    test.strictEqual ttf1_json.maxCompositContours, 6
    test.done()

  'test MaxpTable#maxZones': (test) ->
    test.strictEqual ttf1.maxZones, 1
    test.strictEqual ttf1_json.maxZones, 1
    test.done()

  'test MaxpTable#maxTwilightPoints': (test) ->
    test.strictEqual ttf1.maxTwilightPoints, 0
    test.strictEqual ttf1_json.maxTwilightPoints, 0
    test.done()

  'test MaxpTable#maxStorage': (test) ->
    test.strictEqual ttf1.maxStorage, 0
    test.strictEqual ttf1_json.maxStorage, 0
    test.done()

  'test MaxpTable#maxFunctionDefs': (test) ->
    test.strictEqual ttf1.maxFunctionDefs, 10
    test.strictEqual ttf1_json.maxFunctionDefs, 10
    test.done()

  'test MaxpTable#maxInstructionDefs': (test) ->
    test.strictEqual ttf1.maxInstructionDefs, 0
    test.strictEqual ttf1_json.maxInstructionDefs, 0
    test.done()

  'test MaxpTable#maxStackElements': (test) ->
    test.strictEqual ttf1.maxStackElements, 512
    test.strictEqual ttf1_json.maxStackElements, 512
    test.done()

  'test MaxpTable#maxSizeOfInstructions': (test) ->
    test.strictEqual ttf1.maxSizeOfInstructions, 371
    test.strictEqual ttf1_json.maxSizeOfInstructions, 371
    test.done()

  'test MaxpTable#maxComponentElements': (test) ->
    test.strictEqual ttf1.maxComponentElements, 3
    test.strictEqual ttf1_json.maxComponentElements, 3
    test.done()

  'test MaxpTable#maxComponentDepth': (test) ->
    test.strictEqual ttf1.maxComponentDepth, 1
    test.strictEqual ttf1_json.maxComponentDepth, 1
    test.done()
  
