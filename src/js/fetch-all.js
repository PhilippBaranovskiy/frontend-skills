var scores = new googlePageSpeedScores([
	'https://ya.ru/',
	'https://yandex.ru',
	'https://facebook.com',
	'https://google.com'
], function(scores){
	console.table(scores);
});