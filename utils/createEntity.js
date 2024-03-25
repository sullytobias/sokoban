import { Sprite, Texture } from "pixi.js";

import { TILES_SIZE } from "../constants";

function createSprite(texture) {
    const sprite = new Sprite(texture);

    sprite.width = TILES_SIZE;
    sprite.height = TILES_SIZE;

    return sprite;
}

export function createEntity(spritePath) {
    const texture = Texture.from(spritePath);
    const square = createSprite(texture);

    return square;
}
