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
			cueCloseIcon: 'nav-cue-close-icon',
			cueOpenIcon: 'nav-cue-open-icon',
			active: 'nav-active',
			none: 'none',
			hide: 'hide'
		}
	};

	var prop = {};

	obj.init = function(){
		var cueElm = document.querySelector('.' + config.className.cue);
		cueElm.addEventListener('click', function(){
			var navCueIcon = document.querySelector('.' + config.className.cue + ' div');
			var navContent = document.querySelector('.' + config.className.content);
			var navContentUl = document.querySelector('.' + config.className.content + ' ul');
		
			util.toggle(navCueIcon, config.className.cueCloseIcon);
			util.toggle(navCueIcon, config.className.cueOpenIcon);
			util.toggle(navContent, config.className.contentShow);
			setTimeout(function(){
				util.toggle(navContentUl, config.className.hide);
			}, 240);
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