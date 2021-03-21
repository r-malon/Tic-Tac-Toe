"use strict";

window.onload = function() {
	document.getElementById("knowmore").addEventListener("click", getWikiSummary);
	spawnGrid(N);
	showTurn();
	virtualGrid = Array.from(Array(N), () => new Array(N).fill(NaN));
}


function spawnGrid(size) {
	var grid = document.getElementById("grid");

	for (let i = 0; i < size; i++) {
		var row = document.createElement("div");	// useless?
		row.className = "row";
		grid.appendChild(row);

		for (let j = 0; j < size; j++) {
			var block = document.createElement("div");
			block.className = "block";
			block["row"] = i;	// hacky?
			block["col"] = j;

			block.addEventListener("click", logicHook);
			row.appendChild(block);
		}
	}
}

function logicHook(event) {
	let block = event.currentTarget;

	if (!(block.hasAttribute("checked")) && !gameEnded) {
		makeMove(block);
		showTurn();
		if (turns >= 2*N - 1) {
			if (checkVictory()) {
				showVictory();
				gameEnded = !gameEnded;
				return;
			}
			if (turns >= N*N) document.getElementById('status').textContent = "DRAW";
		}
	}
}

function showVictory() {
	let turnText = document.getElementById('turn');
	turnText.textContent = PLAYERS[!playerTurn|0];
	turnText.style.color = PLAYERS[!playerTurn|0];
	let status = document.getElementById('status');
	status.innerHTML = `PLAYER ${turnText.outerHTML} WINS`;
}

function showTurn() {
	let turnText = document.getElementById('turn');
	turnText.textContent = PLAYERS[playerTurn];
	turnText.style.color = PLAYERS[playerTurn];
}

function getWikiSummary() {
	let langs = document.getElementById("language");
	let opt = langs.options[langs.selectedIndex];
	httpGet(
		`https://${opt.value}.wikipedia.org/api/rest_v1/page/summary/${opt.getAttribute('data-title')}`, 
		parseResponse
	);
}

function parseResponse(xhttp) {
	const response = JSON.parse(xhttp.responseText);
	let summary = document.getElementById("summary");
	summary.style.display = "block";
	summary.textContent = response.extract;
}

function httpGet(url, callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(this);
		}
	};
	xhttp.open("GET", url, true);
//	xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhttp.send();
}
