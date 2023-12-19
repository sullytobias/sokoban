import { Graphics, Text } from "pixi.js";

import { ALL_LEVELS } from "../utils/levels";
import { saveSelectedLevel } from "../utils/store/chosenLevel";

import { App } from "../app";

const createLevelButtons = (levels) =>
    levels.map(
        (level, index) =>
            new Text(`Level ${index + 1}`, {
                fontSize: 24,
                fill: "green",
                align: "center",
            })
    );

export function levelOverlay(resolve) {
    const overlay = new Graphics();

    overlay.beginFill("black");
    overlay.drawRect(0, 0, App.renderer.width, App.renderer.height);
    overlay.endFill();

    const menuText = new Text("Levels", {
        fontSize: 36,
        fill: "white",
        align: "center",
    });

    menuText.anchor.set(0.5);
    menuText.position.set(App.renderer.width / 2, App.renderer.height / 2 - 50);

    const levelButtons = createLevelButtons(ALL_LEVELS);

    levelButtons.forEach((button, index) => {
        button.anchor.set(0.5);
        button.position.set(
            App.renderer.width / 2,
            App.renderer.height / 2 + (index + 1) * 50
        );

        button.eventMode = "dynamic";

        button.on("pointerdown", () => {
            App.stage.removeChild(overlay);

            saveSelectedLevel(index);

            resolve(true);
        });
    });

    overlay.addChild(menuText, ...levelButtons);

    return overlay;
}