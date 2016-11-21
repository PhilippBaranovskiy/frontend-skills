var _raf = window.requestAnimationFrame
		|| window.setImmediate
		|| function(c){ setTimeout(c, 0); };

var APP = (function(app){

	app.links = app.links || {};

	app.links.getLinks = function(textarea){
		try {
			return textarea.value == '' ? false : textarea.value.replace(/\r\n/g, '\n').split('\n');
		} catch (err) {
			return false;
		}
	};

	app.links.displayScores = function(scores){
		var result = Math.round( (scores.speed + scores.usability) / 2 / 10 );
		
		if ( !APP.links.scoresHolder ) {
			alert('The person\'s scores are ' + result + '/10');
		} else {
			APP.links.scoresHolder.innerHTML = result;
		}

		var cssClass = 'neitral';

		if ( result > 6 ) {
			cssClass = 'good';
		} else if ( result < 5 ) {
			cssClass = 'bad';
		}

		_raf(function(){
			APP.links.scoresHolder.classList.remove('neitral', 'bad', 'good');
			APP.links.scoresHolder.classList.add(cssClass);

			APP.links.scores.classList.add('display');
		});
	};

	app.links.fetchAll = function(form){
		var area = form.querySelector('textarea');
		var links = this.getLinks(area);

		var scores = new googlePageSpeedScores(links, function(scores){
			
			APP.links.displayScores(scores);

			_raf(function(){
				APP.links.form.classList.remove('loading');
			});
		});
	};

	app.links.submitInit = function(form){
		form.addEventListener('submit', function(submitEvent){
			submitEvent.preventDefault();
			APP.links.fetchAll(this);
			_raf(function(){
				APP.links.form.classList.add('loading');
				APP.links.scores.classList.remove('display');
			});
		}, false);
	};

	app.links.form = document.querySelector('#links');

	if ( !app.links.form ) {
		console.error('No form is here');
		return;
	}

	app.links.scores = document.querySelector('.results_scores');
	app.links.scoresHolder = document.querySelector('#scores');

	app.links.submitInit( app.links.form );

	return app;
})(APP || {});