var _raf = window.requestAnimationFrame
		|| window.setImmediate
		|| function(c){ setTimeout(c, 0); };

var APP = (function(app){

	app.links = app.links || {};

	app.links.getLinks = function(textarea){
		try {
			return textarea.value == '' ? false : textarea.value.replace(/\r\n/g, '\n').split('\n');
		} catch (err) {
			return [];
		}
	};

	app.links.displayScores = function(scores){
		var result = Math.round( (scores.speed + scores.usability) / 2 / 10 );
		// var result = Math.round( scores.speed / 10 );
		
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
		var links = this.getLinks( APP.links.area );

		var scores = new googlePageSpeedScores(links, function(scores){
			
			APP.links.displayScores(scores);

			_raf(function(){
				APP.links.form.classList.remove('loading');
			});
		});
	};

	app.links.test = function(submitEvent){

		submitEvent = submitEvent || {};

		if (submitEvent.preventDefault) {
			submitEvent.preventDefault();
		}
		
		APP.links.fetchAll(this);
		_raf(function(){
			APP.links.form.classList.add('loading');
			APP.links.scores.classList.remove('display');
		});
	};

	app.links.submitInit = function(){

		APP.links.form = document.querySelector('#links');
		APP.links.area = APP.links.form.querySelector('textarea');

		if ( !APP.links.form ) {
			console.error('No form is here');
			return;
		}

		APP.links.scores = document.querySelector('.results_scores');
		APP.links.scoresHolder = document.querySelector('#scores');

		APP.links.form.addEventListener('submit', APP.links.test, false);

		if ( APP.links.area.value !== '' ) {
			APP.links.test();
		}
	};

	// document.addEventListener('DOMContentLoaded', app.links.submitInit, false);
	_raf(app.links.submitInit);

	return app;
})(APP || {});