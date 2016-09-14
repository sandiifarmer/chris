// require.config({
// 	urlArgs : 't=' + parseInt( new Date().getTime() / 1000 ),
// 	paths : {}
// });
require(['game','share','config','audio','loading','faq','shops','map'], function(Game,share,config,a){
	
window._rs = null;
$.get( config.log );
document.getElementById( 'audio-load' ).play();

$('.cv-start').on('click', function(){
	$('.cover').addClass('hide');
	$('.faq').removeClass('hide');
	a('btn');
});
$('.rl-start').on('click', function(){
	$('.rule').addClass('hide');
	$('.game').removeClass('hide');
	document.getElementById( 'audio-load' ).pause();
	new Game();
	a('btn');
	// $('.list').addClass('hide');
	// $('.fail').removeClass('hide');
});
$('.fl-again').on('click', function(){
	$('.fail').addClass('hide');
	$('.rule').removeClass('hide');
	document.title = config.shareTitle.normal;
	a('btn');
});
$('.fl-share').add('.ps-share').on('click', function(){
	share();
	a('btn');
});
$('.ps-shop').add('.fl-shop').on('click', function( e ){
	$('.pass').addClass('hide');
	$('.fail').addClass('hide');
	$('.list').removeClass('hide');
	$.get( config.area );
	a('btn');
});
$('.ls-back').on('click', function(){
	$('.list').addClass('hide');
	if( window._rs ){
		$('.pass').removeClass('hide');
	}else{
		$('.fail').removeClass('hide');
	}
	a('btn');
});
$('.mp-back').on('click', function(){
	$('.map').addClass('hide');
	$('.list').removeClass('hide');
	a('btn');
});

});