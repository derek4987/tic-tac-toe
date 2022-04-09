// Gameboard object module
const gameboard = (() => {
    let board = Array(9).fill('');
    const displayBoard = () => {
        const boardGrid = document.querySelector('#board');
        boardGrid.innerHTML = `
            <div class="square">
                <div id="s0">${board[0]}</div>
            </div>
            <div class="square">
                <div id="s1">${board[1]}</div>
            </div>
            <div class="square">
                <div id="s2">${board[2]}</div>
            </div>
            <div class="square">
                <div id="s3">${board[3]}</div>
            </div>
            <div class="square">
                <div id="s4">${board[4]}</div>
            </div>
            <div class="square">
                <div id="s5">${board[5]}</div>
            </div>
            <div class="square">
                <div id="s6">${board[6]}</div>
            </div>
            <div class="square">
                <div id="s7">${board[7]}</div>
            </div>
            <div class="square">
                <div id="s8">${board[8]}</div>
            </div>
        `;
    }
    return { displayBoard, board };
})();


// Factory function for Player
const Player = (name, marker) => {
    // updates array and displays updated board 
    const selectSquare = () => {
        for (let i=0; i<gameboard.board.length; i++) {
            document.addEventListener('click', function(e) {
                if (e.target.matches(`#s${i}`)) {
                    gameboard.board[i] = marker;
                    gameboard.displayBoard();
                }
            }, false)
        }
    };
    return {  };
};

const john = Player('john', 'X');
john.selectSquare();
// const doe = Player('doe', 'O');
// doe.selectSquare();

// tie name value to value inputed in start game menu modal


// displayController object module
const displayController = ((player1, player2) => {
    const startGame = () => {

    }

    const takeTurn = () => {
        if (gameboard.board.filter(selected => selected.length )) {
            player1.selectSquare();
        } else {
            player2.selectSquare();
        }
    }

})();