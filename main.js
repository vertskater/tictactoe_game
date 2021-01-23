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
        let turn = false;
        return { name, sign, turn }
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
        gameController: function (players) {
            this.gameBoardHtml.addEventListener('click', (e) => {
                if (e.target.matches('.box')) {
                    let key = e.target;
                    let index = key.dataset.index;
                    let playerIndex = _playerTurn();
                    if (playerIndex % 2 === 0) {
                        this.board[index] = players[0].sign;
                        _render(key, 0);
                    }else{
                        this.board[index] = players[1].sign;
                        _render(key, 1);
                    }
                    //console.log(players[0].name, players[1].name)
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
    function _render(html, index){
        html.textContent = players[index].sign;
    }
    gameBoard.gameController(players);
    
    return gameBoard;
})(gameInit.players, gameInit.gameBoardHtml)

