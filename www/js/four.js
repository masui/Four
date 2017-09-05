//
// four.js
//
var place = [];
var char = [];
var dispchar = [];
var word;
var hidden;

function rand(n){
    return Math.floor(Math.random() * n);
}

function show(){
    for(i=0;i<4;i++){
	place[i].innerHTML = char[i];
    }
    wp = document.getElementById('google');
    wp.href = "http://www.google.com/search?q=" + word;
    wp.innerHTML = "「" + word + "」をGoogle検索";
    wp.style.visibility = 'visible';
    hidden = false;
}

function quiz(){
    word = words[rand(words.length)];
    char = word.split('');
    dispchar = char.slice(0);
    dispchar[rand(2)+0] = '　';
    dispchar[rand(2)+2] = '　';
    for(i=0;i<4;i++){
	place[i].innerHTML = dispchar[i];
    }
    document.getElementById('google').style.visibility = 'hidden';
    hidden = true;
}

function google(){
    location.href = "http://www.google.com/search?q=" + word;
}

function click(e){
    if(e.touches){
	if(e.touches[0].pageY < 50 && !hidden){
	    google();
	    return false;
	}
    }
    else {
	if(e.pageX == null && e.clientX != null){
	    var doc = document.documentElement, body = document.body;
	    e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
	    e.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
	}
	if(e.pageY < 50 && !hidden){
	    google();
	    return false;
	}
    }
    
    if(hidden &&
       (e.srcElement && e.srcElement != document.body && e.srcElement.className != 'div' || // iPhone
	e.target && e.target.className == 'char'))       // 普通のブラウザ
	show();
    else {
	if(e.target.data && e.target.data.match('Google検索') || // iPhone
	   e.target && e.target.id == 'google')                  // 普通のブラウザ
	    return false;
	quiz();
    }
}

function move(e){ // iPhoneの場合、指のドラッグでスクロールしないように
    e.preventDefault();
    return false;;
}

document.addEventListener("touchstart", click, false); // iPhone
document.addEventListener("touchmove", move, false);   
document.addEventListener("mousedown", click, false);  // 普通のブラウザ

scrollTo(0,0);
for(i=0;i<4;i++){
    place[i] = document.getElementById('char'+i);
}

quiz();
