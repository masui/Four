//
// four.js
//
var word; // 選択された四文字熟語

rand = (n) => {
    return Math.floor(Math.random() * n);
};

show_quiz = () => {
    //
    // 新しい単語をランダム選んで表示
    //
    word = words[rand(words.length)];
    var chars = word.split('');
    chars[rand(2)+0] = '　';
    chars[rand(2)+2] = '　';
    for(i=0;i<4;i++){
	$('#char'+i).text(chars[i]);
    }
    $('#google').css('visibility','hidden');
    $('#query').css("color","#333");
    $('#query').text("「" + word + "」をGoogle検索");
    $('#query').attr('href',"http://www.google.com/search?q=" + word);
};

show_all = () => {
    //
    // 解答とGoogleへのリンクを表示
    //
    var chars = word.split('');
    for(i=0;i<4;i++){
	$('#char'+i).text(chars[i]);
    }
    $('#google').css('visibility','visible');
};

click = () => {
    if($('#google').css('visibility') == 'hidden'){
	show_all();
    }
    else {
	show_quiz();
    }
};

resize = () => {
    var height = window.innerHeight;  // 表示領域の高さ
    var width = window.innerWidth;    // 表示領域の幅
    var size = width;
    if(height < width) size = height;

    rectsize = size * 4 / 10;
    $('.div').css('height',rectsize);
    $('.div').css('width',rectsize);

    gap = 10;
    var left = (width - (2 * rectsize + gap)) / 2;
    var top = 70;

    $('#div0').css('top',top);
    $('#div0').css('left',left);
    $('#div1').css('top',top);
    $('#div1').css('left',left + rectsize + gap);
    $('#div2').css('top',top + rectsize + gap);
    $('#div2').css('left',left);
    $('#div3').css('top',top + rectsize + gap);
    $('#div3').css('left',left + rectsize + gap);

    $('.char').css('font-size',rectsize * 7 / 10);
    $('.char').css('left',rectsize * 1 / 10);
    $('.char').css('top',0);
};

$(document).ready(() => {
    $('.char').on('mousedown',(e) => { e.preventDefault(); });
    $('.char').on('click',click);
    $(window).on('resize',resize);
    resize();
    show_quiz();
});

