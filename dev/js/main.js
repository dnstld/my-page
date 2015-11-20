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
        MyPage.toggleMenu();
        MyPage.portfolioOffline();
		MyPage.jqueryValidation();
	},
     /**
     * alturaPaginaInicial
     * @access public
     * @desc define altura da pagina inicial
     *
     * @return {Void}
     */
    alturaPaginaInicial: function() {
        "use strict";

        var altura = $(window).height();

        $(".inicio").css("height", altura);

        MyPage.centralizaPaginaInicial();
     },
     /**
     * centralizaPaginaInicial
     * @access public
     * @desc centraliza conteudo da pagina inicial
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
     * toggleMenu
     * @access public
     * @desc mostra/oculta do menu
     *
     * @return {Void}
     */
	toggleMenu: function() {
		"use strict";

		var iconMenu = $("span.icon-menu");

		iconMenu.on("click", function() {
			$("nav").toggleClass("mostraMenu");
		});
	},
    /**
     * portfolioOffline
     * @access public
     * @desc configuracao do plugin para o portfolio offline
     *
     * @return {Void}
     */
    portfolioOffline: function() {
        "use strict";

        $(".offline").slick({
            accessibility: true,
            autoplay: false,
            autoplaySpeed: 5000,
            adaptiveHeight: true,
            arrows: false,
            centerPadding: "50px",
            centerMode: true,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        arrows: true,
                        slidesToShow: 3,
                        centerPadding: 0
                    }
                }
            ]
        });
    },
     /**
     * jqueryValidation
     * @access public
     * @desc valida e submita o formulario de contato
     *
     * @return {Void}
     */
    jqueryValidation: function() {
        "use strict";

        var txtBotaoEnviar = $("input[type=submit");
        txtBotaoEnviar.val("Enviar");

        jQuery.validator.setDefaults({
            errorClass: "errorClass icon-close",
            errorElement: "div",
            validClass: "validClass"
        });

        $("#formulario").validate({
            rules: {
                nome: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                mensagem: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: "Digite seu nome",
                    minlength: jQuery.validator.format("Digite seu nome com no mínimo {0} caracteres.")
                },
                email: {
                    required: "Digite seu e-mail",
                    email: "Por favor, insira um e-mail válido."
                },
                mensagem: {
                    required: "Digite sua mensagem"
                }
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                //$(element.form).find("label[for=" + element.id + "]").addClass(errorClass);
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                //$(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
            },
            submitHandler: function(form) {
                var dados = $(form).serialize();

                $.ajax({
                    type: "POST",
                    url: "public/novo/php/formulario.php",
                    dataType: "html",
                    data: dados,
                    beforeSend: function() {
                        txtBotaoEnviar.val("Enviando...");
                    },
                    success: function(response) {
                        console.log("success: " + response);
                        form.submit();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
                });
            }
        });
    }
}

$(function() {
	"use strict";

	MyPage.init();
});