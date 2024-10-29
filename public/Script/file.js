/*-------------------Produtos----------------- */
function exibirProdutos() {
    const divProdutos = document.getElementById("produtos");

    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(produtos => {
            let params = new URLSearchParams(window.location.search);
            let categoria = params.get('value');

            let produtosEncontrados = false;

            produtos.forEach(produto => {
                if (categoria == produto.id_categoria) {
                    produtosEncontrados = true; 
                    const produtoDiv = document.createElement("div");
                    produtoDiv.className = "produto";
                    produtoDiv.innerHTML = `
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p>Valor: ${produto.preco}</p>
                        <button onclick="window.location.href='/produto?produto=${produto.id}'">Aprecie</button>
                    `;
                    divProdutos.appendChild(produtoDiv);
                }
            });

            if (!produtosEncontrados) {
                const produtoDiv = document.createElement("div");
                produtoDiv.className = "produto";
                produtoDiv.innerHTML = `
                    <div style="display: flex; justify-content: center; align-items: center; height: 450px">
                        <h3>Nenhum produto encontrado!</h3>
                    <div>
                `;
                divProdutos.appendChild(produtoDiv);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

exibirProdutos();

function exibirProdutoShow() {
    const divProdutos = document.getElementById("produtoShow");

    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(produtos => {
            let params = new URLSearchParams(window.location.search);
            let produto_id = params.get('produto');

            produtos.forEach(produto => {
                if (produto_id == produto.id) {
                    const produtoDiv = document.createElement("div");
                    produtoDiv.className = "produtoShow";
                    
                    produtoDiv.innerHTML = `
                        <div class="produto-container">
                            <div class="imagem-container">
                                <img src="${produto.imagem}" alt="${produto.nome}">
                            </div>
                            <div class="texto-container">
                                <h2 style="background-color: var(--AmareloCanário);padding:15px 30px;border-radius: 0 15px;box-shadow: 4px 6px 8px rgba(122, 122, 122, 0.288);">${produto.nome}</h2>
                                <ul>
                                    <li>Valor: ${produto.preco}</li>
                                    <li>Volume: ${produto.volume}</li>
                                    <li>Teor Alcoólico: ${produto.teor_alcoolico}</li>
                                    <li>Fabricante: ${produto.fabricante}</li>
                                    <li>Validade: ${produto.validade}</li>
                                </ul>
                                <h4>Descrição do produto:</h4>
                                <p>${produto.descricao}</p>
                                <button class="CompraButton">Comprar</button>
                            </div>
                        </div>
                    `;
                    
                    divProdutos.appendChild(produtoDiv);
                }
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

exibirProdutoShow();

/*-------------------Noticias----------------- */

// Função para exibir todas as notícias
function exibirNoticias() {
    const NoticiasBox = document.getElementById("NoticiasBox");

    fetch('http://localhost:3000/noticias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar as notícias.');
            }
            return response.json();
        })
        .then(noticias => {
            let params = new URLSearchParams(window.location.search);
            let id_noticia = params.get('noticia');
            var path = window.location.pathname;   

            if (id_noticia == null) {
                if(path == '/noticia'||path == '/' ){
                    noticias.forEach(noticia => {
                        exibirNoticiaIMG(noticia);
                    });
                }else if(path == '/noticia/list'){
                    const titulo = document.createElement("h1");
                    titulo.textContent = "Notícias & Artigos";
                    document.body.prepend(titulo);

                    noticias.forEach(noticia => {
                        exibirNoticiaList(noticia);
                    });
                }
            } else {
                let noticiaShow = noticias.find(noticia => noticia.id_noticia == id_noticia);
                if (noticiaShow) {
                    exibirNoticiaShow(noticiaShow);
                } else {
                    NoticiasBox.innerHTML = "<p>Notícia não encontrada.</p>";
                }
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


function exibirNoticiaIMG(noticia) {
    const NoticiasBox = document.getElementById("NoticiasBox");
    const noticiaDiv = document.createElement("div");

    noticiaDiv.innerHTML = `
        <a href="/noticia?noticia=${noticia.id_noticia}">
            <div class="image-container">
                <img src="${noticia.imagem}" alt="${noticia.titulo}">
            </div>
            <div class="text-content">
                <h3>${noticia.titulo}</h3>
                <em>${noticia.autor}</em>
            </div>
        </a>
    `;
    NoticiasBox.appendChild(noticiaDiv);
}

function exibirNoticiaList(noticia){
    const ConteudoNoticia = document.getElementById("ConteudoNoticia");
    const noticialist = document.createElement("div");
    noticialist.className = "noticialist";

    noticialist.innerHTML = `
        <div class="noticia-text">
            <p><b>${noticia.titulo}</b></p>
            <p>${noticia.autor}</p>
        </div>
        <button class="buttonList" onclick="window.location.href='/noticia?noticia=${noticia.id_noticia}'">Veja Completo</button>
    `;
    ConteudoNoticia.appendChild(noticialist);
}

// Função para exibir a notícia selecionada
function exibirNoticiaShow(noticia) {
    const noticiaShow = document.getElementById("ConteudoNoticia");
    noticiaShow.innerHTML = `
        <div class="image-header">
            <img src="${noticia.imagem}" alt="${noticia.titulo}" class="imagem-centralizada">
        </div>
        <h1>${noticia.titulo}</h1>
        <p>${noticia.texto}</p>
        <em>${noticia.autor}</em>
        <em>${noticia.data}</em>
    `;
}

exibirNoticias();

/*-------------------Fale Conosco----------------- */
const cep = document.querySelector('#cep');
const endereco = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const erroCEP = document.querySelector('#erroCEP');


cep.addEventListener('focusout',async() =>{
    try {
        const soNumeros = /^([0-9])+$/;
        const oitoNumeros = /^([0-9]){8}$/;

        if (!soNumeros.test(cep.value)) {  
            throw { cep_error: 'Apenas números são permitidos no CEP' };  
        } else if (!oitoNumeros.test(cep.value)) {  
            throw { cep_error: 'O CEP deve conter exatamente 8 números' };  
        } 
        
        /*Requisição para a viaCep */
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        if(!response.ok){
            throw await response.json();
        }

        const responseCep = await response.json();

        endereco.value =  responseCep.logradouro;
        bairro.value =  responseCep.bairro;
        cidade.value =  responseCep.localidade;

        endereco.disabled = false;
        bairro.disabled = false;
        cidade.disabled = false;

    } catch (error) {  
        if (error?.cep_error) {  
            erroCEP.textContent = error.cep_error;  
            setTimeout(() => {  
                erroCEP.textContent = '';  
            }, 5000); 
        }  
    }  
});

function validarFormulario() {
    let nome = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let formValido = true;

    // Limpa as mensagens de erro anteriores
    document.getElementById("erroName").textContent = '';
    document.getElementById("erroEmail").textContent = '';
    document.getElementById("erroMessage").textContent = '';

    if (nome === "") {   
        document.getElementById("erroName").textContent = 'Como podemos te chamar?';   
        formValido = false;
    }  

    if (email === "") {
        document.getElementById("erroEmail").textContent = 'Como podemos te contactar?';
        formValido = false;
    } else if (!regexEmail.test(email)) {
        document.getElementById("erroEmail").textContent = 'Formato de e-mail inválido.';
        formValido = false;
    }

    if (message === "") {
        document.getElementById("erroMessage").textContent = 'Por favor, queremos saber sua opinião, preencha o campo de mensagem.';
        formValido = false;
    }

    return formValido;
}
