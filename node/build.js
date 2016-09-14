var fs = require('fs');

//add version stamp
var cfg = {
	dir : '../html-dev/',
	key : ['style.css'].concat( fs.readdirSync('../js/') )
};
var stamp = Math.floor( new Date().getTime() / 1000 );
var fileArr = fs.readdirSync( cfg.dir );
fileArr.forEach(function( name ){
	var path = cfg.dir + name;
	var file = fs.readFileSync( path );
	var str = file.toString();
	str = doReplace( str );
	fs.writeFileSync( path, str );
});
function doReplace( str ){
	cfg.key.forEach(function( k ){
		var reg = new RegExp( k + '\\?*\\d*' );
		var rep = k +'?' + stamp;
		str = str.replace( reg, rep );
	});
	return str;
}

//debug to formal replacement
var cfg = {
	src : '../html-dev/',
	dst : '../html/',
	reg : 'data-main="../js-dev/',
	rep : 'data-main="../js/'
};
var fileArr = fs.readdirSync( cfg.src );
fileArr.forEach(function( name ){
	var file = fs.readFileSync( cfg.src + name );
	var str = file.toString();
	var reg = new RegExp( cfg.reg );
	str = str.replace( reg, cfg.rep );
	fs.writeFileSync( cfg.dst + name, str );
});