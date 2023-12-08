import { TILES_SIZE } from "../constants";

export function placeEntity(square, position) {
    square.x = position.col * TILES_SIZE;
    square.y = position.row * TILES_SIZE;
}
