define(['config'],function(config){

var html =
'<div class="share-box full">'
+'	<div class="share-arrow"></div>'
+'	<div class="share-text">'
+'		<p>请点击右上角</p>'
+'		<p>将它发送给指定朋友</p>'
+'		<p>或分享到朋友圈</p>'
+'	</div>'
+'</div>';

return function(){
	$( document.body ).append( html );
	var box = $('.share-box');
	box.on('click', function(e){
		box.remove();
	})
	$.get( config.share );
};

});