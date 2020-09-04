function criarJogo() {

    const atual = {
        jogadores: {},
        frutas: {},
        tela: {
            width: 25,
            height: 25
        }
    }

    const observadores = [];

    function iniciarFrutas() {
        setInterval(adicionarFrutas, 2000);
    }

    function escreve(funcaoObservadores) {
        observadores.push(funcaoObservadores);
    }

    function notificar(comando) {
        for(const funcaoObservadores of observadores) {
            funcaoObservadores(comando);
        }
    }

    function setarAtual(novoAtual) {
        Object.assign(atual, novoAtual);
    }

    function adicionarJogadores(comando) {
        const jogadorId = comando.jogadorId;
        const jogadorPosicaoX = 'jogadorPosicaoX' in comando ? comando.jogadorPosicaoX : Math.floor(Math.random() * atual.tela.width);
        const jogadorPosicaoY = 'jogadorPosicaoY' in comando ? comando.jogadorPosicaoY : Math.floor(Math.random() * atual.tela.height);

        atual.jogadores[jogadorId] = {
            posicaoX: jogadorPosicaoX,
            posicaoY: jogadorPosicaoY
        }

        notificar({
            tipo: 'adicionar-jogador',
            jogadorId: jogadorId,
            jogadorPosicaoX: jogadorPosicaoX,
            jogadorPosicaoY: jogadorPosicaoY
        });

    }

    function removerJogadores(comando) {
        const jogadorId = comando.jogadorId;

        delete atual.jogadores[jogadorId];

        notificar({
            tipo: 'remover-jogador',
            jogadorId: jogadorId
        });

    }

    function adicionarFrutas(comando) {
        const frutaId = comando ? comando.frutaId: Math.floor(Math.random() * 10000000);
        const frutaPosicaoX = comando ? comando.frutaPosicaoX : Math.floor(Math.random() * atual.tela.width);
        const frutaPosicaoY = comando ? comando.frutaPosicaoY : Math.floor(Math.random() * atual.tela.height);

        var notificarFruta = true;
        
        for(const checarFrutaId in atual.frutas) {
            const fruta = atual.frutas[checarFrutaId];
            
            if(frutaPosicaoX == fruta.posicaoX && frutaPosicaoY == fruta.posicaoY) {
                var notificarFruta = false;
                break;
            }

        }

        if(notificarFruta) {

            atual.frutas[frutaId] = {
                posicaoX: frutaPosicaoX,
                posicaoY: frutaPosicaoY
            }

            notificar({
                tipo: 'adicionar-fruta',
                frutaId: frutaId,
                frutaPosicaoX: frutaPosicaoX,
                frutaPosicaoY: frutaPosicaoY
            });
        }

    }

    function removerFrutas(comando) {
        const frutaId = comando.frutaId;

        delete atual.frutas[frutaId];

        notificar({
            tipo: 'remover-fruta',
            frutaId: frutaId
        });
    }

    function moverJogador(comando) {
        notificar(comando);
        
        const teclasAceitas = {
            ArrowUp(jogador) {
                jogador.posicaoY = Math.max(jogador.posicaoY - 1, 0);
            },
            ArrowDown(jogador) {
                jogador.posicaoY = Math.min(jogador.posicaoY + 1, atual.tela.height - 1);
            },
            ArrowLeft(jogador) {
                jogador.posicaoX = Math.max(jogador.posicaoX - 1, 0);
            },
            ArrowRight(jogador) {
                jogador.posicaoX = Math.min(jogador.posicaoX + 1, atual.tela.width - 1);
            }
        }   

        const tecla = comando.tecla;
        const jogadorId = comando.jogadorId;
        const jogador = atual.jogadores[comando.jogadorId];
        
        const funcaoMover = teclasAceitas[tecla];

        if(jogador && funcaoMover) {
            funcaoMover(jogador);
            colisaoFrutas(jogadorId);
        }
    
    }

    function colisaoFrutas(jogadorId) {
        const jogador = atual.jogadores[jogadorId];

        for(const frutaId in atual.frutas) {
            const fruta = atual.frutas[frutaId];

            if(jogador.posicaoX == fruta.posicaoX && jogador.posicaoY == fruta.posicaoY) {
                removerFrutas({ frutaId: frutaId });
            }

        }
    }

    return {
        adicionarJogadores,
        removerJogadores,
        moverJogador,
        adicionarFrutas,
        removerFrutas,
        atual,
        setarAtual,
        escreve,
        iniciarFrutas
    }
}

export default criarJogo;