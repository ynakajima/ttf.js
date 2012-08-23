ttf.js
======
A JavaScript TrueType font engine for modern browsers and Node.js.


Demo
------
<a href="http://ynakajima.github.com/ttf.js/demo/glyflist/index.html">ttf.js Demo - Glyph List</a>

<img src="http://ynakajima.github.com/ttf.js/images/demo_screen_thumb.png" alt="ttf.js Demo - Glyph List" />

Development Status
------
work in progress...



### Implementation status of TrueType Tables

#### Offset Table
<table>
  <tbody>
    <tr><th>sfnt version</th><td>Implemented</td></tr>
    <tr><th>numTables</th><td>Implemented</td></tr>
    <tr><th>searchRange</th><td>Implemented</td></tr>
    <tr><th>entrySelector</th><td>Implemented</td></tr>
    <tr><th>rangeShift</th><td>Implemented</td></tr>
  </tbody>
</table>

#### Table Directory
<table>
  <tbody>
    <tr><th>Table Directory</th><td>Implemented</td></tr>
  </tbody>
</table>

#### Required Tables
<table>
  <tbody>
    <tr><th>cmap</th><td>-</td></tr>
    <tr><th>glyf</th><td>Almost</td></tr>
    <tr><th>head</th><td>Almost</td></tr>
    <tr><th>hhea</th><td>-</td></tr>
    <tr><th>hmtx</th><td>-</td></tr>
    <tr><th>loca</th><td>Almost</td></tr>
    <tr><th>maxp</th><td>Almost</td></tr>
    <tr><th>name</th><td>-</td></tr>
    <tr><th>post</th><td>-</td></tr>
    <tr><th>OS/2</th><td>-</td></tr>
  </tbody>
</table>

#### Optional Tables
<table>
  <tbody>
    <tr><th>cvt</th><td>-</td></tr>
    <tr><th>EBDT</th><td>-</td></tr>
    <tr><th>EBLC</th><td>-</td></tr>
    <tr><th>EBSC</th><td>-</td></tr>
    <tr><th>fpgm</th><td>-</td></tr>
    <tr><th>gasp</th><td>-</td></tr>
    <tr><th>hdmx</th><td>-</td></tr>
    <tr><th>kern</th><td>-</td></tr>
    <tr><th>LTSH</th><td>-</td></tr>
    <tr><th>prep</th><td>-</td></tr>
    <tr><th>PCLT</th><td>-</td></tr>
    <tr><th>VDMX</th><td>-</td></tr>
    <tr><th>vhea</th><td>-</td></tr>
    <tr><th>vmtx</th><td>-</td></tr>
  </tbody>
</table>


TrueType Specifications
------

* <a target="_blank" href="http://www.microsoft.com/typography/SpecificationsOverview.mspx">Microsoft Typography - Features of TrueType and OpenType</a> (Microsoft)
* <a target="_blank" href="https://developer.apple.com/fonts/TTRefMan/">TrueType Reference Manual</a> (Apple)