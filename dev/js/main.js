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
        MyPage.activeLinkMenuOnScroll();
        MyPage.smoothScroll();
        MyPage.jqueryValidation();
		MyPage.inineSVG();
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
     * @desc mostra/oculta menu mobile
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
     * @desc fecha o menu mobile quando clicado em algum item
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
     * activeLinkMenuOnScroll
     * @access public
     * @desc mostra link ativo no scroll da pagina
     *
     * @return {Void}
     */
    activeLinkMenuOnScroll: function() {
        "use strict";

        var metadeDoDocumento = $(window).height() / 2,
            posInicio = $("#inicio").position().top,
            posSobre = $("#sobre").position().top,
            posPortfolio = $("#portfolio").position().top,
            posContato = $("#contato").position().top,
            ativo = "#a6e22e",
            inativo = "#444";

        $(window).on("scroll", function() {
            var posicaoScroll = $(document).scrollTop();

            if (posicaoScroll == 0 || posicaoScroll > posInicio && posicaoScroll < (posSobre - metadeDoDocumento)) {
                $(".menu svg path").css("fill", inativo);
                $(".menu svg.icon-inicio path").css("fill", ativo);
            } else if (posicaoScroll > (posSobre - metadeDoDocumento) && posicaoScroll < (posPortfolio - metadeDoDocumento)) {
                $(".menu svg path").css("fill", inativo);
                $(".menu svg.icon-sobre path").css("fill", ativo);
            } else if (posicaoScroll > (posPortfolio - metadeDoDocumento) && posicaoScroll < (posContato - metadeDoDocumento)) {
                $(".menu svg path").css("fill", inativo);
                $(".menu svg.icon-portfolio path").css("fill", ativo);
            } else if (posicaoScroll > (posContato - metadeDoDocumento)) {
                $(".menu svg path").css("fill", inativo);
                $(".menu svg.icon-contato path").css("fill", ativo);
            } else {
                return false;
            }
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
    },
    /**
     * inineSVG
     * @access public
     * @desc troca arquivo.svg para svg inline
     *
     * @return {Void}
     */
    inineSVG: function() {
        "use strict";

        $("img.svg").each(function() {
            var img = $(this),
                imgClass = img.attr("class"),
                imgID = img.attr("id"),
                imgURL = img.attr("src");
            
            $.get(imgURL, function(data) {
                var svg = $(data).find("svg");

                if (typeof imgID !== "undefined") {
                    svg = svg.attr("id", imgID);
                }

                if (typeof imgClass !== "undefined") {
                    svg = svg.attr("class", imgClass);
                }

                svg = svg.removeAttr("xmlns:a");
                img.replaceWith(svg);
            });
        });
    }
}

/**
 * document ready
 * @desc quando o documento estiver pronto...
 */
$(document).on("ready", function() {
	"use strict";

    MyPage.init();
});

/**
 * window load
 * @desc volta para o inicio quando recarregar a pagina
 */
$(window).on("load", function() {
    "use strict";

    // va para o inicio
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
});