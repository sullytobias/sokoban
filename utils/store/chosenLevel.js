export function saveSelectedLevel(selectedLevel) {
    localStorage.setItem("selectedLevel", selectedLevel);
}

export function getSelectedLevel() {
    return localStorage.getItem("selectedLevel");
}
