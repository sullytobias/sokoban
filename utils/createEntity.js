import { Graphics } from "pixi.js";

import { TILES_SIZE } from "../constants";

export function createEntity(color) {
    const square = new Graphics();

    square.beginFill(color);
    square.drawRect(0, 0, TILES_SIZE, TILES_SIZE);
    square.endFill();

    return square;
}
