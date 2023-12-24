import { Graphics, Text } from "pixi.js";

import { levelOverlay } from "./levelOverlay";

import { saveSelectedLevel, goToNextLevel } from "../utils/store/chosenLevel";
import { handleOverlayDisplay } from "../utils/handleOverlayDisplay";
import { startLevel } from "../utils/startLevel";

import { App } from "../app";

function createOverlay() {
    const overlay = new Graphics();

    overlay.beginFill(0x000000, 0.7);
    overlay.drawRect(0, 0, App.renderer.width, App.renderer.height);
    overlay.endFill();

    const message = new Text("Congratulations!\nYou won!", {
        fontSize: 36,
        fill: "white",
        align: "center",
    });

    message.anchor.set(0.5);
    message.position.set(App.renderer.width / 2, App.renderer.height / 2);

    overlay.addChild(message);

    return overlay;
}

export function toggleWinningOverlay() {
    const overlay = createOverlay();
    App.stage.addChild(overlay);

    const levelButton = new Text("Levels", {
        fontSize: 24,
        fill: 0xffffff,
    });

    const nextLevelButton = new Text("Next Level", {
        fontSize: 24,
        fill: 0xffffff,
    });

    levelButton.anchor.set(0.5);
    levelButton.position.set(
        App.renderer.width / 3,
        App.renderer.height / 2 + 200
    );

    nextLevelButton.anchor.set(0.5);
    nextLevelButton.position.set(
        App.renderer.width / 1.5,
        App.renderer.height / 2 + 200
    );

    levelButton.eventMode = "dynamic";
    nextLevelButton.eventMode = "dynamic";

    levelButton.on("pointerdown", async () => {
        App.stage.removeChild(overlay);

        await handleOverlayDisplay(levelOverlay);

        levelButton.destroy();
    });

    nextLevelButton.on("pointerdown", () => {
        App.stage.removeChild(overlay);

        saveSelectedLevel(goToNextLevel());

        startLevel();

        levelButton.destroy();
    });

    overlay.addChild(levelButton, nextLevelButton);
}
