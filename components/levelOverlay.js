import { Graphics, Text } from "pixi.js";

import { App } from "../app";

function createLevelOverlay(resolve) {
    const overlay = new Graphics();

    overlay.beginFill(0x000000, 0.7);
    overlay.drawRect(0, 0, App.renderer.width, App.renderer.height);
    overlay.endFill();

    const menuText = new Text("Levels", {
        fontSize: 36,
        fill: "white",
        align: "center",
    });

    menuText.anchor.set(0.5);
    menuText.position.set(App.renderer.width / 2, App.renderer.height / 2 - 50);

    const levelButton = new Text("level 1", {
        fontSize: 24,
        fill: "white",
        align: "center",
    });

    levelButton.anchor.set(0.5);
    levelButton.position.set(
        App.renderer.width / 2,
        App.renderer.height / 2 + 50
    );

    levelButton.eventMode = "dynamic";

    levelButton.on("pointerdown", () => {
        App.stage.removeChild(overlay);

        resolve(true);
    });

    overlay.addChild(menuText, levelButton);

    return overlay;
}

export function displayLevelOverlay() {
    return new Promise((resolve) => {
        const overlay = createLevelOverlay(resolve);
        App.stage.addChild(overlay);
    });
}
