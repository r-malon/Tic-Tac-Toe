'use strict';

const N = 3;
const PLAYERS = ['red', 'blue'];
var virtualGrid;
var turns = 0, playerTurn = 0, gameEnded = false;


function makeMove(block) {
	block.setAttribute('data-checked', ''); // set true
	virtualGrid[block.row][block.col] = playerTurn;
	block.style.background = PLAYERS[playerTurn];
	turns++;
	playerTurn = turns % 2;
}

function checkVictory() {
	for (let i = 0; i < N; i++)
		if (checkRow(i) || checkColumn(i))
			return true;
	return checkDiagonal() || checkAntiDiagonal();
}

function checkDiagonal() {
	let sum = 0;
	for (let i = 0; i < N; i++) {
		if (isNaN(virtualGrid[i][i]))
			return false;
		sum += virtualGrid[i][i];
	}
	return sum == N || sum == 0;
}

function checkAntiDiagonal() {
	let sum = 0;
	for (let i = 0; i < N; i++) {
		if (isNaN(virtualGrid[i][(N - 1) - i]))
			return false;
		sum += virtualGrid[i][(N - 1) - i];
	}
	return sum == N || sum == 0;
}

function checkRow(row) {
	let sum = virtualGrid[row].reduce((a, b) => a + b, 0);
	return sum == N || sum == 0;
}

function checkColumn(column) {
	let sum = 0;
	for (let i = 0; i < N; i++) {
		if (isNaN(virtualGrid[i][column]))
			return false;
		sum += virtualGrid[i][column];
	}
	return sum == N || sum == 0;
}
