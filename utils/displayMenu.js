import { ALL_LEVELS } from "./levels";

import { parseLevel } from "./parseLevel";
import { handleOverlayDisplay } from "./handleOverlayDisplay";

import { getSelectedLevel } from "./store/chosenLevel";

import { menuOverlay } from "../components/menuOverlay";

export async function showMenuAndGetStartStatus() {
    await handleOverlayDisplay(menuOverlay);

    return ({
        playerEntity,
        boxEntities,
        wallEntities,
        targetEntities,
        playerPosition,
        boxPositions,
        wallPositions,
        targetsPositions,
    } = parseLevel(ALL_LEVELS[getSelectedLevel()]));
}
