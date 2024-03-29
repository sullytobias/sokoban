import { createEntity } from "./createEntity";
import { placeEntity } from "./placeEntity";
import { generateEntities, removeEntities } from "./generateEntities";

export function parseLevel(levelMap, size) {
    let playerPosition = {};

    const targetsPositions = [];
    const boxPositions = [];
    const wallPositions = [];

    for (let row = 0; row < size.r; row++) {
        for (let col = 0; col < size.c; col++) {
            const tile = levelMap[row][col];

            if (tile === "P") playerPosition = { row, col };
            else if (tile === "B") boxPositions.push({ row, col });
            else if (tile === "#") wallPositions.push({ row, col });
            else if (tile === "T") targetsPositions.push({ row, col });
        }
    }

    const { playerEntity, boxEntities, wallEntities, targetsEntities } =
        generateEntities(
            playerPosition,
            boxPositions,
            wallPositions,
            targetsPositions
        );

    return {
        playerEntity,
        boxEntities,
        wallEntities,
        targetsEntities,
        playerPosition,
        boxPositions,
        wallPositions,
        targetsPositions,
    };
}
