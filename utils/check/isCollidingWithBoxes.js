export function isCollidingWithBoxes(
    entityPosition,
    boxPositions,
    excludeIndex = -1
) {
    for (let index = 0; index < boxPositions.length; index++) {
        const box = boxPositions[index];

        if (
            index !== excludeIndex &&
            box.row === entityPosition.row &&
            box.col === entityPosition.col
        ) {
            return index; // Return the index of the colliding box
        }
    }

    return -1; // No collision with boxes
}
