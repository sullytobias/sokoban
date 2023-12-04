import { Application } from "pixi.js";

import { COL_COUNT, ROW_COUNT, TILES_SIZE } from "./constants";

export const App = new Application({
    width: COL_COUNT * TILES_SIZE,
    height: ROW_COUNT * TILES_SIZE,
    backgroundColor: "#fff",
});
