document.onreadystatechange = function(e) {
	if (document.readyState === "complete") {
		var url_string = window.location.href
		console.log(url_string)
		var url = new URL(url_string);
		if(url.searchParams.get("p") === 'nachhaltige-kommunikation'){
			document.getElementById("nachhaltige-kommunikation").scrollIntoView();
			window.history.replaceState(null, null, window.location.pathname);
			translateInnerContainer();
		}
	}
};
