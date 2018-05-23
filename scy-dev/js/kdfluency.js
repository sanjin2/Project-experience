/*!kdfluency.js 
 *=====================
 * this js is application file for kdfluency
 * @Author zhouhao
 * @version 1.0.0
 */

//Make sure jQuery has been loaded before kdfluency.js
if(typeof jQuery === "undefined") {
	throw new Error("kdfluency requires jQuery");
}

/* kdfluency
 *
 * @type Object
 * @description $.kdfluency is the main object for the template's app.
 * It's used for implementing functions and options related
 * to the template. Keeping everything wrapped in an object
 * prevents conflict with other plugins and is a better
 * way to organize our code.
 */
$.kdfluency = {};

/* --------------------
 * - kdfluency Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.kdfluency.options = {
	//Add slimscroll to navbar menus
	//This requires you to load the slimscroll plugin
	//in every page before app.js
	navbarMenuSlimscroll: true,
	navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
	navbarMenuHeight: "200px", //The height of the inner menu
	//General animation speed for JS animated elements such as box collapse/expand and
	//sidebar treeview slide up/down. This options accepts an integer as milliseconds,
	//'fast', 'normal', or 'slow'
	animationSpeed: 150,
	//Sidebar push menu toggle button selector
	sidebarToggleSelector: "[data_toggle='offcanvas']",
	//Activate sidebar push menu
	sidebarPushMenu: true,
	//Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
	sidebarSlimScroll: true,
	//Enable sidebar expand on hover effect for sidebar mini
	//This option is forced to true if both the fixed layout and sidebar mini
	//are used together
	sidebarExpandOnHover: false,
	//BoxRefresh Plugin
	enableBoxRefresh: true,
	//Bootstrap.js tooltip
	enableBSToppltip: true,
	BSTooltipSelector: "[data_toggle='tooltip']",
	//Enable Fast Click. Fastclick.js creates a more
	//native touch experience with touch devices. If you
	//choose to enable the plugin, make sure you load the script
	//before AdminLTE's app.js
	enableFastclick: false,
	//Control Sidebar Options
	enableControlSidebar: true,
	controlSidebarOptions: {
		//Which button should trigger the open/close event
		toggleBtnSelector: "[data_toggle='control-sidebar']",
		//The sidebar selector
		selector: ".control_sidebar",
		//Enable slide over content
		slide: true
	},
	//Box Widget Plugin. Enable this plugin
	//to allow boxes to be collapsed and/or removed
	enableBoxWidget: true,
	//Box Widget plugin options
	boxWidgetOptions: {
		boxWidgetIcons: {
			//Collapse icon
			collapse: 'fa_minus',
			//Open icon
			open: 'fa_plus',
			//Remove icon
			remove: 'fa_times'
		},
		boxWidgetSelectors: {
			//Remove button selector
			remove: '[data_widget="remove"]',
			//Collapse button selector
			collapse: '[data_widget="collapse"]'
		}
	},
	//Direct Chat plugin options
	directChat: {
		//Enable direct chat by default
		enable: true,
		//The button to open and close the chat contacts pane
		contactToggleSelector: '[data_widget="chat_pane_toggle"]'
	},
	//Define the set of colors to use globally around the website
	colors: {
		lightBlue: "#3c8dbc",
		red: "#f56954",
		green: "#00a65a",
		aqua: "#00c0ef",
		yellow: "#f39c12",
		blue: "#0073b7",
		navy: "#001F3F",
		teal: "#39CCCC",
		olive: "#3D9970",
		lime: "#01FF70",
		orange: "#FF851B",
		fuchsia: "#F012BE",
		purple: "#8E24AA",
		maroon: "#D81B60",
		black: "#222222",
		gray: "#d2d6de"
	},
	//The standard screen sizes that bootstrap uses.
	//If you change these in the variables.less file, change
	//them here too.
	screenSizes: {
		xs: 480,
		sm: 768,
		md: 992,
		lg: 1200
	}
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements kdfluency's
 * functions and plugins as specified by the
 * options above.
 */
$(function() {
	"use strict";

	//Fix for IE page transitions
	$("body").removeClass("hold_transition");

	//Extend options if external options exist
	if(typeof kdfluencyOptions !== "undefined") {
		$.extend(true,
			$.kdfluency.options,
			kdfluencyOptions);
	}

	//Easy access to options
	var o = $.kdfluency.options;

	//Set up the object
	_init();

	//Activate the layout maker
	$.kdfluency.layout.activate();

	//Enable sidebar tree view controls
	$.kdfluency.tree('.sidebar');

	//Enable control sidebar
	if(o.enableControlSidebar) {
		$.kdfluency.controlSidebar.activate();
	}

	//Add slimscroll to navbar dropdown
	if(o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
		$(".navbar .menu").slimscroll({
			height: o.navbarMenuHeight,
			alwaysVisible: false,
			size: o.navbarMenuSlimscrollWidth
		}).css("width", "100%");
	}

	//Activate sidebar push menu
	if(o.sidebarPushMenu) {
		$.kdfluency.pushMenu.activate(o.sidebarToggleSelector);
	}

	//Activate Bootstrap tooltip
	if(o.enableBSToppltip && typeof $('body').tooltip != 'undefined') {
		$('body').tooltip({
			selector: o.BSTooltipSelector
		});
	}

	//Activate box widget
	if(o.enableBoxWidget) {
		$.kdfluency.boxWidget.activate();
	}

	//Activate fast click
	if(o.enableFastclick && typeof FastClick != 'undefined') {
		FastClick.attach(document.body);
	}

	//Activate direct chat widget
	if(o.directChat.enable) {
		$(document).on('click', o.directChat.contactToggleSelector, function() {
			var box = $(this).parents('.direct_chat').first();
			box.toggleClass('direct_chat_contacts_open');
		});
	}

	/*
	 * INITIALIZE BUTTON TOGGLE
	 * ------------------------
	 */
	$('.btn_group[data-toggle="btn_toggle"]').each(function() {
		var group = $(this);
		$(this).find(".btn").on('click', function(e) {
			group.find(".btn.active").removeClass("active");
			$(this).addClass("active");
			e.preventDefault();
		});

	});
});

/* ----------------------------------
 * - Initialize the kdfluency Object -
 * ----------------------------------
 * All kdfluency functions are implemented below.
 */
function _init() {
	'use strict';
	/* Layout
	 * ======
	 * Fixes the layout height in case min-height fails.
	 *
	 * @type Object
	 * @usage $.kdfluency.layout.activate()
	 *        $.kdfluency.layout.fix()
	 *        $.kdfluency.layout.fixSidebar()
	 */
	$.kdfluency.layout = {
		activate: function() {
			var _this = this;
			_this.fix();
			_this.fixSidebar();
			$('body, html, .wrapper,.all_wrap').css('height', 'auto');
			$(window, ".wrapper").resize(function() {
				_this.fix();
				_this.fixSidebar();
			});
		},
		fix: function() {
			// Remove overflow from .wrapper if layout-boxed exists
			$(".layout_boxed > .wrapper").css('overflow', 'hidden');
			//Get window height and the wrapper height
			var neg = $('.main_header').outerHeight() + $('.main_footer').outerHeight();
			var window_height = $(window).height();
			var sidebar_height = $(".sidebar").height();
			var negx = $('.main_header').outerHeight() + $('.ismp_nav_wrap').outerHeight();
			//Set the min-height of the content and sidebar based on the
			//the height of the document.
			if($("body").hasClass("fixed")) {
				$(".cont_wrapper, .right_side").css('min-height', window_height - $('.main_footer').outerHeight());
			} else {
				var postSetWidth;
				if(window_height >= sidebar_height) {
					$(".cont_wrapper, .right_side").css('min-height', window_height - neg);
					postSetWidth = window_height - neg;
				} else {
					$(".cont_wrapper, .right-side").css('min-height', sidebar_height);
					postSetWidth = sidebar_height;
				}

				//Fix for the control sidebar height
				var controlSidebar = $($.kdfluency.options.controlSidebarOptions.selector);
				if(typeof controlSidebar !== "undefined") {
					if(controlSidebar.height() > postSetWidth)
						$(".cont_wrapper, .right_side").css('min-height', controlSidebar.height());
				}

			}
		},
		fixSidebar: function() {
			//Make sure the body tag has the .fixed class
			if(!$("body").hasClass("fixed")) {
				if(typeof $.fn.slimScroll != 'undefined') {
					$(".sidebar").slimScroll({
						destroy: true
					}).height("auto");
				}
				return;
			} else if(typeof $.fn.slimScroll == 'undefined' && window.console) {
				window.console.error("Error: the fixed layout requires the slimscroll plugin!");
			}
			//Enable slimscroll for fixed layout
			if($.kdfluency.options.sidebarSlimScroll) {
				if(typeof $.fn.slimScroll != 'undefined') {
					//Destroy if it exists
					$(".sidebar").slimScroll({
						destroy: true
					}).height("auto");
					//Add slimscroll
					$(".sidebar").slimscroll({
						height: ($(window).height() - $(".main_header").height()) + "px",
						color: "rgba(0,0,0,0.2)",
						size: "3px"
					});
				}
			}
		}
	};

	/* PushMenu()
	 * ==========
	 * Adds the push menu functionality to the sidebar.
	 *
	 * @type Function
	 * @usage: $.kdfluency.pushMenu("[data_toggle='offcanvas']")
	 */
	$.kdfluency.pushMenu = {
		activate: function(toggleBtn) {
			//Get the screen sizes
			var screenSizes = $.kdfluency.options.screenSizes;

			//Enable sidebar toggle
			$(document).on('click', toggleBtn, function(e) {
				e.preventDefault();

				//Enable sidebar push menu
				if($(window).width() > (screenSizes.sm - 1)) {
					if($("body").hasClass('sidebar_collapse')) {
						$("body").removeClass('sidebar_collapse').trigger('expanded.pushMenu');
					} else {
						$("body").addClass('sidebar_collapse').trigger('collapsed.pushMenu');
					}
				}
				//Handle sidebar push menu for small screens
				else {
					if($("body").hasClass('sidebar_open')) {
						$("body").removeClass('sidebar_open').removeClass('sidebar_collapse').trigger('collapsed.pushMenu');
					} else {
						$("body").addClass('sidebar_open').trigger('expanded.pushMenu');
					}
				}
			});

			$(".content_wrapper").click(function() {
				//Enable hide menu when clicking on the content-wrapper on small screens
				if($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar_open")) {
					$("body").removeClass('sidebar_open');
				}
			});

			//Enable expand on hover for sidebar mini
			if($.kdfluency.options.sidebarExpandOnHover ||
				($('body').hasClass('fixed') &&
					$('body').hasClass('sidebar_mini'))) {
				this.expandOnHover();
			}
		},
		expandOnHover: function() {
			var _this = this;
			var screenWidth = $.kdfluency.options.screenSizes.sm - 1;
			//Expand sidebar on hover
			$('.main_sidebar').hover(function() {
				if($('body').hasClass('sidebar_mini') &&
					$("body").hasClass('sidebar_collapse') &&
					$(window).width() > screenWidth) {
					_this.expand();
				}
			}, function() {
				if($('body').hasClass('sidebar_mini') &&
					$('body').hasClass('sidebar_expanded)on_hover') &&
					$(window).width() > screenWidth) {
					_this.collapse();
				}
			});
		},
		expand: function() {
			$("body").removeClass('sidebar_collapse').addClass('sidebar_expanded_on_hover');
		},
		collapse: function() {
			if($('body').hasClass('sidebar_expanded_on_hover')) {
				$('body').removeClass('sidebar_expanded_on_hover').addClass('sidebar_collapse');
			}
		}
	};

	/* Tree()
	 * ======
	 * Converts the sidebar into a multilevel
	 * tree view menu.
	 *
	 * @type Function
	 * @Usage: $.kdfluency.tree('.sidebar')
	 */
	$.kdfluency.tree = function(menu) {
//		alert(111);
		var _this = this;
		var animationSpeed = $.kdfluency.options.animationSpeed;
		$(document).off('click', menu + ' li a')
			.on('click', menu + ' li a', function(e) {
				//Get the clicked link and the next element
//				alert(2222);
				var $this = $(this);
				var checkElement = $this.next();

				//Check if the next element is a menu and is visible
				if((checkElement.is('.treeview_menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar_collapse'))) {
					//Close the menu
					checkElement.slideUp(animationSpeed, function() {
						checkElement.removeClass('menu_open');
						//Fix the layout in case the sidebar stretches over the height of the window
						//_this.layout.fix();
					});
					checkElement.parent("li").removeClass("active");
				}
				//If the menu is not visible
				else if((checkElement.is('.treeview_menu')) && (!checkElement.is(':visible'))) {
					//Get the parent menu
					var parent = $this.parents('ul').first();
					//Close all open menus within the parent
					var menus = parent.find('.treeview_menu').slideUp(animationSpeed);
					//Remove the menu-open class from the parent
					menus.removeClass('menu_open');
					//Get the parent li
					var parent_li = $this.parent("li");

					//Open the target menu and add the menu-open class
					checkElement.slideDown(animationSpeed, function() {
						//Add the class active to the parent li
						checkElement.addClass('menu_open');
						parent.find('li.active').removeClass('active');
						parent_li.addClass('active');
						//Fix the layout in case the sidebar stretches over the height of the window
						_this.layout.fix();
					});
				}
				//if this isn't a link, prevent the page from being redirected
				if(checkElement.is('.treeview_menu')) {
					e.preventDefault();
				}
			});
	};

	/* ControlSidebar
	 * ==============
	 * Adds functionality to the right sidebar
	 *
	 * @type Object
	 * @usage $.kdfluency.controlSidebar.activate(options)
	 */
	$.kdfluency.controlSidebar = {
		//instantiate the object
		activate: function() {
			//Get the object
			var _this = this;
			//Update options
			var o = $.kdfluency.options.controlSidebarOptions;
			//Get the sidebar
			var sidebar = $(o.selector);
			//The toggle button
			var btn = $(o.toggleBtnSelector);

			//Listen to the click event
			btn.on('click', function(e) {
				e.preventDefault();
				//If the sidebar is not open
				if(!sidebar.hasClass('control_sidebar_open') &&
					!$('body').hasClass('control_sidebar_open')) {
					//Open the sidebar
					_this.open(sidebar, o.slide);
				} else {
					_this.close(sidebar, o.slide);
				}
			});

			//If the body has a boxed layout, fix the sidebar bg position
			var bg = $(".control_sidebar_bg");
			_this._fix(bg);

			//If the body has a fixed layout, make the control sidebar fixed
			if($('body').hasClass('fixed')) {
				_this._fixForFixed(sidebar);
			} else {
				//If the content height is less than the sidebar's height, force max height
				if($('.content_wrapper, .right_side').height() < sidebar.height()) {
					_this._fixForContent(sidebar);
				}
			}
		},
		//Open the control sidebar
		open: function(sidebar, slide) {
			//Slide over content
			if(slide) {
				sidebar.addClass('control_sidebar_open');
			} else {
				//Push the content by adding the open class to the body instead
				//of the sidebar itself
				$('body').addClass('control_sidebar_open');
			}
		},
		//Close the control sidebar
		close: function(sidebar, slide) {
			if(slide) {
				sidebar.removeClass('control_sidebar_open');
			} else {
				$('body').removeClass('control_sidebar_open');
			}
		},
		_fix: function(sidebar) {
			var _this = this;
			if($("body").hasClass('layout_boxed')) {
				sidebar.css('position', 'absolute');
				sidebar.height($(".wrapper").height());
				if(_this.hasBindedResize) {
					return;
				}
				$(window).resize(function() {
					_this._fix(sidebar);
				});
				_this.hasBindedResize = true;
			} else {
				sidebar.css({
					'position': 'fixed',
					'height': 'auto'
				});
			}
		},
		_fixForFixed: function(sidebar) {
			sidebar.css({
				'position': 'fixed',
				'max-height': '100%',
				'overflow': 'auto',
				'padding-bottom': '50px'
			});
		},
		_fixForContent: function(sidebar) {
			$(".content_wrapper, .right_side").css('min-height', sidebar.height());
		}
	};

	/* BoxWidget
	 * =========
	 * BoxWidget is a plugin to handle collapsing and
	 * removing boxes from the screen.
	 *
	 * @type Object
	 * @usage $.kdfluency.boxWidget.activate()
	 *        Set all your options in the main $.kdfluency.options object
	 */
	$.kdfluency.boxWidget = {
		selectors: $.kdfluency.options.boxWidgetOptions.boxWidgetSelectors,
		icons: $.kdfluency.options.boxWidgetOptions.boxWidgetIcons,
		animationSpeed: $.kdfluency.options.animationSpeed,
		activate: function(_box) {
			var _this = this;
			if(!_box) {
				_box = document; // activate all boxes per default
			}
			//Listen for collapse event triggers
			$(_box).on('click', _this.selectors.collapse, function(e) {
				e.preventDefault();
				_this.collapse($(this));
			});

			//Listen for remove event triggers
			$(_box).on('click', _this.selectors.remove, function(e) {
				e.preventDefault();
				_this.remove($(this));
			});
		},
		collapse: function(element) {
			var _this = this;
			//Find the box parent
			var box = element.parents(".box").first();
			//Find the body and the footer
			var box_content = box.find("> .box_body, > .box_footer, > form  >.box_body, > form > .box_footer");
			if(!box.hasClass("collapsed_box")) {
				//Convert minus into plus
				element.children(":first")
					.removeClass(_this.icons.collapse)
					.addClass(_this.icons.open);
				//Hide the content
				box_content.slideUp(_this.animationSpeed, function() {
					box.addClass("collapsed_box");
				});
			} else {
				//Convert plus into minus
				element.children(":first")
					.removeClass(_this.icons.open)
					.addClass(_this.icons.collapse);
				//Show the content
				box_content.slideDown(_this.animationSpeed, function() {
					box.removeClass("collapsed_box");
				});
			}
		},
		remove: function(element) {
			//Find the box parent
			var box = element.parents(".box").first();
			box.slideUp(this.animationSpeed);
		}
	};
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function($) {

	"use strict";

	$.fn.boxRefresh = function(options) {

		// Render options
		var settings = $.extend({
			//Refresh button selector
			trigger: ".refresh_btn",
			//File source to be loaded (e.g: ajax/src.php)
			source: "",
			//Callbacks
			onLoadStart: function(box) {
				return box;
			}, //Right after the button has been clicked
			onLoadDone: function(box) {
				return box;
			} //When the source has been loaded

		}, options);

		//The overlay
		var overlay = $('<div class="overlay"><div class="fa fa_refresh fa_spin"></div></div>');

		return this.each(function() {
			//if a source is specified
			if(settings.source === "") {
				if(window.console) {
					window.console.log("Please specify a source first - boxRefresh()");
				}
				return;
			}
			//the box
			var box = $(this);
			//the button
			var rBtn = box.find(settings.trigger).first();

			//On trigger click
			rBtn.on('click', function(e) {
				e.preventDefault();
				//Add loading overlay
				start(box);

				//Perform ajax call
				box.find(".box_body").load(settings.source, function() {
					done(box);
				});
			});
		});

		function start(box) {
			//Add overlay and loading img
			box.append(overlay);

			settings.onLoadStart.call(box);
		}

		function done(box) {
			//Remove overlay and loading img
			box.find(overlay).remove();

			settings.onLoadDone.call(box);
		}

	};

})(jQuery);

/*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
(function($) {

	'use strict';

	$.fn.activateBox = function() {
		$.kdfluency.boxWidget.activate(this);
	};

	$.fn.toggleBox = function() {
		var button = $($.kdfluency.boxWidget.selectors.collapse, this);
		$.kdfluency.boxWidget.collapse(button);
	};

	$.fn.removeBox = function() {
		var button = $($.kdfluency.boxWidget.selectors.remove, this);
		$.kdfluency.boxWidget.remove(button);
	};

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function($) {

	'use strict';

	$.fn.todolist = function(options) {
		// Render options
		var settings = $.extend({
			//When the user checks the input
			onCheck: function(ele) {
				return ele;
			},
			//When the user unchecks the input
			onUncheck: function(ele) {
				return ele;
			}
		}, options);

		return this.each(function() {

			if(typeof $.fn.iCheck != 'undefined') {
				$('input', this).on('ifChecked', function() {
					var ele = $(this).parents("li").first();
					ele.toggleClass("done");
					settings.onCheck.call(ele);
				});

				$('input', this).on('ifUnchecked', function() {
					var ele = $(this).parents("li").first();
					ele.toggleClass("done");
					settings.onUncheck.call(ele);
				});
			} else {
				$('input', this).on('change', function() {
					var ele = $(this).parents("li").first();
					ele.toggleClass("done");
					if($('input', ele).is(":checked")) {
						settings.onCheck.call(ele);
					} else {
						settings.onUncheck.call(ele);
					}
				});
			}
		});
	};
}(jQuery));

/**
 * kadacom ajaxtojson
 * @param $
 */
(function($) {
	$.jsonAjax = function(obj) {
		if(!obj.type) {
			obj.type = "post";
		}

		var data = null;
		if("post" == obj.type || "POST" == obj.type) {
			if(null == obj.data) throw "data is null ！";
			try {
				obj.data = JSON.stringify(obj.data);
			} catch(err) {
				throw "不支持该数据类型！";
			}
		}

		if(null == obj.url) throw "url is null ！";
		if(!obj.dataType) {
			obj.dataType = "json";
		}
		if(typeof(obj.global) == "undefined") {
			obj.global = true;
		}
		if(typeof(obj.processData) == "undefined") {
			obj.processData = true;
		}
		obj.contentType = "application/json;charset=utf-8";

		return $.ajax(obj);
	}
})(jQuery);

/**
 * 数据时间轴
 */
(function($) {
	var dataAxis_settings = {};
	var dataAxisTools = {
		formatSeconds: function(value) {
			var a = parseInt(value); // 秒 
			var hh = parseInt(a / 3600);
			if(hh < 10) hh = "0" + hh;
			var mm = parseInt((a - hh * 3600) / 60);
			if(mm < 10) mm = "0" + mm;
			var ss = parseInt((a - hh * 3600) % 60);
			if(ss < 10) ss = "0" + ss;
			var result = hh + ":" + mm + ":" + ss;
			if(a > 0) {
				return result;
			} else {
				return "NaN";
			}
		}
	};

	$.fn.dataAxis = {
		init: function(axisId, options) {
			var setting = $.extend({
				numBlocks: 24, //Number of blocks
				blockColor: "#FEFEFE",
				blockColorActive: "#0A78C7",
				blockSize: "10px",
				radius: "0",
				randomColors: false, //random colors on switch
				ymdTime: "1970-01-01",
				scalePos: 0
			}, options);
			var obj = $("#" + axisId);
			setting.axisId = axisId;
			setting.axisObj = obj;
			setting.axisObj.empty();
			setting.scale = $('<ul><li style="display:inline-block;border-left:2px solid #00ff00;height:100%"></li></ul>');
			setting.blockBox = $('<ul class="axisBlockBox"></ul>');
			dataAxis_settings[axisId] = setting;

			obj.click(function(e) {
				setting.scale.css('left', e.originalEvent.layerX);
				setting.scalePos = e.originalEvent.layerX;
			});

			obj.mousemove(function(e) {
				if(0 == e.originalEvent.layerX) {
					return
				}
				var second = e.originalEvent.layerX * 86400 / setting.blockBox.width();
				if(second > 86400) second = 86400;
				var dayTime = dataAxisTools.formatSeconds(second);
				obj.attr('title', setting.ymdTime + " " + dayTime);
			});

			obj.css({
				'position': 'relative',
				'cursor': 'pointer'
			});
			setting.blockBox.appendTo(obj);
			setting.blockBox.css({
				'position': 'absolute',
				'overflow': 'hidden',
				height: '100%',
				width: '100%',
				margin: 0,
				padding: 0,
				'z-index': 10000
			});

			setting.scale.css({
				'position': 'absolute',
				'margin': 0,
				'padding': 0,
				'height': '100%',
				'left': '10px',
				'z-index': 10001
			});

			setting.scale.appendTo(obj);
			for(var i = 0; i < setting.numBlocks; i++) {
				var percent = (i + .5) * (100 / setting.numBlocks);
				var block = $('<li class="axisBlock"></li>').data("pos", percent);
				block.appendTo(setting.blockBox);
				block.appendTo(setting.blockBox);
			}

			var $blocksSelelector = setting.blockBox.find(".axisBlock");
			var blockWidth = setting.blockBox.width() / setting.numBlocks;
			$blocksSelelector.css({
				height: "100%",
				width: blockWidth
			});
		},
		destroy: function(axisId) {
			var setting = dataAxis_settings[axisId];
			if(null == setting) {
				return;
			}
			$("#" + axisId).empty();
			delete dataAxis_settings[axisId];
			dataAxis_settings[axisId] = null;
		},
		setDate: function(axisId, _date) {
			var setting = dataAxis_settings[axisId];
			if(null == setting) {
				return;
			}
			if(_date) {
				setting.ymdTime = _date;
			}
		},
		setData: function(axisId, _bolckFlags) {
			var setting = dataAxis_settings[axisId];
			if(null == setting) {
				return;
			}
			if(_bolckFlags.length < setting.numBlocks) {
				return;
			}
			setting.blockBox.find(".axisBlock").removeClass("active");
			setting.blockBox.find(".axisBlock").each(function() {
				if(_bolckFlags[$(this).index()] > 0) {
					$(this).addClass("active");
				}
			})
		}
	};
})(jQuery);

/**
 * unix utc和普通时间互转
 * @param $
 */
(function($) {
	$.extend({
		myTime: {
			/**
			 * 当前时间戳
			 * @return <int>    unix时间戳(秒) 
			 */
			CurTime: function() {
				return Date.parse(new Date()) / 1000;
			},
			/**       
			 * 日期 转换为 Unix时间戳
			 * @param <string> 2014-01-01 20:20:20 日期格式       
			 * @return <int>    unix时间戳(秒)       
			 */
			DateToUnix: function(string) {
				var f = string.split(' ', 2);
				var d = (f[0] ? f[0] : '').split('-', 3);
				var t = (f[1] ? f[1] : '').split(':', 3);
				return(new Date(
					parseInt(d[0], 10) || null,
					(parseInt(d[1], 10) || 1) - 1,
					parseInt(d[2], 10) || null,
					parseInt(t[0], 10) || null,
					parseInt(t[1], 10) || null,
					parseInt(t[2], 10) || null
				)).getTime() / 1000;
			},
			/**       
			 * 时间戳转换日期       
			 * @param <int> unixTime  待时间戳(秒)       
			 * @param <bool> isFull  返回完整时间(Y-m-d 或者 Y-m-d H:i:s)       
			 * @param <int> timeZone  时区       
			 */
			UnixToDate: function(unixTime, isFull, timeZone) {
				if(typeof(timeZone) == 'number') {
					unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
				}
				var time = new Date(unixTime * 1000);
				var ymdhis = "";
				ymdhis += time.getUTCFullYear() + "-";
				ymdhis += (time.getUTCMonth() + 1) + "-";
				ymdhis += time.getUTCDate();
				if(isFull === true) {
					ymdhis += " " + time.getUTCHours() + ":";
					ymdhis += time.getUTCMinutes() + ":";
					ymdhis += time.getUTCSeconds();
				}
				return ymdhis;
			}
		}
	});
})(jQuery);

/**
 * 表单序列化成Json对象
 */
$.fn.formToJson = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if(o[this.name]) {
			if(!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
return o;
}