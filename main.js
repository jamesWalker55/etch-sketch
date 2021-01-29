"use strict";

function changeCellColor(event) {
	let colors = ["red","orange","yellow","green","cyan","blue","purple","black","grey"]
	event.target.classList.add("active");
	event.target.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

function changeCellOpacity(event) {
	let a = event.target.style.opacity;
	a = a || 0.1;  // change to 0.1 if null
	a = +a;  // convert to num
	event.target.style.opacity = a + 0.1;
}

function askGridSize() {
	let size = prompt("Input size of canvas. (1-100)")
	size = +size;
	while (isNaN(size) || size < 1 || size > 100) {
		size = prompt("Invalid input. Input size of canvas. (1-100)")
		size = +size;
	}
	return size;
}

function createGrid(size) {
	let container = document.createElement("div");
	container.id = "container";
	container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	let button = document.getElementById("btn-reset")
	document.body.appendChild(container);

	let grid = document.createElement("div");
	grid.classList.add("grid")

	for (let i=1; i<=size; i++) {
		for (let j=1; j<=size; j++) {
			let cell = grid.cloneNode(false);
			cell.setAttribute("grid-row", i)
			cell.setAttribute("grid-column", j)
			cell.addEventListener("mouseover", changeCellOpacity);
			cell.addEventListener("mouseover", changeCellColor);
			container.appendChild(cell);
		}
	}
}

function removeGrid() {
	let container = document.getElementById("container");
	if (container === null) {
		return;
	} else {
		container.remove();
	}
}

function setupButton() {
	let button = document.getElementById("btn-reset")
	button.addEventListener("click", () => {
		let size = askGridSize();
		removeGrid();
		createGrid(size);
	});
}

setupButton();

createGrid(16);