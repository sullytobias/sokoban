import { createEntity } from "./createEntity";
import { placeEntity } from "./placeEntity";

import box_url from "../assets/box.png";
import wall_url from "../assets/wall.png";
import target_url from "../assets/target.png";
import player_url from "../assets/player.png";

import { App } from "../app";

export function generateEntities(
    playerPosition,
    boxPositions,
    wallPositions,
    targetsPositions
) {
    const targetsEntities = targetsPositions.map(() =>
        createEntity(target_url)
    );

    targetsPositions.forEach((position, index) =>
        placeEntity(targetsEntities[index], position)
    );
    targetsEntities.forEach((targetEntity) => App.stage.addChild(targetEntity));

    const playerEntity = createEntity(player_url);

    placeEntity(playerEntity, playerPosition);
    App.stage.addChild(playerEntity);

    const boxEntities = boxPositions.map(() => createEntity(box_url));

    boxPositions.forEach((position, index) =>
        placeEntity(boxEntities[index], position)
    );
    boxEntities.forEach((boxEntity) => App.stage.addChild(boxEntity));

    const wallEntities = wallPositions.map(() => createEntity(wall_url));

    wallPositions.forEach((position, index) =>
        placeEntity(wallEntities[index], position)
    );

    wallEntities.forEach((wallEntity) => App.stage.addChild(wallEntity));

    return {
        playerEntity,
        boxEntities,
        wallEntities,
        targetsEntities,
    };
}
