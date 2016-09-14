define(function(){

return function(okFtn, noFtn){
	if( navigator.geolocation ){
	    navigator.geolocation.getCurrentPosition(function( p ){
	    	var lng = p.coords.longitude;
	    	var lat = p.coords.latitude;
	    	okFtn( lng, lat );
	    }, function( e ){
	    	noFtn && noFtn( e.code );
	    },{
	        timeout: 5000
	    });
	}else{
	    noFtn && noFtn( 4 );
	    //PERMISSION_DENIED:1, POSITION_UNAVAILABLE:2, TIMEOUT:3, UNSUPPORT:4
	}
};

});