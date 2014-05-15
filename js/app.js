// slider.js by Tony Lee

var slider = {};

(function(obj){
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
			slideImg: 'slide',
			left: 'left',
			right: 'right'
		}
	}

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
			this.scope = document.querySelector('.'+config.className.wrapper) || document;
			this.items = [];
			var nodeList = this.scope.querySelectorAll('.' + config.className.slideImg);
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
	}


	// ============== UTILiTIES ==============

	var util = {
		fade: function () {
			var level = 1;
			var step = function ( ) {
				var hex = level.toString(16);
				document.body.style.backgroundColor = '#FFFF' + hex + hex;
				if (level < 15) {
					level += 1;
					setTimeout(step, 100);
				}
			};
			setTimeout(step, 100);
		}
	}


	// ============== SLIDER CLASS ==============
	obj.init = function () {
		util.fade();
		prop.init();
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
		}, 600);
	};

	
})(slider);
