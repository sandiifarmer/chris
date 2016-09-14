define(['audio'],function(a){

function Gift( bar ){
	this.body = $( document.body );
	this.box = $('.game');
	this.santa = $('.gm-santa');
	this.elf = $('.gm-elf');
	this.dropTime = 3000;
	this.bar = bar;
	if( this.body.hasClass('red') 	) this.mainColor = 'red';
	if( this.body.hasClass('blue') 	) this.mainColor = 'blue';
	if( this.body.hasClass('green') ) this.mainColor = 'green';

	this._init();
}
Gift.prototype = {

_init : function(){
	var self = this;
	self.color = self._getColor();
	self.id = 'gift-'+ parseInt( new Date().getTime() / 1000 );
	var html = '<div class="gm-gift '+ self.color +'" id="'+ self.id +'"></div>'
	self.box.append( html );
	self.gift = $( '#' + self.id );
	var left = self.elf[ 0 ].offsetLeft;
	self.gift
		.css({left : left})
		.addClass('gm-anim');
	var height = self.box.height();
	// setTimeout(function(){ self.gift.addClass('gift-drop'); }, 1000);
	setTimeout(function(){ self.gift.css({top : height}); }, 10);
	setTimeout(function(){ self.gift.remove() }, self.dropTime);
	self._setTimers();
},
_getColor : function(){
	var self = this;
	var color = ['red','green','blue'];
	var i = parseInt( Math.random() * 3 );
	return color[ i ];
},
_setTimers : function(){
	var self = this;
	var speed = self._calcSpeed();
	var timeout = self._calTimeout( speed ) - 100;
	setTimeout(function(){
		self._setCheck( timeout );
	}, timeout);
},	
_calcSpeed : function(){
	var self = this;
	var s = self.box.height() - self.gift[ 0 ].offsetTop;
	var v = s / self.dropTime;
	return v;
},
_calTimeout : function( v ){
	var self = this;
	var s = self.santa[ 0 ].offsetTop - self.gift[ 0 ].offsetTop;
	var t = s / v;
	return t;
},
_setCheck : function( timeout ){
	var self = this;
	self.checkTimer = setInterval(function(){
		self._checkPos();
	}, 200);
	setTimeout(function(){
		if( self.checkTimer ) clearTimeout( self.checkTimer );
	}, self.dropTime - timeout );
},
_checkPos : function(){
	var self = this;
	var santaWidth = self.santa.width();
	var giftWidth = self.gift.width();
	var santaCenterX = self.santa[ 0 ].offsetLeft + santaWidth / 2;
	var giftCenterX = self.gift[ 0 ].offsetLeft + giftWidth / 2;
	var distance = Math.abs( santaCenterX - giftCenterX );
	var minDistance = ( santaWidth + giftWidth ) / 2;
	var collide = !!( distance < minDistance );
	if( collide ) self._score();
},
_score : function(){
	var self = this;
	if( self.color == self.mainColor ){
		self._mark( 1 );
		self._display( 1 );
		a('plus');
	}else{
		self._mark( -1 );
		self._display( -1 );
		a('minus');
	}
	clearTimeout( self.checkTimer );
	self.gift.addClass('hide');
},
_display : function( score ){
	var self = this;
	var klass = ( score > 0 ) ? 'gm-plus' : 'gm-minus';
	var id = 'gm-score' + new Date().getTime();
	var html = '<div class="hide gm-score '+ klass +'" id="'+ id +'"></div>';
	self.box.prepend( html );
	var left = parseInt((self.box.width() - 50) * Math.random());
	var el = $('#' + id);
	el.css({left : left}).removeClass('hide');
	setTimeout(function(){ el.addClass('gm-gone'); }, 500);
	setTimeout(function(){ el.remove(); }, 1500);
},
_mark : function( score ){
	var self = this;
	var numEl = $('#mark-num');
	var mark = parseInt( numEl.text() ) + score;
	mark = ( mark < 0 ) ? 0 : mark;
	numEl.text( mark );
	mark = ( mark > self.bar ) ? self.bar : mark;
	var ratio = parseInt( mark / self.bar * 100 );
	$('#mark-inner').css({width : ratio + '%'});
}
	
};

return Gift;


});