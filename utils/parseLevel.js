import { createEntity } from "./createEntity";
import { placeEntity } from "./placeEntity";
import { generateEntities, removeEntities } from "./generateEntities";

import { ROW_COUNT, COL_COUNT } from "../constants";

export function parseLevel(levelMap) {
    let playerPosition = {};

    const targetsPositions = [];
    const boxPositions = [];
    const wallPositions = [];

    for (let row = 0; row < ROW_COUNT; row++) {
        for (let col = 0; col < COL_COUNT; col++) {
            const tile = levelMap[row][col];

            if (tile === "P") playerPosition = { row, col };
            else if (tile === "B") boxPositions.push({ row, col });
            else if (tile === "W") wallPositions.push({ row, col });
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
