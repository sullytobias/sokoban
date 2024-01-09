import { ALL_LEVELS } from "./levels";

import { parseLevel } from "./parseLevel";

import { getSelectedLevel } from "./store/chosenLevel";

import { App } from "../app";

export function startLevel() {
    App.stage.removeChildren();

    const { map, size } = ALL_LEVELS[getSelectedLevel()];

    return ({
        playerEntity,
        boxEntities,
        wallEntities,
        targetEntities,
        playerPosition,
        boxPositions,
        wallPositions,
        targetsPositions,
    } = parseLevel(map, size));
}