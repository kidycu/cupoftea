// slider.js by Tony Lee

var slider = {};

!function(obj){
	'use strict';
	
	// ============== PROPERTIES ==============

	var config = {
		className: {
			wrapper: 'slider-wrapper',
			content: 'slider-content',
			control: 'slider-control',
			active: 'active',
			next: 'next',
			prev: 'prev',
			item: 'item',
			left: 'left',
			right: 'right'
		}
	};

	var prop = {
		scope: null,
		sliding: false,
		controls: {
			left: null,
			right: null
		},
		items: [],
		activeIndex: null,
		nextIndex: null,
		prevIndex: null,

		init: function () {
			this.scope = document.querySelector('.'+config.className.wrapper);
			this.items = [];
			var nodeList = this.scope.querySelectorAll('.' + config.className.item);
			for(var i = nodeList.length; i--; this.items.unshift(nodeList[i]));
			this.controls.left = this.scope.querySelector('.' + config.className.control + '.' + config.className.left);
			this.controls.right = this.scope.querySelector('.' + config.className.control + '.' + config.className.right);
			var activeItem = this.scope.querySelector('.' + config.className.content + ' .' + config.className.active);
			this.activeIndex = this.items.indexOf(activeItem);
			this.nextIndex = this.activeIndex + 1;
			this.prevIndex = this.activeIndex - 1;
			if (this.nextIndex >= this.items.length) this.nextIndex = 0;
			if (this.prevIndex < 0) this.prevIndex = this.items.length-1;
			var nextItem = this.items[this.nextIndex];
			var prevItem = this.items[this.prevIndex];
			nextItem.className += ' ' + config.className.next;
			prevItem.className += ' '+ config.className.prev;
		}
	};

	var touchs = {
		values: {
			action: ['superFastClick','fastClick','swipeLeft','swipeRight','swipeUp','swipeDown'],
			mouseOrTouch: (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)?'touch':'mouse'),
			isClick: 1,
			buttonIsDown: 0,
			startX: 0,
			startY: 0,
			eventX: 0,
			eventY: 0,
			x: 0,
			y: 0,
			dx: 0,
			dy: 0
		},
		init: function(){
			for(var eventType in this.eventFunc[this.values.mouseOrTouch]){
				document.addEventListener(eventType,this.eventFunc[this.values.mouseOrTouch][eventType])
			};
		},
		add: function(elm){
			elm.addEventListener('swipeLeft', obj.leftNext);
			elm.addEventListener('swipeRight', obj.rightPrev);
			elm.addEventListener('touchstart', function(e){e.preventDefault()});
		},
		customEventFunc: function(e,name){
		    var aEvent = new Event(name);
		    e.target.dispatchEvent(aEvent);
		},
		eventFunc: {
			touch:{
				touchstart: function(e){
					touchs.values.startX=e.touches[0].pageX;
					touchs.values.startY=e.touches[0].pageY;
					touchs.customEventFunc(e,'superFastClick');
				},
				touchmove: function(e){
					touchs.values.isClick = 0;
					touchs.values.eventX = e.touches[0].pageX;
					touchs.values.eventY = e.touches[0].pageY;
				},
				touchend: function(e){
					var eventName;
					if (touchs.values.isClick) {
						eventName = 'fastClick';
					} else {
						touchs.values.isClick = 1;
						touchs.values.x = touchs.values.eventX - touchs.values.startX;
						touchs.values.dx = Math.abs(touchs.values.x);
						touchs.values.y = touchs.values.eventY - touchs.values.startY;
						touchs.values.dy = Math.abs(touchs.values.y);
						if (Math.max(touchs.values.dx, touchs.values.dy) > 20) {
							if(touchs.values.dx>touchs.values.dy) {
								// horizontal action
								eventName = touchs.values.x<0 ? 'swipeLeft' : 'swipeRight';
							} else {
								// Vertical action
								eventName = touchs.values.y<0 ? 'swipeUp' :'swipeDown';
							}
						} else {
							eventName = 'fastClick';
						}
					}
					touchs.customEventFunc(e,eventName);
				},
				touchcancel: function(e){
					touchs.values.isClick = 0;
				}  
			},
			mouse:{
				mousedown: function(e){ 
					if (!e.button) {
						touchs.values.buttonIsDown = 1;
						touchs.values.startX = e.x;
						touchs.values.startY = e.y;
						touchs.customEventFunc(e,'superFastClick');
					}
				},
				mousemove: function(e){
					if (touchs.values.buttonIsDown){
						touchs.values.isClick = 0;
						touchs.values.eventX = e.x;
						touchs.values.eventY = e.y;
					}
				},
				mouseup: function(e){
					if (!e.button){
						touchs.values.buttonIsDown = 0;
						var eventName;
						if (touchs.values.isClick){
							eventName = 'fastClick';
						} else {
							touchs.values.isClick = 1;
							touchs.values.x = touchs.values.eventX - touchs.values.startX;
							touchs.values.dx = Math.abs(touchs.values.x);
							touchs.values.y = touchs.values.eventY - touchs.values.startY;
							touchs.values.dy = Math.abs(touchs.values.y);
							if (Math.max(touchs.values.dx,touchs.values.dy) > 20) {
								if (touchs.values.dx > touchs.values.dy) {
									// Horizontal action
									eventName = touchs.values.x<0 ? 'swipeLeft' : 'swipeRight';
								} else {
									// Vertical action
									eventName = touchs.values.y<0 ? 'swipeUp' : 'swipeDown';
								}
							} else {
								eventName = 'fastClick';
							}
						}
						touchs.customEventFunc(e,eventName);
					}
				}
			}
		}
		
	};


	// ============== SLIDER CLASS ==============
	
	obj.init = function () {
		prop.init();
		prop.controls.left.addEventListener('click', obj.leftNext);
		prop.controls.right.addEventListener('click', obj.rightPrev);
		touchs.init();
		Array.prototype.forEach.call(prop.items, function(el, i){
			el.ondragstart = function(){return false;};
			touchs.add(el);
		});
	};

	obj.leftNext = function () {
	    if (prop.sliding) return;
	    prop.sliding = true;
	    obj.clear();
		prop.activeIndex++;
		prop.nextIndex++;
		prop.prevIndex++;
		if (prop.activeIndex >= prop.items.length) prop.activeIndex = 0;
		if (prop.nextIndex >= prop.items.length) prop.nextIndex = 0;
		if (prop.prevIndex >= prop.items.length) prop.prevIndex = 0;
	    obj.slide();
	};

	obj.rightPrev = function () {
	    if (prop.sliding) return;
	    prop.sliding = true;
	    obj.clear();
		prop.activeIndex--;
		prop.nextIndex--;
		prop.prevIndex--;
		if (prop.activeIndex < 0) prop.activeIndex = prop.items.length-1;
		if (prop.nextIndex < 0) prop.nextIndex = prop.items.length-1;
		if (prop.prevIndex < 0) prop.prevIndex = prop.items.length-1;
	    obj.slide();
	};

	obj.clear = function () {
		var activeItem = prop.items[prop.activeIndex];
		var nextItem = prop.items[prop.nextIndex];
		var prevItem = prop.items[prop.prevIndex];
		activeItem.className = activeItem.className.replace(' ' + config.className.active,'');
		nextItem.className = nextItem.className.replace(' ' + config.className.next,'');
		prevItem.className = prevItem.className.replace(' ' + config.className.prev,'');
	};

	obj.slide = function () {
		var activeItem = prop.items[prop.activeIndex];
		var nextItem = prop.items[prop.nextIndex];
		var prevItem = prop.items[prop.prevIndex];
		activeItem.className += ' ' + config.className.active;
		nextItem.className += ' ' + config.className.next;
		prevItem.className += ' ' + config.className.prev;
		setTimeout( function(){
			prop.sliding = false;
		}, 300);
	};

	
}(slider);


