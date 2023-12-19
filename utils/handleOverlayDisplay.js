import { App } from "../app";

export function handleOverlayDisplay(overlayToDisplay) {
    return new Promise((resolve) => {
        const overlay = overlayToDisplay(resolve);

        App.stage.addChild(overlay);
    });
}
