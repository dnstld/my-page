var MyPage = {
	/**
     * instances
     * @access public
     * @desc instancias
     *
     * @type {Object}
     */
	instances: {},
	/**
     * variables
     * @access public
     * @desc variaveis
     *
     * @type {Object}
     */
	variables: {},
	/**
     * init
     * @access public
     * @desc inicializa
     *
     * @return {Void}
     */
	init: function() {
		"use strict";

		MyPage.showMenu();
	},
	/**
     * show hide menu
     * @access public
     * @desc inicializa
     *
     * @return {Void}
     */
	showMenu: function() {
		"use strict";

		var iconMenu = $("span.icon-menu");

		iconMenu.on("click", function() {
			$("nav").toggleClass("showMenu");
		});
	}
}

$(function() {
	"use strict";

	MyPage.init();
});