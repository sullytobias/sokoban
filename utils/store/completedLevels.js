export function getCompletedLevels() {
    return localStorage.getItem("completedLevels");
}

export function isPreviousLevelCompleted(level) {
    const completedLevelsString = getCompletedLevels();
    const completedLevels = JSON.parse(completedLevelsString)
        ? completedLevelsString
        : [];

    return completedLevels.includes(level);
}

export function markLevelAsCompleted(level) {
    const completedLevelsString = getCompletedLevels();
    const completedLevels = completedLevelsString
        ? JSON.parse(completedLevelsString)
        : [];

    !completedLevels.includes(level) && completedLevels.push(level);

    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
}
