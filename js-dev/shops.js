define(['geo','config','audio'], function(geo,config,a){

var cityList = [];
$.get( config.cities, function( data ){
	cityList = data;
	getUserPos();
}, 'json' );
function getUserPos(){
	geo(function( lng, lat ){
		getCityCode( lng, lat );
	}, function(code){
		//TODO 提示打开定位服务 code == 1
		renderCity();
	});
}
function getCityCode( lng, lat ){
	AMap.service('AMap.Geocoder',function(){
		var geocoder = new AMap.Geocoder({
		    radius: 1000,
		    extensions: "all"
		});
		geocoder.getAddress( [lng, lat], amapCbk ); 
	});
}
function amapCbk( status, rs ){
    if( status != 'complete' ){ renderCity(); return; }
    if( rs.info != 'OK'  ){ renderCity(); return; }
    var cityCode = rs.regeocode.addressComponent.citycode;
    if( !cityCode ){ renderCity(); return; }
    checkCityCode( cityCode );
}
function renderCity(){
	var html = '';
	$.each( cityList, function( i, o ){
		html += '<li class="ls-city-li" data-city-code="'+ o.code +'">'+ o.name +'</li>';
	});
	$('.ls-city-ul').append( html );

	$('.ls-shop-ul').addClass('hide');
	$('.ls-city-ul').removeClass('hide');
	$('.ls-city-tip').removeClass('hide');
}
//bindCity
$( document.body ).delegate('.ls-city-li', 'click', function( e ){
	var cityCode = $( e.currentTarget ).attr('data-city-code');
	getShopList( cityCode );
	a('btn');
});
function checkCityCode( cityCode ){
	var len = cityList.length;
	for( var i = 0; i < len; i++ ){
		var _cityCode = cityList[ i ].code;
		if( cityCode == _cityCode ){
			getShopList( cityCode );
		}
	}
}
function getShopList( cityCode ){
	var shopList = [];
	var rsList = [];
	$.get(config.shops, function( data ){
		shopList = data;
		$.each( shopList, function( i, o ){
			if( cityCode == o.cityCode ) rsList.push( o );
		});
		renderShop( rsList );
	}, 'json');
	$('.ls-city-ul').addClass('hide');
	$('.ls-city-tip').addClass('hide');
	$('.ls-shop-ul').removeClass('hide');
}
function renderShop( rsList ){
	var html = '';
	$.each( rsList, function( i, o ){
		html +=
		'<li class="ls-shop-li" data-loc="'+ o.loc +'">'
		+'	<p>'+ o.name +'</p>'
		+'	<p>'+ o.addr +'</p>'
		+'</li>';
	});
	$('.ls-shop-ul').append( html );
}



// var shopList = [];
// var index = 0;
// var pageSize = 10;
// var valve = true;
// $.get(config.shops, function( data ){
// 	shopList = data;
// 	renderShopList();
// }, 'json');

// var ul = $('.ls-ul');
// var oul = ul[ 0 ];
// ul.on("scroll touchend", function(){
// 	if(!valve) return;
// 	var scrollTop = oul.scrollTop;
// 	var	scrollHeight = oul.scrollHeight;
// 	var	clientHeight = oul.clientHeight;
// 	var	atBottom = !!(scrollTop == scrollHeight - clientHeight);
// 	if(atBottom) renderShopList();
// });

// function renderShopList(){
// 	var html = '';
// 	for(var i = 0; i < pageSize; i++, index++){
// 		var o = shopList[ index ];
// 		if( !o ) break;
// 		html +=
// 		'<li class="ls-li" data-loc="'+ o.loc +'">'
// 		+'	<p>'+ o.name +'</p>'
// 		+'	<p>'+ o.addr +'</p>'
// 		+'</li>';
// 	}
// 	ul.append( html );
// 	if( index >= shopList.length ) valve = false;
// }


});