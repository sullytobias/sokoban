import { Application } from "pixi.js";

import { COL_COUNT, ROW_COUNT, TILES_SIZE } from "./constants";

export const App = new Application({
    width: 800,
    height: 800,
    antialias: true,
    transparent: false,
    resolution: 1,
    backgroundColor: "#fff",
});
