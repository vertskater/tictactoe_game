'use strict'

// Gamestart and Player init
const game = (() => {
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
    btnStartGame.addEventListener('click', startGame)
    //logic to start the game
    function inputHasValue(){
        let hasVal = false;
        for(let player of playerNamesInput){
           return player.value !== '' ? hasVal = true : hasVal = false;
        }
    }
    function startGame() {
        let playersCount = playerNamesInput.length;
        if (inputHasValue()) {
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
        createPlayers();
    }
    //Factory Function to create Players
    const Player = (name, sign) => {
        return { name, sign }
    }
    function createPlayers() {
        for (let i in playerNames) {
            players[i] = Player(playerNames[i], playerSign[i]);
        }
    }

    return {players} 
})()