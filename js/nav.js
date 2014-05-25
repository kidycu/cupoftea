// nav.js by Tony Lee

var nav = {};

!function(obj){
	'use strict';


	// ============== PROPERTIES ==============

	var config = {
		className: {
			wrapper: 'nav-wrapper',
			content: 'nav-content',
			contentShow: 'nav-content-show',
			logo: 'nav-logo',
			cue: 'nav-cue',
			active: 'nav-active',
			none: 'none'
		}
	};

	var prop = {};

	obj.init = function(){
		var cueElm = document.querySelector('.' + config.className.cue);
		cueElm.addEventListener('click', function(){
			var navCueImg = document.querySelectorAll('.' + config.className.cue + ' img');
			var navContent = document.querySelector('.' + config.className.content);
		
			util.toggle(navCueImg[0], config.className.none);
			util.toggle(navCueImg[1], config.className.none);
			util.toggle(navContent, config.className.contentShow);
		});

		var itemElms = document.querySelectorAll('.' + config.className.content + " > ul > li > a");
		Array.prototype.forEach.call(itemElms, function(el, i){
			el.addEventListener('click', function(){
				// clear all active class
				var itemElms = document.querySelectorAll('.' + config.className.content + " > ul > li > a");
				Array.prototype.forEach.call(itemElms, function(el, i){
					util.removeClass(el, config.className.active);
				});

				// add active class
				util.addClass(this, config.className.active);
			});
		});
	};


}(nav);