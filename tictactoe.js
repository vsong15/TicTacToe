const PLAYER_ONE_SYMBOL = 'X';
const PLAYER_TWO_SYMBOL = 'O';
let moves = 0;

class TicTacToe {
	gameHasWinner(){
		const winningCombos = [
			[0,1,2], [3,4,5], [6,7,8], // horizontal
			[0,3,6], [1,4,7], [2,5,8], // vertical
			[0,4,8], [2,4,6]           // diagonal
		];
		return winningCombos.find(combo => {
			if(this.board[combo[0]] != "" && this.board[combo[1]] != "" && this.board[combo[2]] != "" &&
			this.board[combo[0]] == this.board[combo[1]] && this.board[combo[1]] == this.board[combo[2]]){
				document.getElementById(combo[0].toString()).style.backgroundColor = '#84C7D0';
				document.getElementById(combo[1].toString()).style.backgroundColor = '#84C7D0';
				document.getElementById(combo[2].toString()).style.backgroundColor = '#84C7D0';
				return true;
			}
			else
				return false;
		});
	}

	handleSquareClick(event){
		moves += 1;
		this.executeMove(event.target.id);
	}

	updateBoard(){
		let gameBoard = document.getElementById('gameBoard');
		let squareElements = gameBoard.childNodes;
		squareElements.forEach((element, index) => {
			if(element.innerText != this.board[index]){
				element.innerText = this.board[index];
			}
		});
	}

	executeMove(moveIndex){
		if(this.board[moveIndex] == ""){
			this.board[moveIndex] = this.currentPlayer;
			this.updateBoard();
			if(!this.gameHasWinner()){
				this.currentPlayer = (this.currentPlayer == PLAYER_ONE_SYMBOL ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL);
			}
			else {
				setTimeout(() =>{
					alert("Player " + this.currentPlayer + " is the winner!");
					this.start();
				}, 10);
			} 
			if(!this.gameHasWinner() && moves == 9){
				setTimeout(() =>{
					alert("Tie! Neither player is the winner!");
					this.start();
				}, 10);
			}
			//restart
		}
	}

	drawBoard(){
		document.body.innerHTML = "";
		let gameBoard = document.createElement('div');
		gameBoard.id = 'gameBoard';
		gameBoard.classList.add('board');
		gameBoard.addEventListener('click', this.handleSquareClick.bind(this));

		this.board.forEach((square, index) => {
			let squareElement = document.createElement('div');
			squareElement.id = index;
			squareElement.classList.add('square');
			gameBoard.appendChild(squareElement);
		});
		document.body.appendChild(gameBoard);
	}

	start(){
		moves = 0;
		this.board = ["", "", "",
					  "", "", "",
					  "", "", ""];
		this.currentPlayer = PLAYER_ONE_SYMBOL;
		this.drawBoard();
	}
}

let game = new TicTacToe();
game.start();