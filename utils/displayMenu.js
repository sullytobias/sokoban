import { LEVEL_1 } from "./levels/level1";

import { parseLevel } from "./parseLevel";

import { displayMenuOverlay } from "../components/menuOverlay";

export async function showMenuAndGetStartStatus() {
    const isStarted = await displayMenuOverlay();

    return ({
        playerEntity,
        boxEntities,
        wallEntities,
        targetEntities,
        playerPosition,
        boxPositions,
        wallPositions,
        targetsPositions,
    } = parseLevel(LEVEL_1));
}
