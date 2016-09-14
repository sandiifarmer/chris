define(['config','tip','audio'], function(config,tip,a){

bind( $('.fq-gender') );
bind( $('.fq-btns').children('li') );

function bind( btns ){
	btns.on('click', function( e ){
		var self = $( e.currentTarget );
		self.siblings('.checked').removeClass('checked');
		self.addClass('checked');
		a('btn');
	});
}

var colorList = [
	['red','red','green'],
	['blue','blue','green']
];
$('.fq-next').on('click', function( e ){
	a('btn');
	var gender = $('.fq-gender').filter('.checked');
	var desc = $('.fq-btns').children('.checked');
	if( gender.length != 1 ){ tip('请选择性别'); return; }
	if( desc.length != 1 ){ tip('请选择一句话描述自己'); return; }
	var color = colorList[ gender.index() ][ desc.index() ];
	$( document.body )
		.removeClass('red')
		.removeClass('blue')
		.removeClass('green')
		.addClass( color );
	$('.faq').addClass('hide');
	$('.rule').removeClass('hide');

	request( gender, desc );
});
function request( gender, desc ){
	var genderUrl = [
		config.woman,
		config.man
	];
	var descUrl = [
		config.sdyk,
		config.gxbgf,
		config.zsjsd
	];
	$.get( genderUrl[ gender.index() ] );
	$.get( descUrl[ desc.index() ] );
}


});