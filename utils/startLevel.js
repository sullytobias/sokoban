import { ALL_LEVELS } from "./levels";

import { parseLevel } from "./parseLevel";

import { getSelectedLevel } from "./store/chosenLevel";

import { App } from "../app";

export function startLevel() {
    App.stage.removeChildren();

    return ({
        playerEntity,
        boxEntities,
        wallEntities,
        targetEntities,
        playerPosition,
        boxPositions,
        wallPositions,
        targetsPositions,
        container,
    } = parseLevel(ALL_LEVELS[getSelectedLevel()]));
}
