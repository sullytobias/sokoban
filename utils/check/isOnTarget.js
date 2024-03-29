function sortObjects(obj1, obj2) {
    const str1 = JSON.stringify(obj1);
    const str2 = JSON.stringify(obj2);

    return str1.localeCompare(str2);
}

function compareObjects(obj1, obj2) {
    const str1 = JSON.stringify(obj1);
    const str2 = JSON.stringify(obj2);

    return str1 === str2;
}

function compareArrays(array1, array2) {
    if (array1.length !== array2.length) return false;

    const sortedArray1 = array1.slice().sort(sortObjects);
    const sortedArray2 = array2.slice().sort(sortObjects);

    for (let i = 0; i < sortedArray1.length; i++) {
        const obj1 = sortedArray1[i];
        const obj2 = sortedArray2[i];

        if (!compareObjects(obj1, obj2)) return false;
    }

    return true;
}

export function isOnTarget(entityPositions, targetsPositions) {
    return compareArrays(entityPositions, targetsPositions);
}
