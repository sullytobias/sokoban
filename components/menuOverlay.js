import { Graphics, Text } from "pixi.js";

import { App } from "../app";

function createMenuOverlay(resolve) {
    const overlay = new Graphics();

    overlay.beginFill(0x000000, 0.7);
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
        fill: "white", // White color
        align: "center",
    });

    startButton.anchor.set(0.5);
    startButton.position.set(
        App.renderer.width / 2,
        App.renderer.height / 2 + 50
    );

    startButton.eventMode = "dynamic";

    startButton.on("pointerdown", () => {
        App.stage.removeChild(overlay);
        resolve(true);
    });

    overlay.addChild(menuText, startButton);

    return overlay;
}

export function displayMenuOverlay() {
    return new Promise((resolve) => {
        const overlay = createMenuOverlay(resolve);
        App.stage.addChild(overlay);
    });
}
