define(['audio'],function(a){

var map = new AMap.Map('mp-main', {level : 17});
var marker = null;

$( document.body ).delegate('.ls-shop-li','click', function( e ){
	a('btn');
	var li = $( e.currentTarget );
	var name = li.children('p').eq( 0 ).text();
	var loc = li.attr('data-loc');
	var lng = loc.split(',')[0];
	var lat = loc.split(',')[1];
	var pos = new AMap.LngLat(lng, lat);
	
	if( marker ) marker.hide();
	marker =  new AMap.Marker({position : pos});
	marker.setMap( map );
	map.setZoomAndCenter(17, pos);
	$('.mp-name').text( name );

	$('.list').addClass('hide');
	$('.map').removeClass('hide');
});

});