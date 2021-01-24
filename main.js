'use strict'

// Gamestart and Player init
const gameInit = (() => {
    //Init Arrays
    let playerNames = [];
    let players = [];
    let playerSign = ['x', 'o'];
    //Load DOM
    let playerNamesInput = document.querySelectorAll('input[type=text]')
    let btnStartGame = document.querySelector('#btn-start');
    let gameStartRender = document.querySelector('#player-render');
    let gameBoardHtml = document.querySelector('#gameboard');
    //Create Events
    btnStartGame.addEventListener('click', _startGame)
    //logic to start the game
    function _inputHasValue() {
        let hasVal = false;
        for (let player of playerNamesInput) {
            return player.value !== '' ? hasVal = true : hasVal = false;
        }
    }
    function _startGame() {
        let playersCount = playerNamesInput.length;
        if (_inputHasValue()) {
            for (let player of playerNamesInput) {
                playerNames.push(player.value)
            }
        } else {
            for (let player of playerNamesInput) {
                player.style.border = '5px solid green';
            }
        }
        if (playerNames.length === playersCount) {
            gameStartRender.style.display = 'none';
            gameBoardHtml.style.display = 'grid';
        }
        _createPlayers();
    }
    //Factory Function for Players
    const Player = (name, sign) => {
        let won = false;
        return { name, sign, won }
    }
    // Function to create Players
    function _createPlayers() {
        for (let i in playerNames) {
            players[i] = Player(playerNames[i], playerSign[i]);
        }
    }
    return { players, gameBoardHtml }
})()

const game = (() => {
    let players = gameInit.players;
    let gameBoard = {
        gameBoardHtml: gameInit.gameBoardHtml,
        board: [],
        gameController: function () {
            this.gameBoardHtml.addEventListener('click', (e) => {
                if (e.target.matches('.box')) {
                    let key = e.target;
                    let index = key.dataset.index;
                    let playerIndex = _playerTurn();
                    
                    if (playerIndex % 2 === 0) {
                        this.board[index] = players[0].sign;
                        _render(key, 0);
                    } else {
                        this.board[index] = players[1].sign;
                        _render(key, 1);
                    }
                    _gameOutcome(this.board);
                    _whichPlayerwon(playerIndex);
                }
            })
        }
    }
    gameBoard.board.length = 9;
    function _playerTurn() {
        let index = 0;
        for (let item of gameBoard.board) {
            item === undefined ? index += 0 : index++
        }
        return index
    }
    function _render(html, index) {
        html.textContent = players[index].sign;
    }

    let possibleWinning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function _gameOutcome(board) {
        possibleWinning.forEach((item) => {
            if (board[item[0]] === players[0].sign &&
                board[item[1]] === players[0].sign &&
                board[item[2]] === players[0].sign) {
                players[0].won = true;
            }
            if (board[item[0]] === players[1].sign &&
                board[item[1]] === players[1].sign &&
                board[item[2]] === players[1].sign) {
                players[1].won = true;
            }
            
        })
    }
    function _whichPlayerwon(index){
        let tie = false;
        for(let i in players){
            if(players[i].won){
                _renderWinner(i)
            }
            if(index === 8 && !players[0].won && !players[1].won){
                tie = true;
                _renderWinner(tie); 
                return; //to avoid, the function will be invoked 2-times, because the loop is for both players
            }
        }
     }
     function _renderWinner(i){
        let boxes = document.querySelectorAll('.box');
        let winnerText = document.createElement('h2');
        for(let item of boxes){
            item.style.display = 'none';
        }
        if(i === true){
            winnerText.textContent = 'It´s a tie, try it again';
        }else{
            winnerText.textContent = players[i].name + ' has won the game';
        }
        gameBoard.gameBoardHtml.style.display = 'flex';
        gameBoard.gameBoardHtml.style.flexFlow = 'wrap-reverse';
        gameBoard.gameBoardHtml.appendChild(winnerText);
     }
    gameBoard.gameController(players);

    //return gameBoard;
})(gameInit.players, gameInit.gameBoardHtml)

