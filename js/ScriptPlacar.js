function inserePlacar() {
    var tabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    //JEITO ERRADO
    //var linha = "<tr><td>" + usuario + "</td><td>" + numPalavras + " Palavras</td><td>" + numCaracteres + " Caracteres</td><td>" + botaoRemover + "</td></tr>";

    //JEITO CORRETO (POR OBJETO)
    var linha = novaLinha(usuario, numPalavras); //Cria objeto
    linha.find(".botao-remover").click(removeLinha); //Anexa evento de clique antes de incluir o TR

    tabela.append(linha); //Inclui uma linha nova
    mostraPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, numPalavras) {
    //CRIANDO AS TAGS REAIS
    var linhaInicio = $("<tr>")
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    var link = $("<button>").addClass("botao-remover");
    var icone = $("<i>").addClass("material-icons icones").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linhaInicio.append(colunaUsuario);
    linhaInicio.append(colunaPalavras);
    linhaInicio.append(colunaRemover);

    return linhaInicio;
}

function removeLinha() {
    event.preventDefault; //não há nada padrão de evento, mas se estivessemos utilizando um <a>, seria necessário
    var linha = $(this).parent().parent();
    //Jeito mais trabalhoso
    /*linha.fadeOut(1000);
    setTimeout(function () {
        linha.remove();
    }, 1000);*/
    //Jeitinho Brasileiro
    linha.fadeOut(1000, function () {
        linha.remove();
    });
}

function mostraPlacar() {
    //$(".placar").toggle(); Abrupto demais
    $(".placar").stop().slideDown();
    scrollPlacar();
}

function alternaPlacar() {
    $(".placar").stop().slideToggle();
    scrollPlacar();
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody > tr:not(:first-child)"); //recebe todos os TR`s exceto o primeiro "bot"
    linhas.each(function () { //para cara TR, fazer o seguinte
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };
    $("#spinner").css('display', 'inline-block');

    $.post("http://10.11.102.123:3000/placar", dados, function () {
        $("#spinner").hide();
        alert("Dados Salvos!");
    }).fail(function () {
        $("#spinner").hide();
        $("#erroAjax").show();
        setTimeout(function () {
            $("#erroAjax").hide();
        }, 5000);
    });
}

function atualizaPlacar() {
    $("#spinner").css('display', 'inline-block');

    $.get("http://10.11.102.123:3000/placar", function (data) {
        $("#spinner").hide();
        var placar = $(data);
        placar.each(function () {
            var tabela = $(".placar").find("tbody");
            var usuario = this.usuario;
            var numPalavras = this.pontos;

            var linha = novaLinha(usuario, numPalavras);
            linha.find(".botao-remover").click(removeLinha); //Anexa evento de clique antes de incluir o TR
            tabela.append(linha); //Inclui uma linha nova
        });
    }).fail(function () {
        $("#spinner").hide();
        $("#erroAjax").show();
        setTimeout(function () {
            $("#erroAjax").hide();
        }, 5000);
    });
}
