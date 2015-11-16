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

          MyPage.alturaPaginaInicial();
		MyPage.mostraMenu();
	},
     /**
     * define altura 100% da pagina inicial
     * @access public
     * @desc inicializa
     *
     * @return {Void}
     */
     alturaPaginaInicial: function() {
          "use strict";

          var altura = $(document).height();

          $(".inicio").css("height", altura);

          MyPage.centralizaPaginaInicial();
     },
     /**
     * centraliza pagina inicial
     * @access public
     * @desc inicializa
     *
     * @return {Void}
     */
     centralizaPaginaInicial: function() {
          "use strict";

          $(".dadosIniciais").center($(document));
     },
	/**
     * show hide menu
     * @access public
     * @desc inicializa
     *
     * @return {Void}
     */
	mostraMenu: function() {
		"use strict";

		var iconMenu = $("span.icon-menu");

		iconMenu.on("click", function() {
			$("nav").toggleClass("mostraMenu");
		});
	}
}

$(function() {
	"use strict";

	MyPage.init();
});