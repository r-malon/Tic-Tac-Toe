"use strict";

window.onload = function() {
	document.getElementById("knowmore").addEventListener("click", getWikiSummary);
	spawnGrid(3);
}


function spawnGrid(size) {
	var grid = document.getElementById("grid");

	for (var i = 0; i < size; i++) {
		var row = document.createElement("div");
		row.className = "row";
		grid.appendChild(row);

		for (var j = 0; j < size; j++) {
			var block = document.createElement("div");
			block.className = "block";
			block.setAttribute("data-value", 0);
			block.addEventListener("click", function() {
				this.innerHTML = "Hello World";
			});
			row.appendChild(block);
		}
	}
}

function getWikiSummary() {
//	httpGet(`https://${lang}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=${title}`, parseResponse);
	var langs = document.getElementById("language");
	var opt = langs.options[langs.selectedIndex];
	httpGet(`https://${opt.value}.wikipedia.org/api/rest_v1/page/summary/${opt.getAttribute('data-title')}`, parseResponse);
}

function parseResponse(xhttp) {
	const response = JSON.parse(xhttp.responseText);
	var summary = document.getElementById("summary");
	summary.style.display = "block";
	summary.innerHTML = response.extract;
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
