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
    this.opacity;
}
liObj.prototype.init = function () {
    this.start();
    this.end();
    this.move();
}
liObj.prototype.start = function () {
    this.el.addEventListener('touchstart', function (event) {
        var event = event || window.event;
        event.preventDefault();
        setTimeout(function () {
            console.log( event.target)
        },500)
        this.eX = event.touches[0].clientX;
        this.eY = event.touches[0].clientY;
        console.log('touchstart')
    },false);
}
liObj.prototype.end = function () {
    this.el.addEventListener('touchend', function (event) {
        var event = event || window.event;
        event.preventDefault();
        console.log('touchend')
    },false);
}
liObj.prototype.move = function () {
    this.el.addEventListener('touchmove', function (event) {
        var event = event || window.event;
        event.preventDefault();
        //X = event.touches[0].clientX - touchInnerX;
        //Y = event.touches[0].clientY - touchInnerY;
        console.log('touchmove')
    },false);
}

function draglist($_ul){
    $_ul.children().each(function (index, ele) {
        lis[index] = new liObj();
        lis[index].el = ele;
        lis[index].init();
    })
}

draglist($('.tab-box .showbox ul:first-of-type'));


