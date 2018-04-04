//Original:
/*var frase = jQuery(".frase");
console.log(frase);*/

//TEMPO DE DIGITAÇÃO INICIAL
var tempoInicial = $("#tempo-digitacao").text();
//OBJETO JQUERY CAMPO
var campo = $(".campo-digitacao");
//VAR TRAVA
var trava;

//Função executa ON LOAD
$(function () {
    console.log("Pagina Carregada!");
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaMarcadores();
    inicializaCronometro();
    atualizaPlacar();
    insereSelectize();
    ativaTooltipster();
    $("#botao-reiniciar").click(reiniciaJogo);
    $(".botao-remover").click(removeLinha);
    $("#botao-placar").click(alternaPlacar);
    $("#botao-frase").click(fraseAleatoria);
    $("#botao-select").click(buscaFrase);
    $("#botao-sync").click(sincronizaPlacar);

})

function ativaTooltipster() {
    $('.tooltip').tooltipster({
        theme: 'tooltipster-punk',
        side: 'bottom'
    });
}

function insereSelectize() {
    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });
}

function atualizaTamanhoFrase() {
    //PULL USANDO JQUERY ABREVIADO
    var frase = $(".frase").text(); //Salva apenas o conteúdo de texto do .frase (não o objeto)
    var fraseArray = frase.split(" "); //gera um array com cada palavra separada por espaços
    var numPalavras = fraseArray.length;
    //console.log(frase);
    //console.log(fraseArray);
    //console.log(numPalavras);

    //CONTADOR DE PALAVRAS DO ENUNCIADO
    var tamanhoFrase = $("#tamanho-Frase"); //Salva na variável tamanhoFrase o objeto jquery da #tamanho-frase
    //console.log(tamanhoFrase);

    tamanhoFrase.text(numPalavras); //substitui o conteúdo original pelo conteúdo da var numPalavras
}

function atualizaTempoInicial(tempo) {
    $("#tempo-digitacao").text(tempo);
    tempoInicial = tempo; //sobrescreve o tempo inicial estabelecido
}

function atualizaTempoEnunciado(tempo) {
    $("#tempo-enunciado").text(tempo);
}

//CAPTURA DE ENTRADA AUTOMÁTICA

function inicializaContadores() {
    campo.on("input", function () {
        //console.log("Digitado!");
        //console.log(campo.val());

        var conteudo = campo.val(); //Como é um input, a entrada se dá por value, ao invés de text
        var qtdPalavras = conteudo.split(/\s+/).length - 1; //separa a entrada obtida na linha anterior, baseado em espaços e então mede o tamanho do array
        //console.log(qtdPalavras);
        //console.log(conteudo.length);

        $("#contador-palavras").text(qtdPalavras); //Altera o texto da id contador-palavras para o valor da qtdPalavras
        $("#contador-caracteres").text(conteudo.length); //Altera o texto da id contador-caracteres para o valor do comprimento da string
    });
}

//CONTADOR DE TEMPO

function inicializaCronometro() {
    campo.one("focus", function () { //quando selecionado, ONE executa o evento UMA VEZ APENAS
        var tempoRestante = $("#tempo-digitacao").text(); //utilizar essa var internamente ao .one a deixa responsiva a alteração de tempo
        //console.log(tempoRestante);

        $("#botao-reiniciar").attr("disabled", true); //DESATIVA BOTOES DE REINICIAR, PLACAR E TROCAR TEXTO DURANTE UMA SESSAO
        $("#botao-placar").attr("disabled", true);
        $("#botao-frase").attr("disabled", true);
        $("#botao-select").attr("disabled", true);
        $("#botao-sync").attr("disabled", true);

        var cronometroID = setInterval(function () {
            tempoRestante--; //reduz em 1 segundo
            //console.log(tempoRestante);
            $("#tempo-digitacao").text(tempoRestante); //substitui o texto do tempo de digitação

            if (tempoRestante == 0) { //GAME OVER
                clearInterval(cronometroID);
                finalizaJogo();
            }

        }, 1000); //Executa a função a cada 1000ms
    });

}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    campo.removeClass("borda-campo-NOK");
    campo.removeClass("borda-campo-OK");

    $("#contador-palavras").text("0"); //iguala a 0 o texto da id contador-palavras 
    $("#contador-caracteres").text("0"); //iguala a 0 o texto da id  contador-caracteres
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desabilitado"); //também pode ser utilizado toggleClass em ambos
    $(".erroCopia").hide();
}

function inicializaMarcadores() {
    campo.on("input", function () {
        var frase = $(".frase").text(); // deve ser dentro para varia junto com alterações de frase
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (comparavel == digitado) {
            campo.removeClass("borda-campo-NOK");
            campo.addClass("borda-campo-OK");
            trava = false;
        } else {
            campo.removeClass("borda-campo-OK");
            campo.addClass("borda-campo-NOK");
            trava = true;
        }
        //console.log(frase);
        //console.log(digitado);
    });
}

function finalizaJogo() {
    // console.log(campo.attr("class")); demonstrando o uso da função atributo
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    $("#botao-placar").attr("disabled", false);
    $("#botao-frase").attr("disabled", false);
    $("#botao-select").attr("disabled", false);
    $("#botao-sync").attr("disabled", false);

    //campo.css("background-color", "lightgray"); //isso é errado, ver função abaixo
    campo.addClass("campo-desabilitado");

    var qtdPalavras = $("#contador-palavras").text();

    if (!trava && qtdPalavras != 0) {
        inserePlacar();
    } else {
        $(".erroCopia").show();
    }

}


//CRIANDO FUNÇÃO ON LOAD ORIGINAL
/*
$(document).ready(function () {
    console.log("Pagina Carregada!")
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
})*/


//CRIANDO O RESET

//Exemplo usando ON
/*$("#botao-reiniciar").on("click", function(){
    console.log("Botao reinicia clicado");
});*/

//EXEMPLO USANDO ABREVIAÇÃO JQUERY

//Exemplo com clique do mouse
/*campo.on("click", function(){
    console.log("clicado!");
    //console.log(campo.val());
    
    var conteudo = campo.val(); //Como é um input, a entrada se dá por value, ao invés de text
    var qtdPalavras = conteudo.split(" ").length; //separa a entrada obtida na linha anterior, baseado em espaços e então mede o tamanho do array
    console.log(qtdPalavras);
    console.log(conteudo.length);
    
    $("#contador-palavras").text(qtdPalavras); //Altera o texto da id contador-palavras para o valor da qtdPalavras
    $("#contador-caracteres").text(conteudo.length); //Altera o texto da id contador-caracteres para o valor da qtdPalavras
});*/
