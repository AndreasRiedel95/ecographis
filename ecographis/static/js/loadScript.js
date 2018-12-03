function isMyScriptLoaded(url) {
	if (!url) url = "http://xxx.co.uk/xxx/script.js";
	var scripts = document.getElementsByTagName('script');
	for (var i = scripts.length; i--;) {
		if (scripts[i].src.indexOf(url) !== -1) return true;
	}
	return false;
}

function loadScript (urls, callback) {
	var urlLoadedCount = 0;
	urls.forEach((url) => {
		if (!isMyScriptLoaded(url)) {
			var script = document.createElement("script")
			script.type = "text/javascript";    
			if (script.readyState){  //IE
				script.onreadystatechange = function(){
					if (script.readyState == "loaded" || script.readyState == "complete"){
						urlLoadedCount++;
						if (urlLoadedCount === urls.length) {
							script.onreadystatechange = null;
							callback();
						}
					}
				};
			} else {
				script.onload = function(){
					urlLoadedCount++;
					if (urlLoadedCount === urls.length) {
						callback();
					}
				};
			}

			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
		} else {
			urlLoadedCount++;
			if (urlLoadedCount === urls.length) {
				callback();
			}
		}
	});
}