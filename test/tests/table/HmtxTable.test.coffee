fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../../src/TTFDataView'
HmtxTable = require '../../../src/table/HmtxTable'
ttf1hmtx = require '../../resources/SourceCodePro/SourceCodePro-Medium.ttx.hmtx.json'

# test data
view = new TTFDataView fs.readFileSync __dirname + '/../../resources/SourceCodePro/SourceCodePro-Medium.ttf'
ttf1 = HmtxTable.createFromTTFDataView(view,
  536,
  {
    getNumGlyphs: () ->
      965
    maxp: {
      numGlyphs: 965
    }
    hhea: {
      numberOfHMetrics: 965
    }
  }
)

# test
exports.HmtxTable =
  
  'test LocaTable is Constructor': (test) ->
    test.strictEqual typeof HmtxTable, 'function'
    head = new HmtxTable()
    test.ok head instanceof HmtxTable
    test.done()

exports.HmtxTable_createFromTTFDataView =
  
  'HmtxTable#createFromTTFDataView() is function': (test) ->
    test.strictEqual typeof HmtxTable.createFromTTFDataView, 'function'
    test.ok ttf1 instanceof HmtxTable
    test.done()

  'test HmtxTable#hMetrics': (test) ->

    for mtx in ttf1hmtx.glyphOrder
      hmtx = ttf1.hMetrics[mtx.glyfIndex]
      test.equal hmtx.advanceWidth, mtx.width, 'width [' + mtx.glyfIndex + ']: ' + hmtx.advanceWidth + ' == ' + mtx.width
      test.equal hmtx.lsb, mtx.lsb, 'lsb [' + mtx.glyfIndex + ']: ' + hmtx.lsb + ' == ' + mtx.lsb
    
    test.done()

