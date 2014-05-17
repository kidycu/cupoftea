// slider.js by Tony Lee

var util = {};

(function(obj){
	'use strict';
	
	// ============== PROPERTIES ==============

	var config = {
	}

	obj.fade = function () {
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

	obj.addClass = function (el, className) {
		if (el.classList) {
			el.classList.add(className);
		}
		else {
			el.className += ' ' + className;
		}
	}

	obj.removeClass = function (el, className) {
		if (el.classList) {
			el.classList.remove(className);
		}
		else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	obj.toggle = function (el, className) {
		if (el.classList) {
		  el.classList.toggle(className);
		} else {
		  var classes = el.className.split(' ');
		  var existingIndex = classes.indexOf(className);

		  if (existingIndex >= 0)
		    classes.splice(existingIndex, 1);
		  else
		    classes.push(className);
		  el.className = classes.join(' ');
		}
	}

})(util);