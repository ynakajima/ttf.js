#!/usr/bin/env coffee
fs = require 'fs'

#ttfjs = require '../ttf'
ttfjs = {
  TrueType: require '../../src/TrueType'
}

if process.argv.length > 2
  ttf = ttfjs.TrueType.createFromBuffer fs.readFileSync process.argv[2]

  numGlyphs = ttf.getNumGlyphs()
  unitsPerEm = ttf.head.unitsPerEm
  advanceWidthMax = ttf.hhea.advanceWidthMax

  glyphWidth = 100
  glyphHeight = 150
  margin = 10
  svgWidth = (glyphWidth + margin) * 12
  svgHeight = Math.ceil(numGlyphs / 12) * (glyphHeight + margin)
  scale = glyphWidth / advanceWidthMax
  advanceWidth = 0

  translate = {
    x: margin
    y: margin
  }

  console.log """
  <?xml version="1.0" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
  <svg width="#{svgWidth}" height="#{svgHeight}" version="1.1"
       xmlns="http://www.w3.org/2000/svg">
  """

  for glyph, i in ttf.glyf.glyphs
    translate.x = (i % 12) * (glyphWidth + margin) + margin / 2
    translate.y = parseInt(i / 12, 10) * (glyphHeight +  margin) + margin / 2
    
    d = glyph.toSVGPathString({
      matrix: {
        a: 1, c: 0, e: 0,
        b: 0, d: -1, f: 0
      }
      relative: true
    })

    if i < ttf.hmtx.hMetrics.length
      hmtx = ttf.hmtx.hMetrics[i]
      advanceWidth =  hmtx.advanceWidth

    offsetX = (advanceWidthMax - advanceWidth) / 2

    console.log """
      <g id='glyph_#{glyph.GID}' transform='translate(#{translate.x},#{translate.y})'>
        <rect opacity="0" transform='translate(#{offsetX * scale}, 0)' width='#{advanceWidth * scale}' height='#{glyphHeight - 2}' fill='#eee'></rect>
        <path opacity="0" fill='none' stroke='#c66' d="M0,0 100,0" transform='translate(0, #{glyphHeight / 1.5})'></path>
        <rect width='#{glyphWidth - 2}' height='#{glyphHeight - 2}' fill='none' stroke='#ccc'></rect>
        <path fill="#000" transform='translate(0, #{glyphHeight / 1.5}) scale(#{scale}) translate(#{offsetX}, 0)' d='#{d}'></path>
      </g>
    """
  console.log '</svg>'



