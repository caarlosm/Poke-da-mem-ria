const cards = document.querySelectorAll('.card');
const cardFace = document.querySelectorAll('.card-front');
const cardBack = document.querySelectorAll('.card-back');
const maxPares = 9; //maximo de pares possiveis

let cartaFoiVirada = false; //saber se uma carta ja foi virada
let primeiroClick, segundoClick; //primeiro e segundo clique em cartas
let travaClick = false; //nao deixar virar mais cartas
let numeroAcertos = 0;
let numeroErros = 0;


//função para virar as cartas
function virarCarta() {
    if(travaClick) return;
    if(this === primeiroClick) return;

    this.classList.add('flip');
    if(!cartaFoiVirada) {
        cartaFoiVirada = true;
        primeiroClick = this;
        return;
    }
    
    segundoClick = this;
    cartaFoiVirada = false;
    checaCartasIguais();
    // checa condicao de vitoria apos segundo click:
    checaVitoria();
}

//função que checa se as cartas são iguais
function checaCartasIguais() {
    //se ambas as cartas forem iguais:
    if(primeiroClick.dataset.card === segundoClick.dataset.card) {
        acerteiCartas();
        return;
    }
    //se as cartas forem diferentes:
    erreiCartas();
}

//função de acerto de pares
function acerteiCartas() {
    // desabilita as cartas removendo o eventlistener:
    primeiroClick.removeEventListener('click', virarCarta);
    segundoClick.removeEventListener('click', virarCarta);
    // contagem para vitoria:
    numeroAcertos += 1;
    segundoClick.style.scale = 1.035;
    primeiroClick.style.scale = 1.035;
    
    ativaJogada();
}

//funcão que desvira as cartas
function erreiCartas() {
    travaClick = true;

    setTimeout(() => {
        primeiroClick.classList.remove('flip');
        segundoClick.classList.remove('flip');
        numeroErros += 1;
        ativaJogada();
    }, 1500);
}

// reativa o mouse click e reseta cartas clicadas
function ativaJogada() {
    [cartaFoiVirada, travaClick] = [false, false];
    [primeiroClick, segundoClick] = [null, null];
}

// funcao que (re)inicia o jogo
function iniciaJogo() {
    //espera as cartas desvirarem para embaralhar
    setTimeout(() => {
        //embaralha as cartas e adiciona evento de click
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * (maxPares * 2));
            card.style.order = randomPosition;
            card.addEventListener('click', virarCarta);
        });
    }, 500);
    ativaJogada();
}

function checaVitoria() {
    if (numeroAcertos == maxPares) {
        alert(`Você venceu! e só errou ${numeroErros} vezes!`);
        resetaTabuleiro();
    }
}

//função que reseta o tabuleiro
function resetaTabuleiro() {
    // reseta numero de erros e acertos
    numeroAcertos = 0;
    numeroErros = 0;
    // desvirar todas as cartas
    cards.forEach((card) => {
        card.classList.remove('flip');
        card.style.scale = 1;
    });
    //reinicia o jogo:
    iniciaJogo();
}

//inicia o jogo.
iniciaJogo();