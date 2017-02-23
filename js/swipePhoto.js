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

    firstChild:function(selector){
        if (selector.childNodes.length <= 0) return;
        var item;
        for (var i = 0; i < selector.childNodes.length; i++) {
             if (selector.childNodes[i].nodeType === 1) {
                item = selector.childNodes[i];
                break;
             }
         } 
        return item;
    },

    removeElement(element){
        console.log(element);
         var _parentElement = element.parentNode;
         if(_parentElement){
                _parentElement.removeChild(element);
         }
    }    
}

var Swipe = function(gallerySelector,options){

    var self = this,
        currentIndex = 0,
        outerParent = gallerySelector,
        outer = framework.firstChild(gallerySelector),
        list = [],
        winW = window.innerWidth,
        target,
        startX,
        startY,
        moveEndX,
        moveEndY,
        X, //移动x的距离
        Y,  //移动y的距离
        startTime,
        endTime;
  
    var _options = {
        direction : "horizontal",
        isOverlay : true,  //如果有背景，就说明有点击关闭滑动的页面的事件
        isClose : true,
        isPageNum : true,
    }
    framework.extend(_options, options);

    var addHtml = function(tamplate){
        outer.innerHTML = tamplate;
    }

    var addHtmlOverlay = function(){
        var bodyEl = document.body;
        var overlayEl = framework.createEl("overlay");
        bodyEl.appendChild(overlayEl);
    }

    var addHtmlClose = function(){
        var closeEl = framework.createEl("close");

        outerParent.appendChild(closeEl);
    }

    var addHtmlPageNum = function(){
        var pageNumEl =  framework.createEl("page-num");
        pageNumEl.innerHTML = '<span class="current-index">0</span>/<span class="all">0</span>' 
        outerParent.appendChild(pageNumEl);
    }

    var updatePageNum = function(index,alllength){
        var parent = framework.getChildByClass(outerParent,"page-num");
        framework.getChildByClass(parent,"current-index").innerText = index;
        framework.getChildByClass(parent,"all").innerText = alllength;
    }

    var close = function(){
        console.log("close");
        framework.addClass(outerParent,"hidden");

        // outer.innerHTML = "";

        if (_options.isOverlay) {
            framework.removeElement(framework.getChildByClass(document.getElementsByTagName("body")[0],"overlay"));
        }

        if (_options.isClose) {
            framework.removeElement(framework.getChildByClass(outerParent,"close"));
        }

        if (_options.isPageNum) {
            framework.removeElement(framework.getChildByClass(outerParent,"page-num"));
        }
        

        // unbindEvent()
    }

    var touchstartFun = function(e){
        console.log("touchstart");
        e.preventDefault();

        startTime = new Date() * 1; //把时间转成ms

        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;

        var target = e.target;
        target = target;

    }

    var touchmoveFun = function(e){
        console.log("touchmove");
        e.preventDefault();


        moveEndX = e.targetTouches[0].pageX;
        moveEndY = e.targetTouches[0].pageY;


        X = Math.floor(moveEndX - startX);
        Y = Math.floor(moveEndY - startY);
        var moveDistanceY = Y < 0 ? -Y : Y;

        if (moveDistanceY > 50) {
            return false;
        }

        if (_options.direction === "horizontal") {
            if  ( X > 10 ) {
                console.log("向右滑动");
                if (currentIndex == 0) { //滑动到第一个元素，不再滑动
                    return false
                }

                outer.style.transform = "translate3d(" + (-(winW * currentIndex) + X)+"px, 0, 0)";

            }else if( X < (-10) ){
                console.log("向左滑动");
                if (currentIndex == (list.length - 1)) { //滑动到第最后一个元素，不再滑动
                    return false
                }

                outer.style.transform = "translate3d(" + (-(winW * currentIndex) + X) +"px, 0, 0)";

            }
        }        
    }

    var touchendFun = function(e){
        console.log("touchend");
        e.preventDefault();

        endTime = new Date() * 1;  //把时间转成ms
        var time = endTime - startTime;   
        var index = currentIndex;  //点击的是那一个图片    

        if (_options.direction === "horizontal") {

            if  ( X > 10 ) {
                console.log("向右滑动2");
                if (currentIndex == 0) { //滑动到第一个元素，不再滑动
                    X = 0,Y = 0; 
                    return false
                }

                outer.style.transform = "translate3d(" + -(winW * (currentIndex - 1)) +"px, 0, 0)";

                //改变过渡的方式，从无动画变为有动画
                outer.style.webkitTransition = '-webkit-transform 0.2s ease-out';

                currentIndex --;
            }else if( X < (-10) ){
                console.log("向左滑动2");
                if (currentIndex == (list.length - 1)) { //滑动到第最后一个元素，不再滑动
                    X = 0,Y = 0;
                    return false
                }

                outer.style.transform = "translate3d(" + -(winW * (currentIndex + 1)) +"px, 0, 0)";


                //改变过渡的方式，从无动画变为有动画
                outer.style.webkitTransition = '-webkit-transform 0.2s ease-out';

                currentIndex ++;               
            }else{
                _options.thouchFun ? _options.thouchFun(index) : close();
                return false;
            }

            if (_options.isPageNum) {
                updatePageNum((currentIndex + 1),list.length);
            }

            X = 0,Y = 0;


        }   

    }


    var bindEvent = function(){
        framework.bind(outer,'touchstart',touchstartFun);
        framework.bind(outer,'touchmove',touchmoveFun);
        framework.bind(outer,'touchend',touchendFun);
    }

    function unbindEvent(){
        framework.unbind(outer,'touchstart',touchstartFun);
        framework.unbind(outer,'touchmove',touchmoveFun);
        framework.unbind(outer,'touchend',touchendFun);           
    }


    var init = function(){
        addHtml(_options.template);

        var itemDom = outer.childNodes;
        for (var i = 0; i < itemDom.length; i++) {
            if (itemDom[i].nodeType === 1) {
                list.push(itemDom[i]);
                itemDom[i].style.transform = "translate3d("+i * winW +"px,0,0)";
            }
        }        

        //是否需要黑色背景层
        if (_options.isOverlay) {
            addHtmlOverlay();
        }

        if (_options.isClose) {
            addHtmlClose();


            var closeBtn = framework.getChildByClass(outerParent,"close");
            closeBtn.onclick = function(){
                close();
            }         
        }

        if (_options.isPageNum) {
            addHtmlPageNum();   
            updatePageNum(1,list.length);        
        }

        framework.removeClass(outerParent,"hidden");
        outer.style.transform = "translate3d(0,0,0)";

        bindEvent();

    }

    var publicMethods = {
        init:function(){
            init();
        }
    }

    framework.extend(self, publicMethods);    
}


