function fraseAleatoria() {
    $("#spinner").css('display', 'inline-block'); //Utilizei pois o .show(); tranforma em display: block;

    $.get("http://10.11.102.123:3000/frases", trocaFraseAleatoria).fail(function () { //podemos trocar por 3001 para usar frases do servidor alura CORS
        $("#spinner").hide();
        $("#erroAjax").show();
        setTimeout(function () {
            $("#erroAjax").hide();
        }, 5000);
    });

    //Também pode ser feito assim
    /*.always(function () {
            $("#spinner").hide();
        });*/

}

function trocaFraseAleatoria(data) {
    $("#spinner").hide();
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length); // floor arredonda, random randomiza, data.lenght regula a amostra ao array
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo); //a seleção tempo e texto são decorrentes dos objetos no endereço frases
    atualizaTempoEnunciado(data[numeroAleatorio].tempo);
}

//JEITO ALURA
function buscaFrase() {
    $("#spinner").css('display', 'inline-block');

    var fraseId = $("#select-id").val();
    var dados = {
        id: fraseId //Determina o que será puxado no GET a seguir:
    };

    $.get("http://10.11.102.123:3000/frases", dados, trocaFrase).fail(function () { //podemos trocar por 3001 para usar frases do servidor alura CORS
        $("#spinner").hide();
        $("#erroAjax").show();
        setTimeout(function () {
            $("#erroAjax").hide();
        }, 5000);
    });
}

function trocaFrase(data) {
    var frase = $(".frase");

    $("#spinner").hide();
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo); //a seleção tempo e texto são decorrentes dos objetos no endereço frases
    atualizaTempoEnunciado(data.tempo);
}


//MEU JEITO
/*function buscaFrase() {
    $("#spinner").show();
    $.get("http://localhost:3000/frases", trocaFraseSelecionada).fail(function () {
        $("#spinner").hide();
        $("#erroAjax").show();
        setTimeout(function () {
            $("#erroAjax").hide();
        }, 5000);
    });
}

function trocaFraseSelecionada(data) {
    var fraseId = $("#select-id").val();

    $("#spinner").hide();
    var frase = $(".frase");
    frase.text(data[fraseId].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[fraseId].tempo); //a seleção tempo e texto são decorrentes dos objetos no endereço frases
    atualizaTempoEnunciado(data[fraseId].tempo);
}*/
