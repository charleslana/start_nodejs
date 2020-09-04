function renderizarTela(tela, jogo, requestAnimationFrame, atualJogadorId) {
    const visual = tela.getContext('2d');

    visual.fillStyle = 'white';
    visual.clearRect(0, 0, jogo.atual.tela.width, jogo.atual.tela.height);

    for(const jogadorId in jogo.atual.jogadores) {
        const jogador = jogo.atual.jogadores[jogadorId];
        visual.fillStyle = "rgba(214, 214, 214, 1)";
        visual.fillRect(jogador.posicaoX, jogador.posicaoY, 1, 1);
    }

    for(const frutaId in jogo.atual.frutas) {
        const fruta = jogo.atual.frutas[frutaId];
        visual.fillStyle = "rgba(0, 128, 0, 0.5)";
        visual.fillRect(fruta.posicaoX, fruta.posicaoY, 1, 1);
    }

    const atualJogador = jogo.atual.jogadores[atualJogadorId];

    if(atualJogador) {
        visual.fillStyle = "rgba(253, 60, 60, 1)";
        visual.fillRect(atualJogador.posicaoX, atualJogador.posicaoY, 1, 1);
    }

    requestAnimationFrame(() => {
        renderizarTela(tela, jogo, requestAnimationFrame, atualJogadorId);
    })
}

export default renderizarTela;