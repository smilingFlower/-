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
        direction = "horizontal";

    //设置图片的样式
    var setImageSize = function(target, maxRes) {

    };

    // //修改图片路径
    // var modifyImageSrc = function(imgTarget,item){
    //     console.log(imgTarget);
    //     imgTarget.setAttribute("src",item);
    // };  


    var slider = function(gallerySelector,items){
        var traget = gallerySelector, //滑动的元素
            items = items,
            currentIndex = 0,
            startX,
            startY,
            moveEndX,
            moveEndY,
            X, //移动x的距离
            Y,  //移动y的距离
            thouchDirection;

        var updateProgress = function(translate){
            if (typeof translate === "undefined") {
                return;
            }


        }

        var setWrapperTranslate = function(translate){
            if (typeof translate === "undefined") {
                return;
            }


        }

        var touchstartFun = function(e){
            console.log("touchstart");
            e.preventDefault();

            // e.targetTouches[0].pageX
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;
        }

        var touchmoveFun = function(e){
            console.log("touchmove");
            e.preventDefault();

            moveEndX = e.targetTouches[0].pageX;
            moveEndY = e.targetTouches[0].pageY;

            X = moveEndX - startX;
            Y = moveEndY - startY;

            var moveDistanceY = Y < 0 ? -Y : Y;

            if (moveDistanceY > 50) {
                return false;
            }

            if (direction === "horizontal") {
                if  ( X > 5 ) {
                    console.log("向右滑动");
                }else if( X < -5 ){
                    console.log("向左滑动");
                }
            }            
        }

        var touchendFun = function(e){
            console.log("touchend");
            e.preventDefault();

        }

        var bindEvent = function(){
            // framework.bind(traget,'click',function(e){
            //     console.log(e.pageX);
            //     console.log(e.pageY);
            // });
            framework.bind(traget,'touchstart',touchstartFun);
            framework.bind(traget,'touchmove',touchmoveFun);
            framework.bind(traget,'touchend',touchendFun);           
        }

        var addhtml = function(){
            var parent = framework.getChildByClass(traget,"swiper-wrapper");
            var html = "";
            for(var i = 0; i< items.length; i++){
                html += '<div class="swiper-slide"> <img src="'+ items[i] +'"> </div>';
            }
            parent.innerHTML = html;
        }

        var unbindEvent = function(){
            framework.unbind(traget,'touchstart',touchstartFun);
            framework.unbind(traget,'touchmove',touchmoveFun);
            framework.unbind(traget,'touchend',touchendFun);           
        }

        var init = function(){
            addhtml();
            bindEvent();
        }

        init();

    }

    var publicMethods = {
        options:options,
        init:function(){
            slider(gallerySelector,items);
        }
    }

    framework.extend(self, publicMethods)
}








	



