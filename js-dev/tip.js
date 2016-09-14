define(function(){

return function( t ){
	var html =
	'<section class="tip-box">'
	+'	<div class="center"><span>'+ t +'</span></div>'
	+'</section>';
	$( document.body ).append( html );

	var box = $('.tip-box');
	var timer = setTimeout(function(){
		box.remove();
	}, 1500);
	box.on('click', function(){
		box.remove();
		clearTimeout( timer );
	});
};

});