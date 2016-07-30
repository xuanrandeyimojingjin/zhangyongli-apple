$(function(){
    //头部动画
    $('.header .nav .search').on('click',function(e){
        e.preventDefault();
        $('.header .searchbox,.xiaoshi,#zhegai,body').addClass('searching');
    })
    $('.searchbox .cuohao').on('click',function(e){
        e.preventDefault();
        $('.header .searchbox,.xiaoshi,#zhegai,body').removeClass('searching');
    })
    $('.nav-iphone .menu').on('click',function(e){
        e.preventDefault();
        $('.menu .hang,.menu .lie').toggleClass('zhuan');
        $('.display,.banner .zhishi li,body,.nav-phone .bag').toggleClass('diaoluo');
    })

    
   

    //轮播
   /* var win=$(".banner")[0];
    var as=$("li",$(".content"));
    var lis=$("li",$(".paganation")[0]);
    var btnl=$(".moveleft",win)[0];
    var btnr=$(".moveright",win)[0];
    var widths=parseInt(getStyle(as[0],"width"));//获取图片尺寸
    var num=0;//定义双下标
    var next=0;//定义双下标
    for(i=0;i<as.length;i++){
        if(i==0){
            continue;
        }
        as[i].style.left=widths+"px";
    }
    win.onmouseover=function(){
        btnl.style.display="block";
        btnr.style.display="block";
        clearInterval(t);
    }
    win.onmouseout=function(){
        btnl.style.display="none";
        btnr.style.display="none";
        t=setInterval(moveL,2000)
    }
//自动轮播
    var t=setInterval(moveL,2000);
    as[0].style.zIndex=10;
    //选项卡
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){//当前num，下一张this.index
            if(num==this.index){return;}
            as[this.index].style.left=widths+"px";
            lis[num].className="";//将清空此时的颜色类名
            lis[this.index].className="dian";//下一个上色
            animate(as[num],{left:-widths});
            animate(as[this.index],{left:0});
            next=this.index;
            num=this.index;
        }
    }
//右边按钮  左边按钮
    var flag=true;
    btnr.onclick=function(e){
        e.preventDefault();
        if(flag){
            flag=false;
            moveL();
        }
    }
    btnl.onclick=function(e){
        e.preventDefault();
        if(flag){
            flag=false;
            moveR();
        }
    }
//动起来
    function moveL(){
        next++;
        if(next==as.length){//限定边界
            next=0;
        }
        as[next].style.left=widths+"px";//就位，在右边就位

        //按钮动画
        lis[num].className="";//将清空此时的颜色类名
        lis[next].className="dian";//下一个上色

        animate(as[num],{left:-widths},function(){flag=true});//动画：当前的图片向左动画-widths
        animate(as[next],{left:0},function(){flag=true});//动画：下一张图片向左动画left=0
        num=next;//更新num=next
    }
    function moveR(){
        next--;
        if(next<0){//限定边界
            next=as.length-1;
        }
        as[next].style.left=-widths+"px";//就位，在右边就位
        //按钮动画
        lis[num].className="";//将清空此时的颜色类名
        lis[next].className="dian";//下一个上色
        animate(as[num],{left:widths},function(){flag=true});//动画：当前的图片向左动画-widths
        animate(as[next],{left:0},function(){flag=true});//动画：下一张图片向左动画left=0
        num=next;//更新num=next
    }
*/
    //轮播
    var tansitionTime=600;
    var flag=false;
    var items=$('.banner-inner .item');
    var move=function(n,dir){
        flag=true;
        //dangqiandonghua
        var active=$('.banner-inner .active');
        active
            .addClass(dir)
            .removeClass('animate')
            .delay(tansitionTime).queue(function(){
            flag=false;
            $(this).removeClass('active').removeClass(dir).dequeue();
        })
        //xiayizhang
        var op=(dir==='left')?'right':'left';
        $(n).addClass(op);
        $(n).get(0).offsetWidth;
        $(n).removeClass(op).addClass('active').delay(tansitionTime).queue(function(){
            $(this).addClass('animate').dequeue();
        })
        $('.zhishi li').removeClass('active').eq(items.index(n)).addClass('active');


    }
    var you=$('.banner .moveright');
    var zuo=$('.banner .moveleft');

    you.on('click',function(){
        if(flag)return;
        var active=$('.banner-inner .active');
        if(active.next().length){
            var n=active.next();
        }else{
            var n= items.eq(0);
        }
        move(n,'left');
    })

    zuo.on('click',function(){
        // alert(1);

        if(flag)return;
        var active=$('.banner-inner .active');
        if(active.prev().length){
            var n=active.prev();
        }else{
            var n= items.eq(-1);
        }
        move(n,'right');
    })
    $('.zhishi li').on('click',function(){
        var activeIndex=items.index($('.banner-inner .active'));
        var currentIndex=$(this).index();
        var dir=(currentIndex>activeIndex)?'left':'right';
        move(items.eq(currentIndex),dir);
    })
    var t=setInterval(function(){
        you.trigger('click');
    },2000)

    var banner=$('.banner');
    banner.hover(function(){
        clearInterval(t);
        $('.moveright i,.moveleft i').css('display','block');
    },function(){
        t=setInterval(function(){
            you.trigger('click');
        },2000)
        $('.moveright i,.moveleft i').css('display','none');
    })

    $('.shop').click(function(){
        var index=$(this).index('.shop')-1;
        // alert(index);
        $('.erji ').eq(index).slideToggle();
        $('.foot .shop span').eq(index).toggleClass('activejia');
        $('.shop').eq(index).addClass('quxian');

    })


})