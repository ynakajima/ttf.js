ttf.js
======

JavaScript TrueTypeFont library.


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
