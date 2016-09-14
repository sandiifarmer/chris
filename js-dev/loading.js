define(['config'], function(config){

var html = '';
$.each(config.imgs, function(i,n){
	var src = config.imgPath + n;
	html += '<img class="preload" src="" data-src="'+ src +'">';
});
$('.ld-pic').append( html );

var img = $('.preload');
var len = img.length;
var loaded = 0;
img
	.on("load", function(e){
        loaded++;
       	process();
        if( loaded == len ) done();
    })
    .on("error", function(e){
        loaded++;
        error( this );
        if( loaded == len ) done();
    })
    .each(function(i){
        $(this).attr({ src : $(this).attr("data-src") });
    });
function process(){
	var ratio = Math.round( loaded / len * 100 ) + "%";
	$('.ld-in').css({width : ratio});
}
function error( img ){
	var src = $( img ).attr("data-src");
	console.log( "Load resource fail : " + src ); 
}
function done(){
	$('.loading').addClass('hide');
	$('.cover').removeClass('hide');
}

});