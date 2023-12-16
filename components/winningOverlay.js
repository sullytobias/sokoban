import { Graphics, Text } from "pixi.js";

import { App } from "../app";

function createOverlay() {
    const overlay = new Graphics();

    overlay.beginFill(0x000000, 0.7); // Semi-transparent black color
    overlay.drawRect(0, 0, App.renderer.width, App.renderer.height);
    overlay.endFill();

    const message = new Text("Congratulations!\nYou won!", {
        fontSize: 36,
        fill: "white", // White color
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

    const closeButton = new Text("Close", {
        fontSize: 24,
        fill: 0xffffff,
    });

    closeButton.anchor.set(0.5);
    closeButton.position.set(
        App.renderer.width / 2,
        App.renderer.height / 2 + 200
    );

    closeButton.eventMode = "dynamic";

    closeButton.on("pointerdown", () => {
        App.stage.removeChild(overlay);
        closeButton.destroy();
    });

    overlay.addChild(closeButton);
}
