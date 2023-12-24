import { ALL_LEVELS } from "./levels";

import { parseLevel } from "./parseLevel";
import { handleOverlayDisplay } from "./handleOverlayDisplay";
import { startLevel } from "./startLevel";

import { menuOverlay } from "../components/menuOverlay";

export async function showMenuAndGetStartStatus() {
    await handleOverlayDisplay(menuOverlay);

    startLevel();
}
