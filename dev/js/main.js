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
     * alturaPaginaInicial
     * @access public
     * @desc define altura 100% da pagina inicia
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
     * centralizaPaginaInicial
     * @access public
     * @desc centraliza pagina inicial
     *
     * @return {Void}
     */
     centralizaPaginaInicial: function() {
          "use strict";

          $(".dadosIniciais").css("position", "relative");
          $(".dadosIniciais").css("top", Math.max(0, (($(".inicio").height() - $(".dadosIniciais").outerHeight()) / 2) + $(".inicio").scrollTop()) + "px");
          $(".dadosIniciais").css("left", Math.max(0, (($(".inicio").width() - $(".dadosIniciais").outerWidth()) / 2) + $(".inicio").scrollLeft()) + "px");

          return this;
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