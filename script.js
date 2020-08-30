let tiles = document.getElementsByClassName("board")[0].children,
    modal = document.getElementsByClassName("modal")[0],
    message = document.getElementsByClassName("message")[0],
    resetBtn = document.getElementsByClassName("reset_btn")[0],
    indicator = document.getElementsByClassName("player_indicator")[0],
    turn = 0,
    player = "",
    moves = [];

indicator.textContent = "Player O, it is your turn.";

function markBoard(e) {
    if (turn == 1 || turn % 2 !== 0) {
        player = "X";
    } else {
        player = "O";
    }

    moves.push({ tile: e.target.textContent, player: player });

    for (let i = 0; i < tiles.length; i++) {
        if (
            e.target.textContent == tiles[i].textContent &&
            tiles[i].textContent !== "X" &&
            tiles[i].textContent !== "O"
        ) {
            tiles[i].style.transition = "all 1s ease";
            tiles[i].textContent = player;
            tiles[i].classList.add("new-board_tile");
            turn++;

            if (player == "X") {
                indicator.textContent = "Player O, it is your turn.";
            } else {
                indicator.textContent = "Player X, it is your turn.";
            }
        }
    }

    if (turn >= 3) {
        determineWinner();
    }
}

function determineWinner() {
    let playerMoves = [],
        playerTiles = [],
        playerWon = false;

    playerMoves.push(moves.filter(mark => mark.player == player));

    for (let i = 0; i < playerMoves[0].length; i++) {
        playerTiles.push(playerMoves[0][i].tile);
    }

    if (
        playerTiles.includes("1") &&
        playerTiles.includes("2") &&
        playerTiles.includes("3")
    ) {
        playerWon = true;
    } else if (
        playerTiles.includes("4") &&
        playerTiles.includes("5") &&
        playerTiles.includes("6")
    ) {
        playerWon = true;
    } else if (
        playerTiles.includes("7") &&
        playerTiles.includes("8") &&
        playerTiles.includes("9")
    ) {
        playerWon = true;
    } else if (
        playerTiles.includes("1") &&
        playerTiles.includes("5") &&
        playerTiles.includes("9")
    ) {
        playerWon = true;
    } else if (
        playerTiles.includes("3") &&
        playerTiles.includes("5") &&
        playerTiles.includes("7")
    ) {
        playerWon = true;
    } else if (
        playerTiles.includes("1") &&
        playerTiles.includes("4") &&
        playerTiles.includes("7")
    ) {
        playerWon = true;
    } else if (
        playerTiles.includes("2") &&
        playerTiles.includes("5") &&
        playerTiles.includes("8")
    ) {
        playerWon = true;
    } else if (
        playerTiles.includes("3") &&
        playerTiles.includes("6") &&
        playerTiles.includes("9")
    ) {
        playerWon = true;
    } else {
        playerWon = false;
    }

    if (playerWon == true) {
        message.textContent = `Player ${player} Won!`;
        modal.style.opacity = 1;
        modal.style.display = "flex";
        modal.style.zIndex = 99;
        indicator.textContent = "";         
    } else if (turn == 9) {
        message.textContent = "Its a draw.";
        modal.style.opacity = 1;
        modal.style.display = "flex";
        modal.style.zIndex = 99;
        indicator.textContent = "";
    }
}

for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", markBoard);
}

function resetBoard() {
    moves = [];
    turn = 0;
    indicator.textContent = "Player O, it is your turn.";

    modal.style.opacity = 0;
    modal.style.transition = "opacity 1s ease";
    modal.style.display = "none";
 
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove("new-board_tile");
        tiles[i].classList.add("board_tile");
        tiles[i].style.transition = "none";
        tiles[i].textContent = [i + 1];
    }
}

resetBtn.addEventListener("click", resetBoard);