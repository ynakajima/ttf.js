ttf.js
======

JavaScript TrueType Font library.


Demo
======

<a href="http://ynakajima.github.com/ttf.js/demo/glyflist/index.html">Demo Page</a>

Example
======

```javascript
window.onload = function() {
  	var readbutton = document.getElementById("read");
		readbutton.addEventListener("change", onReadFile, false);
};

function onReadFile(e) {

	var file = e.target.files[0];
	var reader = new FileReader();
			
	reader.onload = function(e) {			
		font = new ttfjs.TTF(e.target.result);
	}
 
  reader.readAsArrayBuffer(file);

}
```
