export function isOnTarget(entityPosition, targetsPositions) {
    return targetsPositions.some(
        (target) =>
            target.row === entityPosition.row &&
            target.col === entityPosition.col
    );
}
