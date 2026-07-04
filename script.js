// 1. BANCO DE DADOS SIMULADO (Array de Objetos)
const versiculosCatolicos = [
    {
        texto: "Buscai primeiro o Reino de Deus e a sua justiça, e tudo o mais vos será dado por acréscimo.",
        referencia: "São Mateus 6, 33"
    },
    {
        texto: "O Senhor é o meu pastor, nada me faltará. Em verdes pastagens me faz repousar.",
        referencia: "Salmo 22, 1-2 (Bíblia CNBB)"
    },
    {
        texto: "Não fostes vós que me escolhestes, mas fui eu que vos escolhi e vos apartei para que vades e visiteis fruto.",
        referencia: "São João 15, 16"
    },
    {
        texto: "Tudo posso naquele que me dá forças.",
        referencia: "Filipenses 4, 13"
    },
    {
        texto: "O Senhor é misericordioso e clemente, paciente e rico em bondade.",
        referencia: "Salmo 102, 8"
    }
];

// 2. FUNÇÃO QUE SORTEIA E EXIBE O VERSÍCULO
function mudarVersiculo() {
    // Pegar um número aleatório entre 0 e o tamanho máximo da lista
    const indiceAleatorio = Math.floor(Math.random() * versiculosCatolicos.length);
    
    // Selecionar o versículo sorteado
    const versiculoSorteado = versiculosCatolicos[indiceAleatorio];

    // Capturar as tags HTML onde o texto vai entrar
    const tagTexto = document.querySelector("#versiculo-container blockquote p");
    const tagCite = document.querySelector("#versiculo-container blockquote cite");

    // Injetar o texto do versículo sorteado dentro das tags HTML
    tagTexto.textContent = `"${versiculoSorteado.texto}"`;
    tagCite.textContent = `— ${versiculoSorteado.referencia}`;
}

// 3. CAPTURAR O BOTÃO E ADICIONAR O CLIQUE
const botao = document.getElementById("btn-mudar-versiculo");
botao.addEventListener("click", mudarVersiculo);

// 4. EXIBIR UM VERSÍCULO ASSIM QUE A PÁGINA CARREGAR
document.addEventListener("DOMContentLoaded", mudarVersiculo);

// ==========================================================================
// PARTE NOVAS: LÓGICA DAS TRILHAS DE ESTUDO
// ==========================================================================

// 1. Dados das Trilhas e seus respectivos dias de leitura
const dadosTrilhas = {
    jesus: {
        titulo: "Conhecendo Jesus",
        descricao: "Plano de 3 dias focado no Evangelho de São Marcos para iniciantes.",
        dias: [
            { numero: "Dia 1", passagem: "Marcos 1, 1-15", detalhe: "O início da pregação de Jesus." },
            { numero: "Dia 2", passagem: "Marcos 4, 1-20", detalhe: "A Parábola do Semeador explicada." },
            { numero: "Dia 3", passagem: "Marcos 16, 1-8", detalhe: "A Ressurreição de Jesus Cristo." }
        ]
    },
    rezar: {
        titulo: "Aprender a Rezar",
        descricao: "Passos práticos usando os Salmos para abrir o coração a Deus.",
        dias: [
            { numero: "Dia 1", passagem: "Salmo 22 (23)", detalhe: "Confiança na providência de Deus." },
            { numero: "Dia 2", passagem: "Salmo 50 (51)", detalhe: "Pedindo perdão e misericórdia." },
            { numero: "Dia 3", passagem: "Mateus 6, 9-13", detalhe: "Estudo da oração do Pai Nosso." }
        ]
    },
    comeco: {
        titulo: "O Começo de Tudo",
        descricao: "Entenda as promessas de Deus desde a criação do mundo.",
        dias: [
            { numero: "Dia 1", passagem: "Gênesis 1, 1-26", detalhe: "A criação do universo por amor." },
            { numero: "Dia 2", passagem: "Gênesis 12, 1-9", detalhe: "O chamado de Abraão, nosso pai na fé." },
            { numero: "Dia 3", passagem: "Êxodo 14, 1-31", detalhe: "A libertação do povo através do Mar Vermelho." }
        ]
    }
};

// 2. Função para renderizar (desenhar) a trilha escolhida na tela
function carregarTrilha(idTrilha) {
    const trilha = dadosTrilhas[idTrilha];
    
    // Atualiza os textos principais da seção
    document.getElementById("titulo-trilha-ativa").textContent = trilha.titulo;
    document.getElementById("descricao-trilha-ativa").textContent = trilha.descricao;
    
    const listaContainer = document.getElementById("lista-dias-estudo");
    listaContainer.innerHTML = ""; // Limpa a lista anterior
    
    // Cria o HTML de cada dia dinamicamente usando loop (forEach)
    trilha.dias.forEach((dia, index) => {
        const divDia = document.createElement("div");
        divDia.className = "card-dia";
        divDia.id = `dia-${idTrilha}-${index}`;
        
        divDia.innerHTML = `
            <div>
                <h4>${dia.numero}: ${dia.passagem}</h4>
                <p>${dia.detalhe}</p>
            </div>
            <button class="btn-check" onclick="concluirDia('${divDia.id}', this)">Marcar Lido</button>
        `;
        
        listaContainer.appendChild(divDia);
    });
}

// 3. Função para marcar o dia como lido (efeito visual verde)
function concluirDia(idCard, botaoClicado) {
    const card = document.getElementById(idCard);
    
    // O método .toggle adiciona a classe se ela não existir, ou remove se já existir
    card.classList.toggle("dia-concluido");
    botaoClicado.classList.toggle("ativo");
    
    if(botaoClicado.classList.contains("ativo")) {
        botaoClicado.textContent = "Concluído ✓";
    } else {
        botaoClicado.textContent = "Marcar Lido";
    }
}

// 4. Conectar os botões do HTML para disparar a função carregarTrilha
// Vamos alterar o comportamento dos links que já estavam nos cards lá no HTML
document.addEventListener("DOMContentLoaded", () => {
    const botoesTrilha = document.querySelectorAll(".botao-trilha");
    
    // Mapeando a ordem dos botões criados no HTML com as chaves do nosso objeto JS
    const chavesTrilhas = ["jesus", "rezar", "comeco"];
    
    botoesTrilha.forEach((botao, index) => {
        botao.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede a página de recarregar
            carregarTrilha(chavesTrilhas[index]);
            
            // Rola a página suavemente para a seção de leitura
            document.getElementById("detalhe-trilha").scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// ==========================================================================
// PARTE NOVA: LÓGICA DO DICIONÁRIO BÍBLICO
// ==========================================================================

// 1. O nosso dicionário de dados (Objeto com os termos e significados)
const termosDicionario = {
    evangelho: "Significa 'Boa Nova' ou 'Boa Notícia'. São os quatro primeiros livros do Novo Testamento (Mateus, Marcos, Lucas e João) que narram a vida, os ensinamentos, a morte e a ressurreição de Jesus Cristo.",
    parabola: "Uma história simples e curta tirada do dia a dia das pessoas, usada por Jesus para ensinar uma lição espiritual profunda ou um mistério do Reino de Deus.",
    testamento: "Na Bíblia, tem o sentido de 'Aliança' ou 'Contrato'. O Antigo Testamento narra a antiga aliança de Deus com o povo de Israel; o Novo Testamento narra a nova e eterna aliança selada por Jesus com toda a humanidade.",
    salmo: "Uma coleção de 150 cânticos e orações inspirados por Deus. Servem para louvar, agradecer, pedir perdão ou expressar confiança ao Senhor em qualquer momento da vida."
};

// 2. Função que muda o texto na tela de acordo com o botão clicado
function buscarDefinicao(termo) {
    // Procura o significado dentro do nosso objeto usando a palavra-chave
    const significado = termosDicionario[termo];

    // Captura os elementos do HTML onde vamos injetar as respostas
    const tagTermo = document.getElementById("termo-selecionado");
    const tagTexto = document.getElementById("texto-definicao");

    // Altera o conteúdo na tela
    tagTermo.textContent = termo;
    tagTexto.textContent = significado;
}