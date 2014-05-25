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
			hide: 'hide',
			contentDiv: 'main-content'
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

			if (navContentUl.className.indexOf(config.className.hide)!=-1) {
				util.removeClass(navContentUl, config.className.hide);
			} else {
				setTimeout(function(){
					util.addClass(navContentUl, config.className.hide);
				}, 350);
			}
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

				// put content in main-content div
				if (this.getAttribute('data-tag').indexOf('home')!=-1){
					util.getContent(this.getAttribute('data-tag')+'.html', function(data){
						var contentDiv = document.querySelector('.' + config.className.contentDiv);
						contentDiv.innerHTML = '';
						contentDiv.innerHTML = data;
						slider.init();
					});
				} else {
					util.getContent(this.getAttribute('data-tag')+'.html', function(data){
						var contentDiv = document.querySelector('.' + config.className.contentDiv);
						contentDiv.innerHTML = '';
						contentDiv.innerHTML = data;
					});
				}
			});
		});

		// init Home page
		util.getContent('home.html', function(data){
			var contentDiv = document.querySelector('.' + config.className.contentDiv);
			contentDiv.innerHTML = '';
			contentDiv.innerHTML = data;
			slider.init();
		})
	};

}(nav);