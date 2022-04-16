

// Gameboard object module
const gameboard = (() => {
    let board = Array(9).fill('');
    // variable used to alternate turns, start game at 0 for player 1 to go first and 1 for player 2
    let totalTurns = 0;
    const displayBoard = () => {
        const boardGrid = document.querySelector('#board');
        boardGrid.innerHTML = `
            <div class="square">
                <div id="s0" class="s">${board[0]}</div>
            </div>
            <div class="square">
                <div id="s1" class="s">${board[1]}</div>
            </div>
            <div class="square">
                <div id="s2" class="s">${board[2]}</div>
            </div>
            <div class="square">
                <div id="s3" class="s">${board[3]}</div>
            </div>
            <div class="square">
                <div id="s4" class="s">${board[4]}</div>
            </div>
            <div class="square">
                <div id="s5" class="s">${board[5]}</div>
            </div>
            <div class="square">
                <div id="s6" class="s">${board[6]}</div>
            </div>
            <div class="square">
                <div id="s7" class="s">${board[7]}</div>
            </div>
            <div class="square">
                <div id="s8" class="s">${board[8]}</div>
            </div>
        `;
    }
    return { displayBoard, board, totalTurns };
})();

// Factory function for Player. Auto assign player1 as 'X' and player2 as 'O';
const Player = (name, marker) => {
    // updates array and displays updated board
    // DOM query selectors to assign name and marker to player
    // change Player to a constructor possibly ??
    return { name, marker };
};

const playGame = (() => {
    // variable to turn of event listener if game has winner;
    let isTrue = false;

    const takeTurn = (player1, player2) => {
        document.addEventListener('click', function(e) {
            for (let i=0; i<gameboard.board.length; i++) {
                if (e.target.matches(`#s${i}`)) {
                    // prevents additional moves if checkWinner returns true
                    if (isTrue === true) {
                        return;
                    } else {
                        if (e.target.textContent === '') {
                            const squaresSelected = gameboard.board.filter(e => e != '').length;
                            // even total number of turns, 'X' makes move, odd 'O' makes move
                            if (gameboard.totalTurns % 2 === 0 && squaresSelected < 9) {
                                gameboard.board[i] = player1.marker;  
                                displayController.p2TurnArrow();                     
                            } else if (gameboard.totalTurns % 2 === 1 && squaresSelected < 9) {
                                gameboard.board[i] = player2.marker;
                                displayController.p1TurnArrow();
                            } else if (squaresSelected >= 9) {
                                return;
                            } else return;
                            gameboard.displayBoard();
                            if (squaresSelected < 9) {
                            gameboard.totalTurns += 1; 
                            }
                        } else return;
                        console.log(gameboard.totalTurns);
                        checkWinner();
                    }
                }                
            }
        }, false)
    }

    const checkWinner = () => {
        const board = gameboard.board;
        // check if all values in array are equal
        const allEqual = arr => arr.every(val => val === arr[0]);
        if (
            // Winning combinations where value is not ''
            allEqual([board[0], board[1], board[2]]) === true && board[0] !== '' ||
            allEqual([board[3], board[4], board[5]]) === true && board[3] !== '' ||
            allEqual([board[6], board[7], board[8]]) === true && board[6] !== '' ||
            allEqual([board[0], board[3], board[6]]) === true && board[0] !== '' ||
            allEqual([board[1], board[4], board[7]]) === true && board[1] !== '' ||
            allEqual([board[2], board[5], board[8]]) === true && board[2] !== '' ||
            allEqual([board[0], board[4], board[8]]) === true && board[0] !== '' ||
            allEqual([board[2], board[4], board[6]]) === true && board[2] !== ''
        ) {
            // open congrats message to winner and stop other inputs
            console.log('Winner');
            displayController.p1p2ArrowGrayed();
            displayController.addScore();
            isTrue = true;
            return true, isTrue;
        } else if (
            // checks for tie
            board.filter(e => e != '').length === 9 && (
                allEqual([board[0], board[1], board[2]]) === false ||
                allEqual([board[3], board[4], board[5]]) === false ||
                allEqual([board[6], board[7], board[8]]) === false ||
                allEqual([board[0], board[3], board[6]]) === false ||
                allEqual([board[1], board[4], board[7]]) === false ||
                allEqual([board[2], board[5], board[8]]) === false ||
                allEqual([board[0], board[4], board[8]]) === false ||
                allEqual([board[2], board[4], board[6]]) === false
            )
        ) {
            console.log('Tie');
            displayController.p1p2ArrowGrayed();
            displayController.addScore();
        } else return false
    }

    return { takeTurn, isTrue }
})()

// displayController object module
const displayController = (() => {
    let p1Score = 0;
    let p2Score = 0;
    let ties = 0;
    /* winner is variable that shows winner of each round. This value is used to
    add the players name to the message of gameOverModal +1 X, -1 O, 0 for tie */
    let winner = 0;

    const startGame = () => {
        // modal open to start game and choose your player
    }

    const p1TurnArrow = () => {
        document.querySelector('.p1Arrow').classList.remove('arrowGrayedOut');
        document.querySelector('.p2Arrow').classList.add('arrowGrayedOut');
    }

    const p2TurnArrow = () => {
        document.querySelector('.p1Arrow').classList.add('arrowGrayedOut');
        document.querySelector('.p2Arrow').classList.remove('arrowGrayedOut');
    }

    const p1p2ArrowGrayed = () => {
        document.querySelector('.p1Arrow').classList.add('arrowGrayedOut');
        document.querySelector('.p2Arrow').classList.add('arrowGrayedOut');
    }

    const addScore = () => {
        const board = gameboard.board;
        const allEqual = arr => arr.every(val => val === arr[0]);
        if (
            // Winning combinations where value is not ''
            allEqual([board[0], board[1], board[2]]) === true && board[0] === 'X' ||
            allEqual([board[3], board[4], board[5]]) === true && board[3] === 'X' ||
            allEqual([board[6], board[7], board[8]]) === true && board[6] === 'X' ||
            allEqual([board[0], board[3], board[6]]) === true && board[0] === 'X' ||
            allEqual([board[1], board[4], board[7]]) === true && board[1] === 'X' ||
            allEqual([board[2], board[5], board[8]]) === true && board[2] === 'X' ||
            allEqual([board[0], board[4], board[8]]) === true && board[0] === 'X' ||
            allEqual([board[2], board[4], board[6]]) === true && board[2] === 'X'
        ) {
            p1Score += 1;
            document.querySelector('#p1Score').textContent = p1Score;
            winner += 1; // winner vaule of 1 gives point to player X
        } else if (
            allEqual([board[0], board[1], board[2]]) === true && board[0] === 'O' ||
            allEqual([board[3], board[4], board[5]]) === true && board[3] === 'O' ||
            allEqual([board[6], board[7], board[8]]) === true && board[6] === 'O' ||
            allEqual([board[0], board[3], board[6]]) === true && board[0] === 'O' ||
            allEqual([board[1], board[4], board[7]]) === true && board[1] === 'O' ||
            allEqual([board[2], board[5], board[8]]) === true && board[2] === 'O' ||
            allEqual([board[0], board[4], board[8]]) === true && board[0] === 'O' ||
            allEqual([board[2], board[4], board[6]]) === true && board[2] === 'O'
        ) {
            p2Score +=1;
            document.querySelector('#p2Score').textContent = p2Score;
            winner -= 1 // winner value of -1 gives point to player O
        } else {
            ties += 1;
            document.querySelector('#totalTies').textContent = ties;
        }
        gameOverModal();
    }

    const restartButton = () => {
        // resets points, clears board, and sets totalTurns variable to 0, isTrue to false
        // p1Score = p2Score = ties = 0;
        // document.querySelector('#p1Score').textContent = 0;
        // document.querySelector('#p2Score').textContent = 0;
        // document.querySelector('#totalTies').textContent = 0;

        // gameboard.board = Array(9).fill('');
        // gameboard.displayBoard();

        // gameboard.totalTurns = 0;

        // playGame.isTrue = false;

        // p1TurnArrow();
        window.location.reload();
    }

    const gameOverModal = () => {
        document.querySelector('#gameOverModal').classList.add('modal-open');
        if (winner === 1) {
            document.querySelector('.message').textContent = 'Player 1 Wins';
            console.log(winner)
        } else if (winner === -1) {
            document.querySelector('.message').textContent = 'Player 2 Wins';
            console.log(winner)
        } else {
            document.querySelector('.message').textContent = "It's a tie"
        }
        winner = 0;
        console.log(winner);
    }

    const continueButton = () => {
        document.querySelector('#gameOverModal').classList.remove('modal-open');
        for (let i=0; i<gameboard.board.length; i++) {
            gameboard.board[i] = '';
        };
        gameboard.displayBoard();
        gameboard.totalTurns = 0;
        playGame.isTrue = false;
        p1TurnArrow();
    }

    const playButton = () => {
        const p1info = document.querySelector('#p1info');
        const p2info = document.querySelector('#p2info');
        let p1value = p1info.value;
        let p2value = p2info.value;
        document.querySelector('.p1name').textContent = p1value;
        document.querySelector('.p2name').textContent = p2value;
        
        const player1 = Player(p1value,'X');
        const player2 = Player(p2value,'O');

        playGame.takeTurn(player1,player2);
        console.log(p1value,p2value);

        document.querySelector('#startModal').classList.remove('modal-open');
    }
    
    return { p1TurnArrow, p2TurnArrow, p1p2ArrowGrayed, addScore, restartButton, continueButton, playButton };
})();

// tie name value to value inputed in start game menu modal


// const john = Player('john', 'X');
// const doe = Player('doe', 'O');
// playGame.takeTurn(john,doe);

// document.querySelector('#playButton').addEventListener('click', function(e) {
//     const p1info = document.querySelector('#p1info');
//     const p2info = document.querySelector('#player2');
//     let p1value = p1info.value;
//     alert(p1value);
// });

// Buttons event delegator
document.addEventListener('click', function(e) {
    // start modal items
    if (e.target.matches('#playButton')) {
        displayController.playButton();
    }

    // restart button
    if (e.target.matches('.restart') || e.target.matches('.rb-img')) {
        displayController.restartButton();
    }

    // continue button
    if (e.target.matches('#go-continue')) {
        displayController.continueButton();
    }

}, false);
// document.querySelector('.restart').addEventListener('click', function(e) {
//     displayController.restartButton();
// })