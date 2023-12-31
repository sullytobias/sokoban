import { Graphics, Text } from "pixi.js";


import { levelOverlay } from "./levelOverlay";

import { handleOverlayDisplay } from "../utils/handleOverlayDisplay";

import { App } from "../app";

export function menuOverlay(resolve) {
    const overlay = new Graphics();

    overlay.beginFill("black");
    overlay.drawRect(0, 0, App.renderer.width, App.renderer.height);
    overlay.endFill();

    const menuText = new Text("Game Menu", {
        fontSize: 36,
        fill: "white",
        align: "center",
    });

    menuText.anchor.set(0.5);
    menuText.position.set(App.renderer.width / 2, App.renderer.height / 2 - 50);

    const startButton = new Text("Start", {
        fontSize: 24,
        fill: "green",
        align: "center",
    });

    startButton.anchor.set(0.5);
    startButton.position.set(
        App.renderer.width / 2,
        App.renderer.height / 2 + 50
    );

    startButton.eventMode = "dynamic";

    startButton.on("pointerdown", async () => {
        App.stage.removeChild(overlay);

        await handleOverlayDisplay(levelOverlay);

        resolve(true);
    });

    overlay.addChild(menuText, startButton);

    return overlay;
}
