jDataView = require 'jdataview'
TTFDataView = require '../coffee/TTFDataView.coffee'

testBuffer = jDataView.createBuffer(0xab # BYTE: 171, CHAR: -85
  0xde, 0xf0, # USHORT: 57072, SHORT: -8464
  0xab, 0xcd, 0xef, 0x89, # ULONG: 2882400137, LONG: -1412567159
  0x00, 0x01, 0x00, 0x00, # FIXED: 1.0
  0x01, 0x9c, 0x39, 0xe1, # FIXED: 412.226089478
  0x00, 0x00, 0x00, 0x09, # FIXED: 0.001
  0x7f, 0xff, # F2DOT14: 1.999939
  0x70, 0x00, # F2DOT14: 1.75
  0x00, 0x01, # F2DOT14: 0.000061
  0x00, 0x00, # F2DOT14: 0.0
  0xff, 0xff, # F2DOT14: -0.000061
  0x80, 0x00, # F2DOT14: -2.0
  0x32, 0x40, # string: '2@'
  0x00, 0x00, 0x00, 0x00, 0xba, 0xb9, 0xf0, 0xb8, # longDateTime: Thu Apr 10 00:46:00 2003
  0x00, 0x00, 0x00, 0x00, 0xba, 0xc2, 0x67, 0x91, # longDateTime: Wed Apr 16 10:51:13 2003
  0x00, 0x00, 0x00, 0x00, 0xcd, 0x15, 0xa0, 0x7d, # longDateTime: Fri Jan 11 19:57:01 2013
  0x00, 0x00, 0x00, 0x00, 0xcd, 0x16, 0x10, 0xfe, # longDateTime: Sat Jan 12 03:57:02 2013
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00) # longDateTime: Fri Jan 01 00:00:00 1904 

testView = new jDataView testBuffer
ttfDataView = new TTFDataView testView
ttfDataView2 = new TTFDataView new jDataView testBuffer


exports.TTFDataViewTest =

  'test TTFDataView is Constructor': (test) ->
     test.ok typeof TTFDataView is 'function'
     test.done()

  'test TTFDataView#seek': (test) ->
    test.ok typeof ttfDataView.seek is 'function'

    ttfDataView.seek 12
    test.ok do testView.tell is 12
    test.done()

  'test TTFDataView#tell': (test) ->
    test.ok typeof ttfDataView.tell is 'function'
    
    ttfDataView.seek 8
    test.ok do ttfDataView.tell is 8
    test.done()


  'test TTFDataView#getString': (test) ->
    test.ok typeof ttfDataView.getString is 'function'
    
    ttfDataView.seek 31
    test.ok ttfDataView.getString(2) is '2@'
    test.ok ttfDataView.getString(1, 13) is '9'
    test.done()

  'test TTFDataView#getByte': (test) ->
    test.ok typeof ttfDataView.getByte is 'function'
    test.ok ttfDataView.getByte(0) is 171
    test.done()

  'test TTFDataView#getChar': (test) ->
    test.ok typeof ttfDataView.getChar is 'function'
    test.ok ttfDataView.getChar(0) is -85
    test.done()

  'test TTFDataView#getUshort': (test) ->
    test.ok typeof ttfDataView.getUshort is 'function'
    test.ok ttfDataView.getUshort(1) is 57072
    test.done()

  'test TTFDataView#getShort': (test) ->
    test.ok typeof ttfDataView.getShort is 'function'
    test.ok ttfDataView.getShort(1) is -8464
    test.done()

  'test TTFDataView#getUlong': (test) ->
    test.ok typeof ttfDataView.getUlong is 'function'
    test.ok ttfDataView.getUlong(3) is 2882400137
    test.done()

  'test TTFDataView#getLong': (test) ->
    test.equal typeof ttfDataView.getLong, 'function'
    test.equal ttfDataView.getLong(3), -1412567159
    test.done()

  'test TTFDataView#getFixed': (test) ->
    test.ok typeof ttfDataView.getFixed is 'function'
    test.equal ttfDataView.getFixed(7), 1.0
    test.equal ttfDataView.getFixed(), 412.227
    test.equal ttfDataView.getFixed(), 0.001
    test.done()

  'test TTFDataView#getF2dot14': (test) ->
    test.ok typeof ttfDataView.getF2dot14 is 'function'
    test.equal ttfDataView.getF2dot14(), 1.999939
    test.equal ttfDataView.getF2dot14(), 1.75
    test.equal ttfDataView.getF2dot14(), 0.000061
    test.equal ttfDataView.getF2dot14(), 0.0
    test.equal ttfDataView.getF2dot14(), -0.000061
    test.done()

  'test TTFDataView#getLongDateTime': (test) ->
    test.ok typeof ttfDataView.getLongDateTime is 'function'
    test.equal ttfDataView.getLongDateTime(33).getTime(), Date.parse 'Thu Apr 10 00:46:00 2003'
    test.equal ttfDataView.getLongDateTime().getTime(),   Date.parse 'Wed Apr 16 10:51:13 2003'
    test.equal ttfDataView.getLongDateTime().getTime(),   Date.parse 'Fri Jan 11 19:57:01 2013'
    test.equal ttfDataView.getLongDateTime().getTime(),   Date.parse 'Sat Jan 12 03:57:02 2013'
    #test.equal ttfDataView.getLongDateTime().getTime(),   Date.parse 'Fri Jan 01 00:00:00 1904' # TODO: 対応
    test.done()

  'test TTFDataView#getUFWord': (test) ->
    test.ok typeof ttfDataView.getUFWord is 'function'
    test.equal ttfDataView.getUFWord(1), 57072
    test.done()

  'test TTFDataView#getFWord': (test) ->
    test.ok typeof ttfDataView.getFWord is 'function'
    test.equal ttfDataView.getFWord(1), -8464
    test.done()

