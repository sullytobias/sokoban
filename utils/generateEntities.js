import { createEntity } from "./createEntity";
import { placeEntity } from "./placeEntity";

import { App } from "../app";

export function generateEntities(
    playerPosition,
    boxPositions,
    wallPositions,
    targetsPositions
) {
    const targetsEntities = targetsPositions.map(() => createEntity("box"));

    targetsPositions.forEach((position, index) =>
        placeEntity(targetsEntities[index], position)
    );
    targetsEntities.forEach((targetEntity) => App.stage.addChild(targetEntity));

    const playerEntity = createEntity("box");

    placeEntity(playerEntity, playerPosition);
    App.stage.addChild(playerEntity);

    const boxEntities = boxPositions.map(() => createEntity("box"));

    boxPositions.forEach((position, index) =>
        placeEntity(boxEntities[index], position)
    );
    boxEntities.forEach((boxEntity) => App.stage.addChild(boxEntity));

    const wallEntities = wallPositions.map(() => createEntity("box"));

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
