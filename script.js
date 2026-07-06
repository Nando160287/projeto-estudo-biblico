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

// ==========================================================================
// LÓGICA DO SANTO TERÇO (CONTAS REPETIDAS DE 1 A 10 POR DEZENA)
// ==========================================================================

let contaAtual = -4; 
const totalContas = 50; 

const todosOsMisterios = {
    gozosos: ["1º Mistério Gozoso: A Anunciação", "2º Mistério Gozoso: A Visitação", "3º Mistério Gozoso: O Nascimento", "4º Mistério Gozoso: A Apresentação", "5º Mistério Gozoso: A Perda e Reencontro"],
    dolorosos: ["1º Mistério Doloroso: A Agonia", "2º Mistério Doloroso: A Flagelação", "3º Mistério Doloroso: A Coroação", "4º Mistério Doloroso: A Cruz nas Costas", "5º Mistério Doloroso: A Crucificação"],
    gloriosos: ["1º Mistério Glorioso: A Ressurreição", "2º Mistério Glorioso: A Ascensão", "3º Mistério Glorioso: A Vinda do Espírito Santo", "4º Mistério Glorioso: A Assunção", "5º Mistério Glorioso: A Coroação"],
    luminosos: ["1º Mistério Luminoso: O Batismo", "2º Mistério Luminoso: As Bodas de Caná", "3º Mistério Luminoso: O Anúncio do Reino", "4º Mistério Luminoso: A Transfiguração", "5º Mistério Luminoso: A Instituição da Eucaristia"]
};

let listaMisteriosDoDia = [];

function definirMisteriosPorDia() {
    const diaDaSemana = new Date().getDay();
    if (diaDaSemana === 1 || diaDaSemana === 6) listaMisteriosDoDia = todosOsMisterios.gozosos;
    else if (diaDaSemana === 2 || diaDaSemana === 5) listaMisteriosDoDia = todosOsMisterios.dolorosos;
    else if (diaDaSemana === 3 || diaDaSemana === 0) listaMisteriosDoDia = todosOsMisterios.gloriosos;
    else if (diaDaSemana === 4) listaMisteriosDoDia = todosOsMisterios.luminosos;
}

function gerarBolinhasDoTerco() {
    // A) Contas Iniciais
    const containerInicial = document.getElementById("container-terco-inicial");
    containerInicial.innerHTML = "";
    const rotulosIniciais = { "-4": "Creio", "-3": "P.N.", "-2": "A.M.", "-1": "A.M.", "0": "A.M." };

    for (let i = -4; i <= 0; i++) {
        const bolaInit = document.createElement("div");
        bolaInit.className = "bolinha";
        bolaInit.id = `bola-id-${i}`;
        bolaInit.textContent = rotulosIniciais[i];
        containerInicial.appendChild(bolaInit);
    }

    // B) Criar as 5 Dezenas (Com exibição visual de 1 a 10)
    const containerDezenasCompleto = document.getElementById("container-dezenas-separadas");
    containerDezenasCompleto.innerHTML = ""; 

    for (let d = 1; d <= 5; d++) {
        const divBloco = document.createElement("div");
        divBloco.className = "bloco-dezena";

        const tituloDezena = document.createElement("div");
        tituloDezena.className = "grupo-contas-titulo";
        tituloDezena.textContent = `${d}ª Dezena`;
        divBloco.appendChild(tituloDezena);

        const divFlexBolinhas = document.createElement("div");
        divFlexBolinhas.className = "contas-container";

        const inicioContador = (d - 1) * 10 + 1;
        const fimContador = d * 10;

        // Contador de 1 a 10 para o texto da bolinha
        let numeroExibicao = 1;

        for (let i = inicioContador; i <= fimContador; i++) {
            const novaBolinha = document.createElement("div");
            novaBolinha.className = "bolinha";
            novaBolinha.id = `bola-id-${i}`;
            
            // MÁGICA: O texto impresso na tela é fixo de 1 a 10
            novaBolinha.textContent = numeroExibicao; 
            
            divFlexBolinhas.appendChild(novaBolinha);
            numeroExibicao++;
        }

        divBloco.appendChild(divFlexBolinhas);
        containerDezenasCompleto.appendChild(divBloco);
    }

    document.getElementById("bola-id--4").classList.add("conta-ativa");
}

function passarConta() {
    const bolaAnterior = document.getElementById(`bola-id-${contaAtual}`);
    if (bolaAnterior) bolaAnterior.classList.remove("conta-ativa");

    if (contaAtual < totalContas) {
        contaAtual++;
    } else {
        alert("Parabéns! Você concluiu o Santo Terço de hoje. Salve Rainha!");
        reiniciarTerco();
        return;
    }

    const bolaNova = document.getElementById(`bola-id-${contaAtual}`);
    if (bolaNova) bolaNova.classList.add("conta-ativa");

    atualizarTextosDoTercoCompleto();
}

function atualizarTextosDoTercoCompleto() {
    const tagMisterio = document.getElementById("misterio-atual");
    const tagTitulo = document.getElementById("oracao-titulo");
    const tagTexto = document.getElementById("oracao-texto");
    const caixaGloria = document.getElementById("oracao-gloria");

    caixaGloria.style.display = "none";

    // FLUXO INICIAL
    if (contaAtual === -4) {
        tagMisterio.textContent = "Orações Iniciais";
        tagTitulo.textContent = "Oração: Creio em Deus Pai";
        tagTexto.textContent = "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra, e em Jesus Cristo seu único Filho...";
    } 
    else if (contaAtual === -3) {
        tagMisterio.textContent = "Orações Iniciais";
        tagTitulo.textContent = "Oração Inicial: Pai Nosso";
        tagTexto.textContent = "Pai Nosso, que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso reino...";
    } 
    else if (contaAtual === -2) {
        tagMisterio.textContent = "Orações Iniciais";
        tagTitulo.textContent = "1ª Ave-Maria Inicial (Pela Fé)";
        tagTexto.textContent = "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres...";
    } 
    else if (contaAtual === -1) {
        tagMisterio.textContent = "Orações Iniciais";
        tagTitulo.textContent = "2ª Ave-Maria Inicial (Pela Esperança)";
        tagTexto.textContent = "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres...";
    } 
    else if (contaAtual === 0) {
        tagMisterio.textContent = "Orações Iniciais";
        tagTitulo.textContent = "3ª Ave-Maria Inicial (Pela Caridade)";
        tagTexto.textContent = "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres...";
    }
    // FLUXO DAS DEZENAS PRINCIPAIS
    else {
        let numeroDaDezena = 1;
        if (contaAtual <= 10) { tagMisterio.textContent = listaMisteriosDoDia[0]; numeroDaDezena = 1; }
        else if (contaAtual <= 20) { tagMisterio.textContent = listaMisteriosDoDia[1]; numeroDaDezena = 2; }
        else if (contaAtual <= 30) { tagMisterio.textContent = listaMisteriosDoDia[2]; numeroDaDezena = 3; }
        else if (contaAtual <= 40) { tagMisterio.textContent = listaMisteriosDoDia[3]; numeroDaDezena = 4; }
        else if (contaAtual <= 50) { tagMisterio.textContent = listaMisteriosDoDia[4]; numeroDaDezena = 5; }

        const ehPaiNossoIntermediario = contaAtual === 11 || contaAtual === 21 || contaAtual === 31 || contaAtual === 41;

        if (ehPaiNossoIntermediario) {
            tagTitulo.textContent = "Oração: Pai Nosso";
            tagTexto.textContent = "Pai Nosso, que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso reino...";
        } else {
            // Conta de forma amigável: converte 14 para conta 4, 25 para conta 5, etc.
            let contaRelativa = contaAtual % 10;
            if (contaRelativa === 0) contaRelativa = 10; // Evita mostrar conta 0 no fim do bloco

            tagTitulo.textContent = `Ave Maria — ${numeroDaDezena}ª Dezena — Conta nº ${contaRelativa}`;
            tagTexto.textContent = "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres...";
        }

        if (contaAtual === 10 || contaAtual === 20 || contaAtual === 30 || contaAtual === 40 || contaAtual === 50) {
            caixaGloria.style.display = "block";
        }
    }
}

function reiniciarTerco() {
    const bolaAtiva = document.getElementById(`bola-id-${contaAtual}`);
    if (bolaAtiva) bolaAtiva.classList.remove("conta-ativa");

    contaAtual = -4;
    document.getElementById("oracao-gloria").style.display = "none";
    document.getElementById("bola-id--4").classList.add("conta-ativa");
    
    definirMisteriosPorDia();
    atualizarTextosDoTercoCompleto();
}

document.addEventListener("DOMContentLoaded", () => {
    definirMisteriosPorDia(); 
    gerarBolinhasDoTerco();    
    atualizarTextosDoTercoCompleto(); 
});