(function(){

	var hash = document.location.hash.split('#');
	if ( hash.length < 2 ) { return; }

	var isUrls = hash[1].split('urls=');
    hash = null;
    if ( isUrls.length < 2 ) { return; }
    
    var urls = isUrls[1].split(',');
    isUrls = null;
    if ( !urls.length ) { return; }
    
    var area = document.querySelector('.header_links');
    if ( !area ) { return; }

    area.value = urls.join('\r\n');

})();