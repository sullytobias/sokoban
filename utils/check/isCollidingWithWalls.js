export function isCollidingWithWalls(entityPosition, wallPositions) {
    return wallPositions.some(
        (wall) =>
            wall.row === entityPosition.row && wall.col === entityPosition.col
    );
}
