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

// displayController object module
const displayController = (() => {
    

})();

// Factory function for Player
const Player = (name, marker) => {


};