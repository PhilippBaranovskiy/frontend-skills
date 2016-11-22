var _raf = window.requestAnimationFrame
		|| window.setImmediate
		|| function(c){ setTimeout(c, 0); };

var APP = (function(app){

	app.share = app.share || {};

	app.share.getLinks = function(){
		var area = document.querySelector('.header_links');
		if (!area) { return []; }

		var value = area.value;
		if (value == '') { return []; }

		return value.replace(/\r\n/g, '\n').split('\n');
	};
	app.share.formatLinks = function(links){
		return encodeURI(links.join(','));
	};
	app.share.getShort = function(links){
		var url = document.location.href.split('#')[0];
		if (links !== '') {
			document.location.hash = 'urls=' + links;
			alert('Copy link from your address bar.');
			// url += '#urls=' + links;
		}
		// return qwest.get('http://srv40155.ht-test.ru/fs/clck-api.php', {
		// 	url: encodeURIComponent(url)
		// });
	};

	app.share.displayShareLink = function(){

		var links = APP.share.getLinks();
		var formatted = APP.share.formatLinks(links);

		APP.share.getShort(links)
			.then(function(xhr, response){
				if ( response === '' || response === 'error' ) {
					console.error(xhr);
				} else {
					prompt('Use the following link to share your result:', response);
				}
			})
			.catch(function(err){
				console.error(err);
			});
	};

	app.share.init = function(){

		APP.share.links = document.querySelector('#links .header_links');

		if ( !APP.share.links ) {
			console.error('No form links is here');
			return;
		}

		APP.share.button = document.querySelector('#share');

		if ( !APP.share.button ) {
			console.error('No share button is here');
			return;
		}

		APP.share.button.addEventListener('click', APP.share.displayShareLink, false);

	};

	// document.addEventListener('DOMContentLoaded', app.share.init);
	_raf(app.share.init);

	return app;
})(APP || {});