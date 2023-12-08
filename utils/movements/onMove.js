import { generateEntities } from "../generateEntities";
import { placeEntity } from "../placeEntity";

import { isCollidingWithWalls } from "../check/isCollidingWithWalls";
import { isCollidingWithBoxes } from "../check/isCollidingWithBoxes";
import { isOnTarget } from "../check/isOnTarget";

import { LEVEL_1 } from "../levels/level1";

import { parseLevel } from "../parseLevel";

let {
    playerEntity,
    boxEntities,
    wallEntities,
    targetEntities,
    playerPosition,
    boxPositions,
    wallPositions,
    targetsPositions,
} = parseLevel(LEVEL_1);

export function handleKeyDown(e) {
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
    if (!isCollidingWithWalls(newPosition, wallPositions)) {
        // Check collision with boxes
        const boxIndex = isCollidingWithBoxes(newPosition, boxPositions);
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
                !isCollidingWithWalls(boxNewPosition, wallPositions) &&
                !isCollidingWithBoxes(
                    boxNewPosition,
                    boxPositions,
                    boxIndex
                ) !== -1
            ) {
                placeEntity(boxEntities[boxIndex], boxNewPosition);
                placeEntity(playerEntity, newPosition);

                playerPosition = newPosition; // Update player position
                boxPositions[boxIndex] = boxNewPosition;

                if (isOnTarget(boxNewPosition, targetsPositions))
                    console.log("Success");
            }
        } else {
            // Move player if the space in the desired direction is free
            placeEntity(playerEntity, newPosition);
            playerPosition = newPosition; // Update player position
        }
    }
}