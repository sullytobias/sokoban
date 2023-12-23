export function isPreviousLevelCompleted(level) {
    const completedLevelsString = localStorage.getItem("completedLevels");
    const completedLevels = completedLevelsString ? completedLevelsString : [];

    return completedLevels.includes(level);
}

export function markLevelAsCompleted(level) {
    const completedLevelsString = localStorage.getItem("completedLevels");
    const completedLevels = completedLevelsString ? completedLevelsString : [];

    completedLevels.push(level);

    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
}
