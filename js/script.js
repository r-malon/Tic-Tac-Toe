"use strict";

window.onload = function() {
	document.getElementById("knowmore").addEventListener("click", getWikiSummary);
	spawnGrid(N);
	showTurn();
	virtualGrid = [
		[0, 0, 0], 
		[0, 0, 0], 
		[0, 0, 0], 
	];
}
var blocks = document.getElementsByClassName("block");
var rows = document.getElementsByClassName("row");

function spawnGrid(size) {
	var grid = document.getElementById("grid");

	for (let i = 0; i < size; i++) {
		var row = document.createElement("div");
		row.className = "row";
		grid.appendChild(row);

		for (let j = 0; j < size; j++) {
			var block = document.createElement("div");
			block.className = "block";

			block.addEventListener("click", function() {
				if (!this.hasAttribute("checked")) {
					makeMove(this, i, j);
					showTurn();
					if (turns == 2*N - 1) {}
				}
			});
			row.appendChild(block);
		}
	}
}

function logicHook(block) {
	// body...
}

function showTurn() {
	var turnText = document.getElementById('turn');
	turnText.textContent = PLAYERS[playerTurn];
	turnText.style.color = PLAYERS[playerTurn];
}

function getWikiSummary() {
	var langs = document.getElementById("language");
	var opt = langs.options[langs.selectedIndex];
	httpGet(`https://${opt.value}.wikipedia.org/api/rest_v1/page/summary/${opt.getAttribute('data-title')}`, 
		parseResponse);
}

function parseResponse(xhttp) {
	const response = JSON.parse(xhttp.responseText);
	var summary = document.getElementById("summary");
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
