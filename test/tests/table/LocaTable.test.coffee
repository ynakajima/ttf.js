fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../coffee/TTFDataView'
LocaTable = require '../../../coffee/table/LocaTable'
ttf1Loca = require '../../resources/SourceCodePro-Medium.loca.json'

# test data
view = new TTFDataView new jDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro-Medium.ttf'
ttf1 = LocaTable.createFromTTFDataView(view, 7464, 965, false)

# test
exports.LocaTable =
  
  'test LocaTable is Constructor': (test) ->
    test.strictEqual typeof LocaTable, 'function'
    head = new LocaTable()
    test.ok head instanceof LocaTable
    test.done()

exports.LocaTable_createFromTTFDataView =
  
  'LocaTable#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof LocaTable.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof LocaTable
    test.done()

  'test LocaTable#offsets': (test) ->
    test.deepEqual ttf1.offsets, ttf1Loca
    test.done()

