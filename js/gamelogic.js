"use strict";

// Min moves: 2*n - 1
const N = 5;
const PLAYERS = ["red", "blue"];
var virtualGrid, i;
var turns = 0, playerTurn = 0;


function makeMove(block, rowNumber, colNumber) {
	block.setAttribute("checked", '');	// set true, data-* is more correct
//	block.setAttribute("rowNumber", rowNumber);
//	block.setAttribute("colNumber", colNumber);
	block.style.background = PLAYERS[playerTurn];
	turns++;
	playerTurn = turns % 2;
}

function checkEnd() {
	// body...
}

function checkDiagonal() {
	let counter = 0;

	for (i = 0; i < N; i++) {
		if (virtualGrid[i][i]) counter++;
	}
	return counter == N;
}

function checkRow(row) {
	return (virtualGrid[row].reduce((a, b) => a + b, 0) == N);
}

function checkAllRows() {
	var rows = document.getElementsByClassName("row");
	return (virtualGrid[row].reduce((a, b) => a + b, 0) == N);
}
