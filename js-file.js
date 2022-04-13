// Gameboard object module
const gameboard = (() => {
    let board = Array(9).fill('');
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
    const selectSquare = () => {
        // for (let i=0; i<gameboard.board.length; i++) {
        //     document.addEventListener('click', function(e) {
        //         if (e.target.matches(`#s${i}`)) {
        //             gameboard.board[i] = marker;
        //             gameboard.displayBoard();
        //             gameboard.totalTurns += 1;
        //         }
        //     }, false)
        // }
    };
    return { selectSquare, marker };
};


const john = Player('john', 'X');
// john.selectSquare();
const doe = Player('doe', 'O');
// doe.selectSquare();


// playgame factory function
// const Players = (player1, player2) => {
//     const takeTurn = () => {
//         if (gameboard.totalSquaresSelected % 2 === 0) {
//             player1.selectSquare();
//         } else if (gameboard.totalSquaresSelected % 2 === 1) {
//             player2.selectSquare();
//         } else if (gameboard.totalSquaresSelected === 9) {
//             return
//         } else return;
//     }
//     return { takeTurn }
// };

// const playGame = (() => {
//     const takeTurn = (player1, player2) => {
//         console.log(gameboard.totalTurns);
//         if (gameboard.totalTurns % 2 === 0) {
//             player1.selectSquare();
//         } else if (gameboard.totalTurns % 2 === 1) {
//             player2.selectSquare();
//         } else if (gameboard.totalTurns >= 9) {
//             return
//         } else return;
//     }
//     return { takeTurn }
// })()

const playGame = (() => {
    const takeTurn = (player1, player2) => {
        document.addEventListener('click', function(e) {
            for (let i=0; i<gameboard.board.length; i++) {
                if (e.target.matches(`#s${i}`)) {
                    // prevents additional moves if checkWinner returns true
                    if (checkWinner() === true) {
                        return
                    } else {
                        if (e.target.textContent === '') {
                            // even total number of turns, 'X' makes move, odd 'O' makes move
                            if (gameboard.totalTurns % 2 === 0 && gameboard.totalTurns < 9) {
                                gameboard.board[i] = player1.marker;                        
                            } else if (gameboard.totalTurns % 2 === 1 && gameboard.totalTurns < 9) {
                                gameboard.board[i] = player2.marker;
                            } else if (gameboard.totalTurns >= 9) {
                                return;
                            } else return;
                            gameboard.displayBoard();
                            if (gameboard.totalTurns < 9) {
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
        if (allEqual)
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
            return true;
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
            console.log('Tie')
        } else return false
    }

    return { takeTurn }
})()

// const players = Players(john, doe);
// players.takeTurn();

playGame.takeTurn(john,doe);

// document.addEventListener('click', function(e) {
//     if (e.target.matches('#board')) {
//         let totalSquaresSelected = gameboard.board.filter(e => e != '').length
//         if (totalSquaresSelected % 2 === 0) {
//             john.selectSquare();
//         } else {
//             doe.selectSquare();
//         }
//         // players.takeTurn();
//         console.log('click')
//     }
// }, false)


// displayController object module
const displayController = (() => {
    const startGame = () => {

    }

    
    return { };
})();

// tie name value to value inputed in start game menu modal