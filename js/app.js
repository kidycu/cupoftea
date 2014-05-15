// app.js by Tony Lee

var sliderApp = {};

(function(obj){
	'use strict';

	// ============== FEATURE DETECT ==============
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function (fn, scope) {
			var i, len;
			for (i = 0, len = this.length; i < len; ++i) {
				if (i in this) {
					fn.call(scope, this[i], i, this);
				}
			}
		};
	}
	
	// ============== PROPERTIES ==============

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

		init: function (node) {
			this.scope = node;
			this.items = [];
			var nodeList = node.querySelectorAll('img.slide');
			for(var i = nodeList.length; i--; this.items.unshift(nodeList[i]));
			this.controls.left = node.querySelector('.slider-control.left');
			this.controls.right = node.querySelector('.slider-control.right');
			var activeItem = this.scope.querySelector('.slide.active');
			this.activeIndex = this.items.indexOf(activeItem);
			this.nextIndex = this.activeIndex + 1;
			this.prevIndex = this.activeIndex - 1;
			if (this.nextIndex >= this.items.length) this.nextIndex = 0;
			if (this.prevIndex < 0) this.prevIndex = this.items.length-1;
			var nextItem = this.items[this.nextIndex];
			var prevItem = this.items[this.prevIndex];
			nextItem.className = nextItem.className + ' next';
			prevItem.className = prevItem.className + ' prev';
		}
	}


	// ============== UTILiTIES ==============

	var util = {
		fade: function (node) {
			var level = 1;
			var step = function ( ) {
				var hex = level.toString(16);
				node.style.backgroundColor = '#FFFF' + hex + hex;
				if (level < 15) {
					level += 1;
					setTimeout(step, 100);
				}
			};
			setTimeout(step, 100);
		}
	}


	// ============== SLIDER CLASS ==============
	obj.init = function (node) {
		util.fade(document.body);
		prop.init(node || document);
		prop.controls.left.addEventListener('click', obj.leftNext);
		prop.controls.right.addEventListener('click', obj.rightPrev);
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
		activeItem.className = activeItem.className.replace(' active','');
		nextItem.className = nextItem.className.replace(' next','');
		prevItem.className = prevItem.className.replace(' prev','');
	};

	obj.slide = function () {
		var activeItem = prop.items[prop.activeIndex];
		var nextItem = prop.items[prop.nextIndex];
		var prevItem = prop.items[prop.prevIndex];
		activeItem.className = activeItem.className + ' active';
		nextItem.className = nextItem.className + ' next';
		prevItem.className = prevItem.className + ' prev';
		setTimeout( function(){
			prop.sliding = false;
		}, 600);
	};

	
})(sliderApp);
