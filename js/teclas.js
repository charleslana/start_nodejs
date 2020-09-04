function criarTeclasPressionadas(document) {
    const atual = {
        observadores: [],
        jogadorId: null
    }

    function registrarJogadorId(jogadorId) {
        atual.jogadorId = jogadorId;
    }

    function escreve(funcaoObservadores) {
        atual.observadores.push(funcaoObservadores);
    }

    function limparObservadores() {
        atual.observadores = [];
    }

    function notificar(comando) {
        console.log(`Notificando ${atual.observadores.length} observadores`);
        console.log(atual.observadores);
        for(const funcaoObservadores of atual.observadores) {
            funcaoObservadores(comando);
        }
    }


    document.addEventListener('keydown', pressionarTecla)

    function pressionarTecla(event) {
        const tecla = event.key;

        const comando = {
            tipo: 'mover-jogador',
            jogadorId: atual.jogadorId,
            tecla
        }

        notificar(comando);

    }

    return {
        escreve,
        limparObservadores,
        registrarJogadorId
    }
}

export default criarTeclasPressionadas;