// variables always go at the top -> this is step 1
// these are the connections that you're making to elements on the page 
// use CSS selectors to make connections to elements with JavaScript

// create a 1 to 1 connection with a variable -> querySelector("queryString")
// let theButton = document.querySelector("#buttonOne");

// create a 1 to many connection with a variable -> querySelectorAll("queryString")
let theButtons = document.querySelectorAll("#buttonHolder img"),
	theHeading = document.querySelector("#headLine h1"),
	puzzleBoard = document.querySelector(".puzzle-board"),
	puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
	dropZones = document.querySelectorAll('.drop-zone'),
	// store the dragged piece in a global variable
	// because we need it in the handleDrop function
	draggedPiece;

// step 3
// functionality always goes in the middle -> how do we want
// the app to behave?
function changeBGImage() {
	// the `` is a JavaScript template string. It tells the JS enging to evaluate the expression
	// inside the braces - run that little bit of code. In this case it's just pulling the ID of the
	// button we clicked on and putting it at the end of the image name (0, 1, 2, 3)
	// and updating the background-image style of the puzzle board element.

	// bug fix #2 should go here. it's at most 3 lines of JS code.
	puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
}

// Function to handle drag start event
function handleStartDrag() {
    console.log('started dragging this piece:', this);

    // Store a reference to the puzzle piece image that we're dragging
    // so we can use it later and move it to a drop zone
    draggedPiece = this;
}

// Function to handle drag over event
function handleDragOver(e) {
    e.preventDefault(); // Prevent default dragover behavior
    console.log('dragged over me');
}

// Function to handle drop event
function handleDrop(e) {
    e.preventDefault();
    console.log('dropped something on me');

    //BUG FIX #1: if there's already a puzzle piece in this drop zone do not allow another piece to be dropped in the same zone.
    if (this.children.length === 0) {
        this.appendChild(draggedPiece);
        draggedPiece.classList.add('dropped'); // this class indicates that the piece has been dropped
    } else {
        console.log("Drop Error: There is already a piece here, cannot drop piece.");
    }
}

// BUG FIX #2a: Function to reset puzzle pieces. Reset pieces if the drop zone is full, do something else if empty.
function resetPuzzlePieces() {
    // Go through each drop zone and remove any pieces that are there
    dropZones.forEach(zone => {
        if (zone.firstChild) {
            const puzzlePieces = Array.from(zone.children);
            puzzlePieces.forEach(piece => {
                document.querySelector('.puzzle-pieces').appendChild(piece);
            });
        } else {
            // Do something else if there are no puzzle pieces in the drop zone
        }
    });
}

// Event Handling
theButtons.forEach(button => button.addEventListener("click", changeBGImage));
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
dropZones.forEach(zone => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("drop", handleDrop);
});