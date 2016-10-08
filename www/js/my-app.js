/**
 * Created by Lizhilin on 2016/9/23.
 */
// Initialize app
var myApp = new Framework7({
    tapHold: true,//开启长按事件
    tapHoldPreventClicks: true,//开启长按事件
});

// 如果我们需要使用定义DOM库,让我们将其保存到$$变量
var $$ = Framework7.$;

// 添加视图 view
var mainView = myApp.addView('.view-main', {
    // 因为我们想使用动态导航,我们需要启用这个观点:
    dynamicNavbar: true
});


// 对于这种情况,我们需要为“pageInit”事件添加事件监听器

// 使用一个“pageInit”所有页面的事件处理程序(推荐方式):
$$(document).on('pageInit', function (e) {
    // 获取页面数据保存到一个对象中，这里面保存了所有的请求信息
    var page = e.detail.page;

    if (page.name === 'about') {
        myApp.alert('页面1');
    }
})


//轮播
var mySwiper = myApp.swiper('.swiper-1', {
    pagination:'.swiper-1 .swiper-pagination',
    spaceBetween: 0//空隙
});

//妈的 没卵用！
myApp.onPageInit('index', function (page) {
    myApp.alert('index')
    console.log(page);
    var html = compiledSearchTemplate({/*數據*/})
});




!function getdata(){
    $$.ajax({
        url:'/api/home-list',
        success: function (data) {
            window._getdata = data;
            return data;
        },
        error: function () {
            getdata();
        }
    })
}();

!function scroll_pageContent(){
    // 初始开关量
    var loading = false;
    // 上次加载的序号
    var lastIndex = $$('.list-block li').length;
    // 最多可加载的条目
    var maxItems = 60;
    // 每次加载添加多少条目
    var itemsPerLoad = 5;

    var _data = false;
    var dataSource;

    // 注册'infinite'事件处理函数
    $$('.infinite-scroll').on('infinite', function () {
        var res = JSON.parse(window._getdata)
        // 如果正在加载，则退出
        if (loading) return;
        // 设置开关量
        //loading = true;
        // 模拟1s的加载过程（ajax）
        /*
        setTimeout(function () {
            // 重置加载开关量
            loading = false;
            if (lastIndex >= maxItems) {
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
                // 删除加载提示符
                $$('.infinite-scroll-preloader').remove();
                return;
            }
            // 生成新条目的HTML
            var html = '';
            for (var i = lastIndex + 1; i <= lastIndex+itemsPerLoad; i++) {
                html += '<li class="item-content">'+
                            '<div class="item-inner">'+
                                '<div class="img">'+
                                    '<img src="http://t.cn/RcTGGlN" alt="" onload="imageCrop(this)">'+
                                '</div>'+
                                '<div class="item-title">Item 1</div>'+
                            '</div>'+
                        '</li>';
            }

            // 添加新条目
            $$('.list-block ul').append(html);
            // 更新最后加载的序号
            lastIndex = $$('.list-block li').length;
        }, 500);
         */

        loading = false;
        if (lastIndex >= maxItems) {
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            myApp.detachInfiniteScroll($$('.infinite-scroll'));
            // 删除加载提示符
            $$('.infinite-scroll-preloader').remove();
            return;
        }
        // 生成新条目的HTML
        var html = '';
        for (var i = lastIndex; i < lastIndex+itemsPerLoad; i++) {
            html += '<li class="item-content">'+
                '<div class="item-inner">'+
                '<div class="img">'+
                '<img src="'+ res.data[i-1].src+'" alt="" onload="imageCrop(this)">'+
                '</div>'+
                '<div class="item-title">'+ res.data[i-1].text+'</div>'+
                '</div>'+
                '</li>';
        }

        // 添加新条目
        $$('.list-block ul').append(html);
        // 更新最后加载的序号
        lastIndex = $$('.list-block li').length;
    });
}();