'use strict';
var framework = {
    getChildsByClass: function(parentEl,childClassName){
        var item = [];
        var node = parentEl.firstChild;
        for (var i = 0; i< parentEl.childNodes.length; i++) {
            if (framework.hasClass(node,"item")) {
                item.push(parentEl.childNodes[i]);
            }
            node = node.nextSibling;
        }    
        return item;
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

    createEl:function(parentEl,html){  //html 字符串
        parentEl.innerHTML = html;
    }
}

/**
 * [swipePhoto description]
 * @param  {[type]} template [description]
 * @param  {[数组]} items     [数据]
 * @param  {[数组]} options  [配置信息]
 * @return {[type]}          [description]
 */
var swipePhoto = function(gallerySelector,items,options){

    var self = this;

    //设置图片的样式
    var setImageSize = function(target, maxRes) {

    };

    //修改图片路径
    var modifyImageSrc = function(imgTarget,item){
        console.log(imgTarget);
        imgTarget.setAttribute("src",item);
    };  

    var animations = function(){

    };


    var slider = function(gallerySelector,imgTarget,items){
        var traget = gallerySelector, //滑动的元素
            imgTarget = imgTarget,
            items = items,
            index = 0,
            startX,
            startY,
            moveEndX,
            moveEndY,
            X, //移动x的距离
            Y,  //移动y的距离
            thouchDirection;

        var touchstartFun = function(e){
            console.log("touchstart");
            e.preventDefault();

            // e.targetTouches[0].pageX
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;
        }

        var touchmoveFun = function(e){
            console.log("touchmove");
            e.preventDefault();

            moveEndX = e.changedTouches[0].pageX;
            moveEndY = e.changedTouches[0].pageX;
            debugger
            X = moveEndX - startX;
            Y = moveEndY - startY;

            // console.log(X);
            // console.log(Y);
        }

        var touchendFun = function(e){
            console.log("touchend");
            e.preventDefault();

            // if (Math.abs(X) > Math.abs(Y) && X > 0) {
            //     console.log("向 右 滑动");
            //     thouchDirection = "right";
            // }else if(Math.abs(X) > Math.abs(Y) && X < 0) {
            //     console.log("向 左 滑动");
            //     thouchDirection = "left";
            // }else if(Math.abs(X) < Math.abs(Y) && Y > 0) {
            //     console.log("向 下 滑动");
            //     thouchDirection = "bottom";
            // }else if(Math.abs(X) < Math.abs(Y) && Y < 0) {
            //     console.log("向 上 滑动");
            //     thouchDirection = "top";
            // }else{
            //     thouchDirection = "justTouch";           
            // }





            if (thouchDirection === "right") {
                console.log("right");
                console.log(index);
                if (index === 1) {
                    return false;
                }
                modifyImageSrc(imgTarget,items[index]);
                index++;
            }else if(thouchDirection === "left"){
                console.log("left");
                console.log(items.length);
                if (index === items.length) {
                    return false;
                }
                modifyImageSrc(imgTarget,items[index]);
                index--;
            }

            //unbindEvent();
        }

        var bindEvent = function(){
            framework.bind(traget,'touchstart',touchstartFun);
            framework.bind(traget,'touchmove',touchmoveFun);
            framework.bind(traget,'touchend',touchendFun);           
        }

        // var unbindEvent = function(){
        //     framework.unbind(traget,'touchstart',touchstartFun);
        //     framework.unbind(traget,'touchmove',touchmoveFun);
        //     framework.unbind(traget,'touchend',touchendFun);           
        // }

        var init = function(){
            modifyImageSrc(imgTarget,items[index]);
            index ++;
            bindEvent();
        }

        init();

    }

    var publicMethods = {
        options:options,
        init:function(){
            slider(gallerySelector,this.options.imgTarget,items);
        }
    }

    framework.extend(self, publicMethods)
}








	



