function compareObjects(obj1, obj2) {
    const key1 = Object.keys(obj1)[0];
    const key2 = Object.keys(obj2)[0];

    return obj1[key1] - obj2[key2];
}

function areArraysEqualIgnoreOrder(array1, array2) {
    const sortedArray1 = array1.slice().sort(compareObjects);
    const sortedArray2 = array2.slice().sort(compareObjects);

    return JSON.stringify(sortedArray1) === JSON.stringify(sortedArray2);
}

export function isOnTarget(entityPositions, targetsPositions) {
    return areArraysEqualIgnoreOrder(entityPositions, targetsPositions);
}
