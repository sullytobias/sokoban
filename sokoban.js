// sokoban.js

// Constants
const tileSize = 50;
const rowCount = 5;
const colCount = 5;

// Level map
const levelMap = ["WWWWW", "WP..W", "W.B.W", "W...W", "WWWWW"];

// Create Pixi Applicationz
const app = new PIXI.Application({
    width: colCount * tileSize,
    height: rowCount * tileSize,
    backgroundColor: 0xaaaaaa,
});
document.body.appendChild(app.view);

// Game state
let playerPosition = {};
const boxPositions = [];
const wallPositions = [];

// Parse level map to initialize positions
for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
        const tile = levelMap[row][col];
        if (tile === "P") {
            playerPosition = { row, col };
        } else if (tile === "B") {
            boxPositions.push({ row, col });
        } else if (tile === "W") {
            wallPositions.push({ row, col });
        }
    }
}

// Create player square
const playerSquare = createSquare(0x00ff00); // Green color
placeSquare(playerSquare, playerPosition);
app.stage.addChild(playerSquare);

// Create box squares
const boxSquares = boxPositions.map(() => createSquare(0x8b4513)); // Brown color
boxPositions.forEach((position, index) =>
    placeSquare(boxSquares[index], position)
);
boxSquares.forEach((boxSquare) => app.stage.addChild(boxSquare));

// Create wall squares
const wallSquares = wallPositions.map(() => createSquare(0x000000)); // Black color
wallPositions.forEach((position, index) =>
    placeSquare(wallSquares[index], position)
);
wallSquares.forEach((wallSquare) => app.stage.addChild(wallSquare));

// Handle keyboard input
window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
    const newPosition = { ...playerPosition };

    switch (e.key) {
        case "ArrowUp":
            newPosition.row--;
            break;
        case "ArrowDown":
            newPosition.row++;
            break;
        case "ArrowLeft":
            newPosition.col--;
            break;
        case "ArrowRight":
            newPosition.col++;
            break;
        default:
            return;
    }

    // Check collision with walls
    // Check collision with walls
    if (!isCollidingWithWalls(newPosition)) {
        // Check collision with boxes
        const boxIndex = isCollidingWithBoxes(newPosition);
        console.log("collidedboxIndex", boxIndex);
        if (boxIndex !== -1) {
            const newBoxPosition = { ...boxPositions[boxIndex] };

            // Calculate the new position for the box
            const boxNewPosition = {
                row:
                    newBoxPosition.row + (newPosition.row - playerPosition.row),
                col:
                    newBoxPosition.col + (newPosition.col - playerPosition.col),
            };

            // Move box if the space in the desired direction is free

            if (
                !isCollidingWithWalls(boxNewPosition) &&
                !isCollidingWithBoxes(boxNewPosition, boxIndex) !== -1
            ) {
                console.log("Sould Move The Box");
                placeSquare(boxSquares[boxIndex], boxNewPosition);
                placeSquare(playerSquare, newPosition);

                playerPosition = newPosition; // Update player position
                boxPositions[boxIndex] = boxNewPosition;
            }
        } else {
            // Move player if the space in the desired direction is free
            placeSquare(playerSquare, newPosition);
            playerPosition = newPosition; // Update player position
        }
    } else {
        console.log("Wall Colliding");
    }
}

function isCollidingWithWalls(position) {
    return wallPositions.some(
        (wall) => wall.row === position.row && wall.col === position.col
    );
}

function isCollidingWithBoxes(position, excludeIndex = -1) {
    for (let index = 0; index < boxPositions.length; index++) {
        const box = boxPositions[index];
        if (
            index !== excludeIndex &&
            box.row === position.row &&
            box.col === position.col
        ) {
            console.log("Box Collided", boxPositions[index]);
            return index; // Return the index of the colliding box
        }
    }

    console.log("No Box Collided");
    return -1; // No collision with boxes
}

function createSquare(color) {
    const square = new PIXI.Graphics();
    square.beginFill(color);
    square.drawRect(0, 0, tileSize, tileSize);
    square.endFill();
    return square;
}

function placeSquare(square, position) {
    square.x = position.col * tileSize;
    square.y = position.row * tileSize;
}
