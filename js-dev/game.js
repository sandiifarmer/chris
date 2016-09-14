define(['gift','config','audio'], function(Gift,config,a){

var body = $( document.body );
var box = $('.game');
box.on('touchstart', function( e ){
	e.preventDefault();
	e.stopPropagation();
});
var tipHtml = '<div class="gm-tip full"></div>';

function Game(){
	this.score = 0;
	this.bar = 10;
	this.dur = 40;
	this.tick = this.dur;
	this.giftInterval = 500;

	this.elfTimer = null;
	this.giftTimer = null;
	this.timeTimer = null;

	if( body.hasClass('red') 	) this.mainColor = 'red';
	if( body.hasClass('blue') 	) this.mainColor = 'blue';
	if( body.hasClass('green') ) this.mainColor = 'green';

	this._init();
}
Game.prototype = {

_init : function(){
	var self = this;
	$('#time-num').text( self.dur );
	$('#mark-num').text( 0 );
	$('#time-inner').css({width : '100%'});
	$('#mark-inner').css({width : '0%'});
	self._demo();
},
_demo : function(){
	var self = this;
	$('.gm-santa').addClass('hide');
	$('.gm-demo').removeClass('hide');
	setTimeout(function(){
		$('.gm-demo').addClass('hide');
		self._ready();
		self._bindSanta();
	}, 5000);
},
_ready : function(){
	var self = this;
	box.append( tipHtml );
	var tip = $('.gm-tip');
	tip.addClass('gm-3');
	setTimeout(function(){ tip.addClass('gm-2'); }, 1000);
	setTimeout(function(){ tip.addClass('gm-1'); }, 2000);
	setTimeout(function(){ tip.addClass('gm-ready'); }, 3000);
	setTimeout(function(){ tip.addClass('gm-go'); },4000);
	setTimeout(function(){ tip.remove(); self._start(); }, 5000);
},
_bindSanta : function(){
	var self = this;
	var santa = $('.gm-santa');
	santa.removeClass('hide');
	
	var santaW = santa.width();
	var x = santaW;
	var minX =  santaW / 2;
	var maxX = body.width() - minX;
	var centerX = ( body.width() - santaW ) / 2;
	santa
		.css({left : centerX})
		.on('touchmove', function( e ){
			x = e.touches[ 0 ].pageX;
			x = x < minX ? minX : x;
			x = x > maxX ? maxX : x;
			x -= ( santaW / 2 );
			santa.css({left : x});
		});
},
_start : function(){
	var self = this;
	self._elfStart();
	self._giftStart();
	self._timeStart();
	setTimeout(function(){ self._end(); }, self.dur * 1000);
},
_elfStart : function(){
	var self = this;
	var elf = $('.gm-elf');
	var elfW = elf.width();
	var elfMaxX = body.width() - elfW;

	elfMove();
	self.elfTimer = setInterval(elfMove, 2000);
	function elfMove(){
		elf.toggleClass('elf-right');
		var targetX = elf.hasClass('elf-right') ? elfMaxX : 0;
		elf.css({left : targetX});
	}
},
_giftStart : function(){
	var self = this;
	self.giftTimer = setInterval(function(){
		new Gift( self.bar );
	}, self.giftInterval);
},
_timeStart : function(){
	var self = this;
	self.timeTimer = setInterval(function(){
		killTime();
	}, 1000);
	function killTime(){
		self.tick--;
		$('#time-num').text( self.tick );
		var ratio = parseInt( self.tick / self.dur * 100 );
		var width = ratio + '%';
		$('#time-inner').css({width : width});
	}
},
_end : function(){
	var self = this;
	clearInterval( self.elfTimer );
	clearInterval( self.giftTimer );
	clearInterval( self.timeTimer );
	self._result();
},
_result : function(){
	var self = this;
	box.append( tipHtml );
	var tip = $('.gm-tip');
	self.score = parseInt( $('#mark-num').text() );
	if( self.score >= self.bar ){
		window._rs = true;
		tip.addClass('gm-pass');
		a('pass');
		var rsSection = $('.pass');
		document.title = config.shareTitle.pass[ self.mainColor ];
		$.get( config.success );
	}else{
		window._rs = false;
		tip.addClass('gm-fail');
		a('fail');
		var rsSection = $('.fail');
		document.title = config.shareTitle.fail[ self.mainColor ];
		$.get( config.fail );
	}
	setTimeout(function(){
		tip.remove();
		$('.game').addClass('hide');
		rsSection.removeClass('hide');
	}, 2000);
}

};
return Game;

});