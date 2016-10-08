$('.tab-box .showbox').height($('.page-content').height());

$$('.tab-box i.icon').click(function () {
    $('.tab-list, i.icon').toggleClass('act');
    if($('i.icon').hasClass('act')){
        $('.showbox').addClass('show');
    }else{
        $('.showbox').removeClass('show');
    }
})

$$('.tab-box .showbox li').on('taphold', function (e) {
    $(this).parent().addClass('x');
});

//拖放排序
//$('.tab-box ul').sortable();

/*
 * has('x'),
 * 拖动时复制一个透明的占位
 *
*/
var lis = [];
var liObj = function () {
    this.el;
    this.x;
    this.y;
    this.eX;
    this.eY;
    this.inX;
    this.inY;
    this.opacity;
}
liObj.prototype.init = function () {
    this.start();
    this.end();
    this.move();
}
liObj.prototype.start = function () {
    var _this = this;
    var _thisEL = this.el;
    _thisEL.addEventListener('touchstart', function (event) {
        var event = event || window.event;
        event.preventDefault();
        _this.eX = event.touches[0].clientX;
        _this.eY = event.touches[0].clientY;

        setTimeout(function () {
            if($(event.target).hasClass('active-state')){
                _this.x = _thisEL.offsetLeft;
                _this.y = _thisEL.offsetTop;
                _this.inX = _this.eX - _this.x;
                _this.inY = _this.eY - _this.y;
                $(event.target).clone().addClass('clone').appendTo($('.tab-box .showbox ul:first-of-type'));
                _thisEL.style.visibility = 'hidden';//隐藏本体
                $('li.clone').css({'left':_this.x, 'top':_this.y});
            }
        },500);

        console.log('touchstart')
    },false);
}
liObj.prototype.end = function () {
    var _this = this;
    var _thisEL = this.el;
    _thisEL.addEventListener('touchend', function (event) {
        var event = event || window.event;
        event.preventDefault();
        $('li.clone').remove();
        _thisEL.style.visibility = 'visible';
        console.log('touchend')
    },false);
}
liObj.prototype.move = function () {
    var _this = this;
    var _thisEL = this.el;
    _thisEL.addEventListener('touchmove', function (event) {
        var event = event || window.event;
        event.preventDefault();
        if($(event.target).siblings().hasClass('clone')){
            $('li.clone').css({
                'left': event.touches[0].clientX - _this.inX,
                'top' : event.touches[0].clientY - _this.inY
            })
        }

        console.log('touchmove')
    },false);
}

function draglist($_ul){
    var lisXY = [];
    $_ul.children().each(function (index, ele) {
        var offsetLeft=ele.offsetLeft, offsetTop=ele.offsetTop;
        lis[index] = new liObj();
        lis[index].el = ele;
        lis[index].init();
        lis[index].x = offsetLeft;
        lis[index].y = offsetTop;
        lisXY.push({x:offsetLeft, y:offsetTop})
        $(ele).css({
            'left': offsetLeft,
            'top' : offsetTop,
        });
    });
    $_ul.height($_ul.height());
    $_ul.children().css('position','absolute');
    console.log(lisXY)
    var lis_X = [], lis_Y = [];
    for(var i in lisXY){
        lis_X.push(lisXY[i].x);
        lis_Y.push(lisXY[i].y);
    }
    console.log(arrayUnique(lis_X),arrayUnique(lis_Y))
}

draglist($('.tab-box .showbox ul:first-of-type'));



//去重
function arrayUnique(arrs){
    var newArrays = [];
    var hash = {};
    if(arrs.length > 0){
        for(var i in arrs){
            if( ! hash[arrs[i]]){
                hash[arrs[i]]=1;
                newArrays.push(arrs[i]);
            }
        }
    }
    return newArrays;
}


