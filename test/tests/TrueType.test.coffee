fs = require 'fs'
jDataView = require 'jdataview'
TTFDataView = require '../../coffee/TTFDataView'
TrueType = require '../../coffee/TrueType'

ttf1 = new TTFDataView new jDataView fs.readFileSync __dirname + '/../resources/SourceCodePro-Medium.ttf'

exports.TrueTypeTest =

  'test TrueType is Constructor': (test) ->
    console.log 'version=' + ttf1.getFixed(), 'numTables=' + numTables = ttf1.getUshort(), 'searchRange=' + ttf1.getUshort(), 'entrySelector=' + ttf1.getUshort(), 'rangeShift=' + ttf1.getUshort()
    ttf1.seek 12
    for i in [1..numTables]
      console.log ttf1.getString(4), 'checkSum=' + ttf1.getUlong().toString(16), 'offset=' + ttf1.getUlong(), 'len=' + ttf1.getUlong()
    test.equal typeof TrueType, 'function'
    test.done()

