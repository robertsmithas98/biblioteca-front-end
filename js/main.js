function aleatorio(N) {
    return Math.round(Math.random() * N);
}


function prepararJanela(titulo, url) {
    tituloJanela.innerHTML = titulo;
    iframeJanela.src = url;
    $("#janelaModal").css("background-color", `rgba(${aleatorio(255)}, ${aleatorio(255)}, ${aleatorio(255)}, 0.5)`)
}


function excluirFavorito(btn) {
    $(btn).parent().remove();
}


function carregarFavoritos() {
    $("#divFavoritos").load("favoritos.html");
}


function carregarLivros() {
    $.ajax({
        method: "GET",
        url: "api/livros",
        //data: JSON.stringify({emissor:106, receptor:107, valor:1000, token:"abc123"}),
        //contentType: "json",
        dataType: "json",
        success: (dados) => {
            console.log(dados);
            for (let i = 0; i < dados.length; i++) {
                $("#divLivros").append(`<div class="bg-light border-gray color-black col-12 col-md-4">
                ${dados[i].nome}
                <button type="button" class="btn btn-primary" onmousedown="prepararJanela('${dados[i].nome}', '${dados[i].video}')"
                data-bs-toggle="modal" data-bs-target="#janelaModal">
                    Abrir Janela
                </button>
            </div>`);
            }
        },
        error: (jqXHR, textStatus) => {
            console.log("Houve um erro processando sua requisição.");
        }
    });
}


function efetuarLogin(e) {
    e.preventDefault();

    const dados = {
        email: email.value,
        senha: senha.value
    };

    $.ajax({
        method: "GET", //TODO "POST",
        url: "api/login",
        data: JSON.stringify( dados ),
        contentType: "json",
        dataType: "json",
        success: (dados) => {
            console.log(dados);
            localStorage.setItem("usuarioLogado", JSON.stringify(dados));
            location.reload();
        },
        error: (jqXHR, textStatus) => {
            console.log("Houve um erro processando sua requisição.");
        }
    });
}


function carregarUsuario() {
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
}

let usuarioLogado = null;


//Código que executa após o carregamento da página
$(() => {
    //$("footer").hide();
    carregarFavoritos();

    $(".btn-suporte").on("click", () => {
        $(".div-chat").toggleClass("d-none");
    });

    $.get("header.html", (dados) => {
        $("body").prepend(dados);
    });

    $.get("footer.html", (dados) => {
        $("body").append(dados);
    });

});