import { Graphics, Sprite, Texture } from "pixi.js";

import { TILES_SIZE } from "../constants";

function createSprite(texture) {
    return new Sprite(texture);
}

export function createEntity(spritePath) {
    const square = new createSprite(`resources/sprites/${spritePath}.png`);

    return square;
}
