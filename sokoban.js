import { App } from "./app";

import { TILES_SIZE, ROW_COUNT, COL_COUNT } from "./constants";

import { handleKeyDown } from "./utils/movements/onMove";

document.body.appendChild(App.view);

// Handle keyboard input
window.addEventListener("keydown", handleKeyDown);
