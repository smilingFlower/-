'use strict';
var framework = {
    getChildByClass: function(parentEl, childClassName) {
        var node = parentEl.firstChild;
        while (node) {
            if (framework.hasClass(node, childClassName)) {
                return node;
            }
            node = node.nextSibling;
        }
    },

    hasClass: function(el, className) {
        return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
    },

    addClass:function(el, className){
        if (!framework.hasClass(el, className)) {

            if (el.className) {
                el.className = el.className.replace(/\s$/,"") + " " + className;
            }else{
                el.className = className
            }
        } 
    }, 

    removeClass:function(el, className){
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');        
    },

    event:function(){
        var e = e ? e : window.event;
        return e;
    },

    // 阻止冒泡
    stopPropagation:function(e){
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
    },

    //阻止默认行为
    preventDefault:function(e){
        window.event ? window.event.returnValue = true : e.perventDefault();
    },

    extend: function(o1, o2, preventOverwrite) {
        for (var prop in o2) {
            if (o2.hasOwnProperty(prop)) {
                if (preventOverwrite && o1.hasOwnProperty(prop)) {
                    continue;
                }
                o1[prop] = o2[prop];
            }
        }
    }, 

    bind:function(target,eventtype,listener,unbind){  
        var methodName = unbind ? "remove" : "add" + "EventListener";
        var type = eventtype.split(" ");
        for(var i = 0; i < type.length; i++){
            if (type[i]) {
                target[methodName](type[i], listener, false);
            }
        }
    },

    unbind:function(target,eventtype,listener){
        framework.bind(target,eventtype,listener,true);
    },

    createEl: function(classes, tag) {
        var el = document.createElement(tag || 'div');
        if (classes) {
            el.className = classes;
        }
        return el;
    },
}

/**
 * [swipePhoto description]
 * @param  {[type]} template [description]
 * @param  {[数组]} items     [数据]
 * @param  {[数组]} options  [配置信息]
 * @return {[type]}          [description]
 */
var swipePhoto = function(gallerySelector,items,options){

    var self = this,
        direction = "horizontal",
        outer = framework.getChildByClass(gallerySelector,"swiper-wrapper"), 
        winW = window.innerWidth,
        items = items,
        list = [],
        currentIndex = 0,
        target,
        startX,
        startY,
        moveEndX,
        moveEndY,
        X, //移动x的距离
        Y,  //移动y的距离
        startTime,
        endTime,
        direction;

    var updateIndex = function(){
        
    }

    var animation = function(){

    }

    var touchstartFun = function(e){           
        console.log(e.target);            
        console.log("touchstart");
        e.preventDefault();

        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;

        var target = e.target;
        target = target;

    }

    var touchmoveFun = function(e){
        console.log(e.target);
        console.log("touchmove");
        e.preventDefault();

        startTime = new Date() * 1;  //把时间转成ms

        moveEndX = e.targetTouches[0].pageX;
        moveEndY = e.targetTouches[0].pageY;

        X = Math.floor(moveEndX - startX);
        Y = Math.floor(moveEndY - startY);

        var moveDistanceY = Y < 0 ? -Y : Y;

        if (moveDistanceY > 50) {
            return false;
        }

        if (direction === "horizontal") {
            console.log("horizontal");
            if  ( X > 5 ) {
                console.log("向右滑动");
                if (currentIndex == 0) { //滑动到第一个元素，不再滑动
                    return false
                }
                list[currentIndex].style.webkitTransform = "translate3d(" + (winW - X) +"px, 0, 0)";
                list[currentIndex].style.transform = "translate3d(" + (winW - X) +"px, 0, 0)";
                list[currentIndex-1].style.webkitTransform = "translate3d(" + X +"px, 0, 0)";
                list[currentIndex-1].style.transform = "translate3d(" + X +"px, 0, 0)";  
                direction = "right";
            }else if( X < (-5) ){
                console.log("向左滑动");
                if (currentIndex == (list.length - 1)) { //滑动到第最后一个元素，不再滑动
                    return false
                }
                list[currentIndex].style.webkitTransform = "translate3d(" + X +"px, 0, 0)";
                list[currentIndex].style.transform = "translate3d(" + X +"px, 0, 0)";
                list[currentIndex+1].style.webkitTransform = "translate3d(" + (winW + X) +"px, 0, 0)";
                list[currentIndex+1].style.transform = "translate3d(" + (winW + X) +"px, 0, 0)";
                direction = "left";
            }

        }            
    }

    var touchendFun = function(e){
        console.log(e.target);            
        console.log("touchend");
        e.preventDefault();

        endTime = new Date() * 1;  //把时间转成ms

        var time = 0; //动画的时间

        if (direction === "right") {
            // if (currentIndex == 0) {
            //     return false;
            // }

            // if ( X < (winW / 3 * 2)) {
            //     time = 1;
            // }else{
            //     time = .5;
            // }

            // //改变动画后所应该的位移值
            // list[currentIndex].style.webkitTransform = 'translate3d('+ winW +'px, 0, 0)';
            // list[currentIndex-1].style.webkitTransform = 'translate3d(0, 0, 0)';    

            // list[currentIndex].style.webkitTransition = '-webkit-transform '+ time +'s ease-out';              
            // list[currentIndex-1].style.webkitTransition = '-webkit-transform '+ time +'s ease-out'; 


            // currentIndex--;
        }else{
            // if (currentIndex == (list.length - 1)) {
            //     return false;
            // }

            // if ( -X < (winW / 3 * 2)) {
            //     time = 1;
            // }else{
            //     time = .5;
            // }  

            // //改变动画后所应该的位移值
            // list[currentIndex].style.webkitTransform = 'translate3d('+ (-winW) +'px, 0, 0)';
            // list[currentIndex+1].style.webkitTransform = 'translate3d(0, 0, 0)';    

            // list[currentIndex].style.webkitTransition = '-webkit-transform '+ time +'s ease-out';              
            // list[currentIndex+1].style.webkitTransition = '-webkit-transform '+ time +'s ease-out';  
            
            // currentIndex++;
        }
    }

    var bindEvent = function(){
        // framework.bind(target,'click',function(e){
        //     console.log(e.pageX);
        //     console.log(e.pageY);
        // });
        framework.bind(outer,'touchstart',touchstartFun);
        framework.bind(outer,'touchmove',touchmoveFun);
        framework.bind(outer,'touchend',touchendFun);           
    }

    var addhtml = function(){
        var parent = framework.getChildByClass(gallerySelector,"swiper-wrapper");
        var html = "";
        for(var i = 0; i< items.length; i++){
            html += '<div class="swiper-slide" data='+i+'> <img src="'+ items[i] +'"></div>';
        }
        parent.innerHTML = html;
    }

    var unbindEvent = function(){
        framework.unbind(outer,'touchstart',touchstartFun);
        framework.unbind(outer,'touchmove',touchmoveFun);
        framework.unbind(outer,'touchend',touchendFun);           
    }

    var init = function(){
        $(gallerySelector).removeClass("hidden");
        var overlay = document.getElementsByClassName("overlay")[0];
        framework.removeClass(overlay,"hidden");

        addhtml();

        var item = framework.getChildByClass(gallerySelector,"swiper-wrapper").childNodes;  
        for (var i = 0; i < item.length; i++) {
            if (framework.hasClass(item[i],"swiper-slide")) {
                list.push(item[i]);
                item[i].style.webkitTransform = "translate3d(" + i * winW +"px, 0, 0)";
                item[i].style.transform = "translate3d(" + i * winW +"px, 0, 0)";
            }
        }

        bindEvent();
    }

    var publicMethods = {
        options:options,
        init:function(){
            init();
        }
    }

    framework.extend(self, publicMethods); 
}








	



