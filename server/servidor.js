import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import criarJogo from '../js/jogo.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.get('/', (req, res) => {
	res.send('Servidor operando');
});

app.use(express.static('public'));

const jogo = criarJogo();
jogo.iniciarFrutas();

jogo.escreve((comando) => {
    console.log(`Emitindo o evento ${comando.tipo}`);
    sockets.emit(comando.tipo, comando);
});

sockets.on('connect', (socket) => {
    const jogadorId = socket.id;
    console.log(`Jogador com id ${jogadorId} conectado.`);
    jogo.adicionarJogadores({ jogadorId: jogadorId });

    socket.emit('inicio', jogo.atual);

    socket.on('disconnect', () => {
        console.log(`Jogador com id ${jogadorId} desconectado.`);
        jogo.removerJogadores({ jogadorId: jogadorId });
    });

    socket.on('mover-jogador', (comando) => {
        comando.jogadorId = jogadorId;
        comando.tipo = 'mover-jogador';
        jogo.moverJogador(comando);
        console.log(`Recebendo movimento da tecla ${comando.tecla} do jogador id ${comando.jogadorId}`);
    });

});

server.listen(3000, () => {
    console.log('Servidor operando na porta 3000.');
});