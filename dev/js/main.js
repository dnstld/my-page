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
        MyPage.closeMenu();
        MyPage.activeLinkMenu();
        MyPage.smoothScroll();
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
     * closeMenu
     * @access public
     * @desc scroll
     *
     * @return {Void}
     */
    closeMenu: function() {
        "use strict";

        $(".menu a").on("click", function() {
            $("nav").toggleClass("mostraMenu");
        });
    },
    /**
     * activeLinkMenu
     * @access public
     * @desc scroll
     *
     * @return {Void}
     */
    activeLinkMenu: function() {
        "use strict";

        $(".menu a.menu-principal").on("click", function() {
            $(".menu a span").removeClass("ativo");

            $(this).find("span").addClass("ativo");
        });
    },
    /**
     * smoothScroll
     * @access public
     * @desc scroll
     *
     * @return {Void}
     */
    smoothScroll: function() {
        "use strict";

        $(".menu a").smoothScroll({
            easing: "swing",
            speed: 500,
            preventDefault: true
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

        MyPage.popupPortfolio();
    },
    /**
     * portfolioOffline
     * @access public
     * @desc configuracao do plugin para o portfolio offline
     *
     * @return {Void}
     */
    popupPortfolio: function() {
        "use strict";

        $(".popup-link").magnificPopup({
            type: "image"
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

        var botaoEnviar = $("button"),
            formulario = $("#formulario");

        jQuery.validator.setDefaults({
            errorClass: "errorClass icon-close",
            errorElement: "div",
            validClass: "validClass"
        });

        botaoEnviar.on("click", function() {
            formulario.validate({
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
                        required: "Qual é seu nome?",
                        minlength: jQuery.validator.format("Ele deve conter no mínimo {0} caracteres.")
                    },
                    email: {
                        required: "Qual é seu e-mail?",
                        email: "Por favor, insira um e-mail válido."
                    },
                    mensagem: {
                        required: "Escreva sua mensagem."
                    }
                },
                highlight: function(element, errorClass, validClass) {
                    $(element).addClass(errorClass).removeClass(validClass);
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).removeClass(errorClass).addClass(validClass);
                },
                submitHandler: function(form) {
                    var dados = $(form).serialize();

                    $.ajax({
                        type: "POST",
                        url: "processa.php",
                        data: dados,
                        dataType: "text",
                        cache: false,
                        beforeSend: function() {
                            botaoEnviar.text("Enviando...");
                        },
                        complete: function() {
                            botaoEnviar.text("Aguardando retorno...");
                        },
                        success: function() {
                            setTimeout(function() {
                                botaoEnviar.addClass("sucesso").text("Obrigado pelo contato.");

                                setTimeout(function() {
                                    botaoEnviar.removeClass("sucesso").text("Enviar");
                                }, 2000);
                            }, 2000);

                            $("#nome, #email, #mensagem").val("");
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(thrownError);
                        }
                    });

                    return false;
                }
            });
        });
    }
}

$(function() {
	"use strict";

	MyPage.init();
});