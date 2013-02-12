(function(global) {
var testFontTableDirectory = {
"version":1, "numtables":19, "searchRange":256, "entrySel":4, "rangeshift":48,
"tableDirectory":{
"BASE": {"checksum":"8b1994b1", "actual":"8b1994b1", "diff":"0", "offset":111904, "len":58},
"DSIG": {"checksum":"ffc3b7a7", "actual":"ffc3b7a7", "diff":"0", "offset":111964, "len":8280},
"GDEF": {"checksum":"32a13361", "actual":"32a13361", "diff":"0", "offset":106600, "len":224},
"GPOS": {"checksum":"33aace14", "actual":"33aace14", "diff":"0", "offset":106824, "len":2210},
"GSUB": {"checksum":"e048f4cb", "actual":"e048f4cb", "diff":"0", "offset":109036, "len":2866},
"OS/2": {"checksum":"7318d0b4", "actual":"7318d0b4", "diff":"0", "offset":440, "len":96},
"cmap": {"checksum":"ecf6c912", "actual":"ecf6c912", "diff":"0", "offset":4396, "len":2592},
"cvt ": {"checksum":"00cd0b81", "actual":"00cd0b81", "diff":"0", "offset":7428, "len":34},
"fpgm": {"checksum":"06599c37", "actual":"06599c37", "diff":"0", "offset":6988, "len":371},
"gasp": {"checksum":"ffff0003", "actual":"ffff0003", "diff":"0", "offset":106592, "len":8},
"glyf": {"checksum":"3da4de32", "actual":"3da4de32", "diff":"0", "offset":9396, "len":73236},
"head": {"checksum":"fbdbf913", "actual":"68e7bdc8", "diff":"933c44db", "offset":316, "len":54},
"hhea": {"checksum":"066e04a3", "actual":"066e04a3", "diff":"0", "offset":372, "len":36},
"hmtx": {"checksum":"d3b645f7", "actual":"d3b645f7", "diff":"0", "offset":536, "len":3860},
"loca": {"checksum":"4bbf9342", "actual":"4bbf9342", "diff":"0", "offset":7464, "len":1932},
"maxp": {"checksum":"05e90231", "actual":"05e90231", "diff":"0", "offset":408, "len":32},
"name": {"checksum":"d228dcd6", "actual":"d228dcd6", "diff":"0", "offset":82632, "len":15676},
"post": {"checksum":"844804a9", "actual":"844804a9", "diff":"0", "offset":98308, "len":8284},
"prep": {"checksum":"28b81ab0", "actual":"28b81ab0", "diff":"0", "offset":7360, "len":65}
}
};

// exports
if (typeof module !== 'undefined') {
 module.exports = testFontTableDirectory;
} else {
  global.testFontTableDirectory = testFontTableDirectory;
}

})(this);
